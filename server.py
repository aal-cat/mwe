#!/usr/bin/env python3
from flask import Flask, send_from_directory, request, jsonify
import os
import resend

app = Flask(__name__, static_folder='.')
app.config['SECRET_KEY'] = os.urandom(24)

RESEND_API_KEY = os.environ.get('RESEND_API_KEY', '')
SUPPORT_EMAIL = 'gszgxgxvx@gmail.com'

if RESEND_API_KEY:
    resend.api_key = RESEND_API_KEY

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('.', path)

@app.route('/send-support', methods=['POST'])
def send_support():
    try:
        data = request.json
        name = data.get('name', '')
        email = data.get('email', '')
        message = data.get('message', '')
        
        if not all([name, email, message]):
            return jsonify({'error': 'جميع الحقول مطلوبة'}), 400
        
        if not RESEND_API_KEY:
            return jsonify({'error': 'لم يتم تكوين البريد الإلكتروني بعد'}), 500
        
        email_html = f"""
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; direction: rtl;">
