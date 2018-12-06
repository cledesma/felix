# from unittest.mock import Mock

import main

# def test_verify():
#     pass

def test_detect_entities():
    main.detect_entities("A slice of bacon is better than all the salt in the world.")

def test_detect_labels():
    main.detect_labels('gs://veritrade/car.jpg')

def test_detect_texts():
    main.detect_texts('gs://veritrade/Bill-of-Lading.jpg')