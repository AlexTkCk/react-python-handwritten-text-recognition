import numpy as np
from flask import Flask, request
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
from io import BytesIO
import base64

# ==== Model =====
model = tf.keras.models.load_model('handwritten.model')
# ==== End of Model ====

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def predict():
    imageURI = request.json['imageBase64']
    base64_data = imageURI.split(",")[1]
    img_data = base64.b64decode(base64_data)
    img = Image.open(BytesIO(img_data))
    img = img.resize((28, 28))

    npimg = np.array(img)[:, :, 0]
    npimg = np.invert(np.array([npimg]))

    prediction = np.argmax(model.predict(npimg))

    return {"prediction": str(prediction)}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080, debug=True)
