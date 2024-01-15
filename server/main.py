from flask import Flask
from flask_cors import CORS
# import tensorflow as tf

# ==== Model =====
# model = tf.keras.models.load_model('handwritten.model')
# ==== End of Model ====

app = Flask(__name__)
CORS(app)


@app.route("/predict", methods=["POST"])
def predict():
    return {"text": "Running correctly"}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
