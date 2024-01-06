import os
import cv2
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf

# ===== Data loading section =====

mnist = tf.keras.datasets.mnist
(x_train, y_train), (x_test, y_test) = mnist.load_data()

x_train = tf.keras.utils.normalize(x_train, axis=1)
x_test = tf.keras.utils.normalize(x_test, axis=1)

# ===== End of Data loading section =====

# ===== Train section =====

#
# model = tf.keras.models.Sequential()
# model.add(tf.keras.layers.Flatten(input_shape=(28, 28)))
# model.add(tf.keras.layers.Dense(128, activation='relu'))
# model.add(tf.keras.layers.Dense(128, activation='relu'))
# model.add(tf.keras.layers.Dense(128, activation='relu'))
# model.add(tf.keras.layers.Dense(10, activation='softmax'))
#
# model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])
#
# model.fit(x_train, y_train, epochs=15)
#
# model.save('handwritten.model')

# ===== End of Train section =====


# ===== Evaluate section =====

model = tf.keras.models.load_model('handwritten.model')

image_number = 0
while os.path.isfile(f"test_assets/image_{image_number}.png"):
    try:
        img = cv2.imread(f"test_assets/image_{image_number}.png")[:, :, 0]
        img = np.invert(np.array([img]))
        prediction = model.predict(img)
        print('Prediction:', np.argmax(prediction))
        plt.imshow(img[0], cmap=plt.cm.binary)
        plt.show()
    except:
        print('Error')
    finally:
        image_number += 1

# ===== End of Evaluate section =====
