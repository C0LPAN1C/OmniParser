
/*** USAGE:

Accepts 5 parameters:

	image_input Blob | File | Buffer Required

		The input value that is provided in the "Upload Screenshot or Image" Image component. 
		For input, either path or url must be provided. For output, path is always provided.

	box_threshold number Default: 0.05

		The input value that is provided in the "Box Threshold" Slider component.

	iou_threshold number Default: 0.1

		The input value that is provided in the "IOU Threshold" Slider component.

	use_paddleocr boolean Default: True

		The input value that is provided in the "Use PaddleOCR" Checkbox component.

	imgsz number Default: 640

		The input value that is provided in the "Icon Detect Image Size" Slider component.

Returns list of 2 elements

	[0] string

		The output value that appears in the "Image Output" Image component.

	[1] string

		The output value that appears in the "Parsed screen elements" Textbox component.

***/

import { Client } from "@gradio/client";
import * as fs from 'node:fs/promises';
import { Blob } from 'node:buffer';

var filePath = './imgs/example.png'; 
var fileOutputPath = './output/example.txt'; 
// var local_url = "https://60a917f6e6b19c8225.gradio.live/"
var local_url = "http://0.0.0.0:4317";

async function getFileBlob(filePath) {
  try {
    const fileBuffer = await fs.readFile(filePath);
    const blob = new Blob([fileBuffer]);
    return blob;
  } catch (error) {
    console.error("Error reading or creating Image Blob:", error);
    throw error;
  }
}

async function writeFile(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
  } catch (err) {
    console.log(err);
  }
}


// print process.argv
console.log("_______________________|Arguments|_______________________");
process.argv.forEach(function (val, index, array) {
	switch (index) {
	  case 2:
	    local_url = val;
	  	console.log("[Arg 1] URL: " + val);
	    break;
	  case 3:
	  	filePath = val;
	  	console.log("[Arg 2] Image Path: " + val);
	    break;
	  case 4:
	    fileOutputPath = val;
	  	console.log("[Arg 3] Output Path: " + val);
	    break;
	  default:
	    // Code to execute if no case matches
	}
});
console.log("_________________________________________________________");

try {
    const blob = await getFileBlob(filePath);
    console.log("Image Blob size:", blob.size);
    console.log("Processing Screenshot:", filePath);
    const exampleImage = blob;
	const client = await Client.connect(local_url);
	const result = await client.predict("/process", { 
					image_input: exampleImage, 		
			box_threshold: 0.01, 		
			iou_threshold: 0.01, 		
			use_paddleocr: true, 		
			imgsz: 640, 
	});

	console.log(result.data[0]);
	writeFile(fileOutputPath, result.data[1]);
	console.log("_________________________________________________________");
	console.log('JSON has been saved at ');
	console.log("  [" + fileOutputPath + "]");
	console.log('Screenshot with artifacts has been saved at ');
	console.log("  [" + result.data[0].path + "]");
	console.log('You can view screenshot at URL below ');
	console.log("  [" + result.data[0].url + "]");
} catch (error) {
    console.error("Failed to get Blob:", error);
}
console.log("________________________[END]____________________________");
