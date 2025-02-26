# This demonstrates how to call the DLP Screen Parser API using Python

'''
Accepts 5 parameters:

	[0] image_input dict(path: 	str | None (Path to a local file), 
						  url: 	str | None (Publicly available url or base64 encoded image), 
						 size: 	int | None (Size of image in bytes), 
					orig_name: 	str | None (Original filename), 
					mime_type: 	str | None (mime type of image), 
					is_stream: 	bool (Can always be set to False), 
						 meta: 	dict()) Required
	[1] box_threshold float Default: 0.05
	[2] iou_threshold float Default: 0.1
	[3] use_paddleocr bool Default: True
	[4] imgsz float Default: 640

Returns tuple of 2 elements:

	[0] dict(	path: 		str | None (Path to a local file), 
				url: 		str | None (Publicly available url or base64 encoded image), 
				size: 		int | None (Size of image in bytes), 
				orig_name: 	str | None (Original filename), 
				mime_type: 	str | None (mime type of image), 
				is_stream: 	bool (Can always be set to False), 
				meta: 		dict())
	The output value that appears in the "Image Output" Image component.
	[1] str
	The output value that appears in the "Parsed screen elements" Textbox component.
'''

from gradio_client import Client, handle_file

#this is dynamic, you can get
GRADIO_URL = 'https://60a917f6e6b19c8225.gradio.live/' 
LOCAL_SERVER = '0.0.0.0'
LOCAL_PORT = 4137
LOCAL_URL = 'http://0.0.0.0:4317'
IMAGE_URL = './imgs/example.png'

client = Client(LOCAL_URL)
result = client.predict(
		image_input=handle_file(IMAGE_URL),
		box_threshold=0.05,
		iou_threshold=0.1,
		use_paddleocr=True,
		imgsz=640,
		api_name="/process"
)
print(result)