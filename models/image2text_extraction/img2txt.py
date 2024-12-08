from PIL import Image
import pytesseract

image_path = "images.jpeg"

image = Image.open(image_path)

extracted_text = pytesseract.image_to_string(image, lang="kor+eng")

print(extracted_text)