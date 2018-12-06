def verify(request):

    request_json = request.get_json(silent=True)
    if request_json \
        and 'declarationOfGoods' in request_json \
        and 'documents' in request_json \
        and 'images' in request_json:

        goods_declaration = request_json['goodsDeclaration']
        document_image_uri = request_json['documentsUri'][0]
        goods_image_uri = request_json['imagesUri'][0]

        detect_entities(goods_declaration)
        detect_labels(goods_image_uri)
        detect_texts(document_image_uri)

def detect_entities(goods_declaration):

    from google.cloud import language_v1
    from google.cloud.language_v1 import types
    from google.cloud.language_v1 import enums
    import six

    content = goods_declaration
    client = language_v1.LanguageServiceClient()
    if isinstance (content, six.binary_type):
        content = content.decode('utf-8')
    document = {'type':  enums.Document.Type.PLAIN_TEXT, 'content': content}

    entities = client.analyze_entities(document).entities
    # entity_type = ('UNKNOWN', 'PERSON', 'LOCATION', 'ORGANIZATION', 
    #     'EVENT', 'WORK_OF_ART', 'CONSUMER_GOOD', 'OTHER')
    print('\n')
    print('=' * 20)
    print("Entities")
    print('=' * 20)
    for entity in entities:
        print(u'{:<16}: {}'.format('name', entity.name))
        print(u'{:<16}: {}'.format('salience', entity.salience))
        # print(u'{:<16}: {}'.format('type', entity_type[entity.type]))
        # print(u'{:<16}: {}'.format('metadata', entity.metadata))
        # print(u'{:<16}: {}'.format('wikipedia_url',
        #       entity.metadata.get('wikipedia_url', '-')))
    return entities

def detect_labels(goods_image_uri):

    from google.cloud import vision
    client = vision.ImageAnnotatorClient()
    image = vision.types.Image()
    image.source.image_uri = goods_image_uri
    labels = client.label_detection(image=image).label_annotations
    print('\n')
    print('=' * 20)
    print("Labels")
    print('=' * 20)
    for label in labels:
        print(label.description)
        print(label.score)
    return labels

def detect_image_texts(image_uri):

    from google.cloud import vision
    client = vision.ImageAnnotatorClient()
    image = vision.types.Image()
    image.source.image_uri = image_uri
    texts = client.text_detection(image=image).text_annotations
    print("\n")
    print('=' * 20)
    print("Image Text")
    print('=' * 20)
    for text in texts:
        print(text.description)
    return texts

def detect_document_texts(document_image_uri):

    from google.cloud import vision
    client = vision.ImageAnnotatorClient()
    image = vision.types.Image()
    image.source.image_uri = document_image_uri
    response = client.document_text_detection(image=image)
    paragraphs = []
    for page in response.full_text_annotation.pages:
        for block in page.blocks:
            for paragraph in block.paragraphs:
                par = ""
                for word in paragraph.words:
                    word_text = ''.join([
                        symbol.text for symbol in word.symbols
                    ])
                    par += word_text + " "
                paragraphs.append(par)
    all_text = ""
    for paragraph in paragraphs:
        all_text += paragraph + "\n"
    print("\n")
    print('=' * 20)
    print("All Document Text")
    print('=' * 20)
    print(all_text )
    entities = detect_entities(all_text)
    return entities
