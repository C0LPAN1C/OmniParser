
# USAGE:
#
# This bash script demonstrates how to call the DLP Screen Parser API using curl. 
#
# Accepts 5 parameters:
# 	[0] Blob | File | Buffer Required
# 	The input value that is provided in the "Upload Screenshot or Image" Image component. For input, either path or url must be provided. For output, path is always provided.
#
# 	[1] number Required
# 	The input value that is provided in the "Box Threshold" Slider component.
#
# 	[2] number Required
# 	The input value that is provided in the "IOU Threshold" Slider component.
#
#		[3] boolean Required
# 	The input value that is provided in the "Use PaddleOCR" Checkbox component.
#
# 	[4] number Required
# 	The input value that is provided in the "Icon Detect Image Size" Slider component.
# 
# Returns list of 2 elements
#
# 	[0] string
# 	The output value that appears in the "Image Output" Image component.
# 	
#		[1] string
# 	The output value that appears in the "Parsed screen elements" Textbox component.

curl -X POST http://0.0.0.0:4317/gradio_api/call/process -s -H "Content-Type: application/json" -d '{
  "data": [
							{"path":"./imgs/example.png"},
							0.01,
							0.01,
							true,
							640
]}' \
  | awk -F'"' '{ print $4}'  \
  | read EVENT_ID; curl -N http://0.0.0.0:4317/gradio_api/call/process/$EVENT_ID