import os
import sys
import cv2
import numpy as np
import matplotlib.pyplot as plt
# import tensorflow as tf
from PyQt6.QtWidgets import QApplication, QMainWindow, QPushButton, QLabel, QVBoxLayout, QWidget, QHBoxLayout
from PyQt6 import QtGui
from PyQt6.QtCore import Qt


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()

        # ==== Window Settings ====
        self.setWindowTitle('Digits recognition')
        # ==== End of Window Settings ====

        # ==== Prediction Label ====
        self.prediction_result_label = QLabel()
        self.prediction_result_label.setText('Prediction is :')
        # ==== End of Prediction Label ====

        # ==== Canvas ====
        self.canvas_label = QLabel()
        self.canvas = QtGui.QPixmap(300, 300)
        self.canvas.fill(Qt.GlobalColor.white)
        self.canvas_label.setPixmap(self.canvas)
        # ==== End of Canvas ====

        # ==== Buttons ====
        self.get_prediction_button = QPushButton()
        self.reset_button = QPushButton()
        self.get_prediction_button.setText('Predict')
        self.reset_button.setText('Reset')
        # ==== End of Buttons ====

        # ==== Main Layout ====
        main_layout = QVBoxLayout()
        main_layout.addWidget(self.prediction_result_label)
        main_layout.addWidget(self.canvas_label)

        # ==== Button layout ====
        buttons_layout = QHBoxLayout()
        buttons_layout.addWidget(self.get_prediction_button)
        buttons_layout.addWidget(self.reset_button)
        # ==== End of Button layout ====

        main_layout.addLayout(buttons_layout)
        # ==== End of Main layout ====

        # ==== Container ====
        container = QWidget()
        container.setLayout(main_layout)
        # ==== End of container ====

        self.setCentralWidget(container)

    def mouseMoveEvent(self, e):
        pos = e.pos()
        x, y = pos.x(), pos.y()

        print(x, y)


app = QApplication(sys.argv)
window = MainWindow()
window.show()

app.exec()