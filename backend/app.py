from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os

app = Flask(__name__)
CORS(app)

# --- MongoDB Setup ---
MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/")
client = MongoClient(MONGO_URI)
db = client.loginDB
users_collection = db.adminUsers  # Using your adminUsers collection

# --- Register API ---
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")
    confirm_password = data.get("confirm_password")

    # Check required fields
    if not email or not password or not confirm_password:
        return jsonify({"message": "All fields are required"}), 400

    # Check password match
    if password != confirm_password:
        return jsonify({"message": "Passwords do not match"}), 400

    # Check if email already exists
    if users_collection.find_one({"email": email}):
        return jsonify({"message": "Email already exists"}), 400

    # Insert into database
    users_collection.insert_one({
        "email": email,
        "password": password
    })
    return jsonify({"message": "Admin registered successfully"})

# --- Login API ---
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = users_collection.find_one({"email": email})
    if not user or user["password"] != password:
        return jsonify({"message": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "email": user["email"]
    })

if __name__ == '__main__':
    app.run(debug=True)
