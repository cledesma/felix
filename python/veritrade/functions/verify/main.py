def detect_labels(request):
    from google.cloud import vision
    from google.cloud import language
    from google.cloud.language import enums
    from google.cloud.language import types
    import six

    request_json = request.get_json(silent=True)
    if request_json \
        and 'declarationOfGoods' in request_json \
        and 'documents' in request_json \
        and 'images' in request_json:
        declaration_of_goods = request_json['declarationOfGoods']
        document_image_uri = request_json['documentsUri'][0]
        good_image_uri = request_json['imagesUri'][0]

    # Analyze Declaration of Goods

    client = language.LanguageServiceClient()
    if isinstance (declaration_of_goods, six.binary_type):
        text = text.decode('utf-8')
    document = types.Document(
        content=declaration_of_goods,
        type=enums.Document.Type.PLAIN_TEXT)
    
    entities = client.analyze_entities(document).entities
    entity_type = ('UNKNOWN', 'PERSON', 'LOCATION', 'ORGANIZATION', 'EVENT', 'WORK_OF_ART', 'CONSUMER_GOOD', 'OTHER')
    print('=' * 20)
    print("Entities")
    print('=' * 20)
    for entity in entities:
        print('=' * 20)
        print(u'{:<16}: {}'.format('name', entity.name))
        print(u'{:<16}: {}'.format('type', entity_type[entity.type]))
        print(u'{:<16}: {}'.format('metadata', entity.metadata))
        print(u'{:<16}: {}'.format('salience', entity.salience))
        print(u'{:<16}: {}'.format('wikipedia_url',
              entity.metadata.get('wikipedia_url', '-')))

    # Analyze Good Image

    client = vision.ImageAnnotatorClient()
    image = vision.types.Image()
    image.source.image_uri = good_image_uri
    labels = client.label_detection(image=image).label_annotations
    print('=' * 20)
    print("Labels")
    print('=' * 20)
    for label in labels:
        print(label.description)
        print(label.score)

    # Analyze Document

    print('=' * 20)
    print("Document Text")
    print('=' * 20)
    image.source.image_uri = document_image_uri
    texts = client.text_detection(image=image).text_annotations
    for text in texts:
        print('\n"{}"').format(text.description)


