from flask import Flask, request, jsonify
import pandas as pd
import joblib


app = Flask(__name__)


