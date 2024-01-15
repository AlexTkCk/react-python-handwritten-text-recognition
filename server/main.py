from flask import Flask, request
from flask_cors import CORS
# import tensorflow as tf
from PIL import Image
from io import BytesIO
import base64

# ==== Model =====
# model = tf.keras.models.load_model('handwritten.model')
# ==== End of Model ====

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def predict():
    imageURI = request.json['imageBase64']
    base64_data = imageURI.split(",")[1]
    img_data = base64.b64decode(base64_data)
    img = Image.open(BytesIO(img_data))

    return {"text": "Running correctly"}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
