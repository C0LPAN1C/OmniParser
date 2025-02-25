from gradio_client import Client, handle_file


GRADIO_URL = 'https://60a917f6e6b19c8225.gradio.live/'
LOCAL_SERVER = '0.0.0.0'
LOCAL_PORT = 4137
LOCAL_URL = 'http://0.0.0.0:4317'
IMAGE_URL = 'https://raw.githubusercontent.com/gradio-app/gradio/main/test/test_files/bus.png'

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