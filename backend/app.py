
from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector
import os

app = Flask(__name__)
# This allows your React frontend to communicate with Python safely
CORS(app) 

# Connect to your Cloud Database (Replace with your Aiven details)
def get_db_connection():
    return mysql.connector.connect(
        host="YOUR_AIVEN_HOST",
        user="YOUR_AIVEN_USER",
        password="YOUR_AIVEN_PASSWORD",
        database="defaultdb",
        port=YOUR_AIVEN_PORT
    )

@app.route('/')
def home():
    return "Python Backend is Running!"

@app.route('/api/lessons', methods=['GET'])
def get_lessons():
    # Example route to fetch lessons for your React frontend
    return jsonify([{"id": 1, "title": "Physics: Thermodynamics"}])

if __name__ == '__main__':
    app.run(port=5000)
