# from unittest.mock import Mock

import main

# def test_verify():
#     pass

# def test_detect_entities():
    # entities = main.detect_entities("20 bags of horse manure")

# def test_detect_labels():
#     main.detect_labels('gs://veritrade/lubricants.jpg')

# def test_detect_image_texts():
#     main.detect_image_texts('gs://veritrade/Bill-of-Lading.jpg')

def test_detect_document_texts():
    document_texts = main.detect_document_texts('gs://veritrade/original_bill_of_loading.jpg')
    
