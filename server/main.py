import io

import numpy as np
from flask import Flask, request
from flask_cors import CORS
import tensorflow as tf
from PIL import Image
from io import BytesIO
import base64

# ==== Model =====
from matplotlib import pyplot as plt

model = tf.keras.models.load_model('handwritten.3.AlexNet.model')
# ==== End of Model ====

app = Flask(__name__)
CORS(app)


def visualize_layers(img, model):
    layer_outputs = [layer.output for layer in model.layers[1:]]  # Exclude the input layer
    activation_model = tf.keras.models.Model(inputs=model.input, outputs=layer_outputs)

    img_array = tf.keras.preprocessing.image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)

    activations = activation_model.predict(img_array)

    layer_names = [layer.name for layer in model.layers[1:]]  # Exclude the input layer

    visualizations = []

    for layer_name, layer_activation in zip(layer_names, activations):
        if len(layer_activation.shape) == 4:
            n_features = layer_activation.shape[-1]

            layer_visualizations = []

            for i in range(min(n_features, 16)):  # Limit the number of visualizations for better visualization
                feature = layer_activation[0, :, :, i]

                # Apply a different normalization strategy or consider the range of activation values
                feature_min = feature.min()
                feature_max = feature.max()
                feature_range = feature_max - feature_min

                if feature_range > 0:
                    feature = (feature - feature_min) / feature_range * 255
                else:
                    feature = feature * 0  # Set to 0 if the range is 0 to avoid division by zero

                feature = np.clip(feature, 0, 255).astype('uint8')

                # Convert to base64
                img_data = image_to_base64(feature)
                layer_visualizations.append(img_data)

            visualizations.append({"layer_name": layer_name, "layer_visualizations": layer_visualizations})

    return visualizations


def image_to_base64(image):
    # Resize the image using PIL
    pil_image = Image.fromarray(image)
    pil_image = pil_image.resize((200, 200), Image.ADAPTIVE)

    # Save the resized image to BytesIO in PNG format
    img_data = BytesIO()
    pil_image.save(img_data, format="png")

    # Convert to base64
    img_base64 = base64.b64encode(img_data.getvalue()).decode("utf-8")

    return img_base64


@app.route("/predict", methods=["POST"])
def predict():
    imageURI = request.json['imageBase64']
    base64_data = imageURI.split(",")[1]
    img_data = base64.b64decode(base64_data)
    img = Image.open(BytesIO(img_data))
    img = img.resize((32, 32))

    if img.mode != 'RGB':
        img = img.convert('RGB')

    npimg = np.array(img)
    npimg = np.invert(npimg)

    npimg = npimg / 255.0

    if npimg.shape[-1] == 4:
        npimg = npimg[..., :3]

    npimg = np.expand_dims(npimg, axis=0)

    prediction = np.argmax(model.predict(npimg))
    visualizations = visualize_layers(img, model)

    return {"prediction": str(prediction), "visualizations": visualizations}


if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
