def verify(request):
    return "Hello func!"

def detect_labels():
    from google.cloud import vision
    client = vision.ImageAnnotatorClient()
    # TODO Define content from Base64
    image = vision.types.Image(content=content)
    response = client.label_detection(image=image)
    labels = response.label_annotations
    print('Labels:')
    for label in labels:
        print(label.description)