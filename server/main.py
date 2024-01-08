import os
import sys
import cv2
import numpy as np
import matplotlib.pyplot as plt
# import tensorflow as tf
from PyQt6.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget
from PyQt6 import QtGui
from PyQt6.QtCore import Qt


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        self.setWindowTitle('Digits recognition')

        self.prediction_result_label = QLabel()
        self.prediction_result_label.setText('Prediction is :')
        self.canvas_label = QLabel()
        self.get_prediction_button = QPushButton()
        self.get_prediction_button.setText('Predict')
        self.canvas = QtGui.QPixmap(300, 300)
        self.canvas.fill(Qt.GlobalColor.white)

        self.canvas_label.setPixmap(self.canvas)

        layout = QVBoxLayout()
        layout.addWidget(self.prediction_result_label)
        layout.addWidget(self.canvas_label)
        layout.addWidget(self.get_prediction_button)

        container = QWidget()
        container.setLayout(layout)

        self.setCentralWidget(container)


app = QApplication(sys.argv)
window = MainWindow()
window.show()

app.exec()