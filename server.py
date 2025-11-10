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
            <h2 style="color: #00d4ff; border-bottom: 2px solid #00d4ff; padding-bottom: 10px;">
                رسالة دعم فني جديدة - قبيلة آل مياو
            </h2>
            <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 10px 0;"><strong>الاسم:</strong> {name}</p>
                <p style="margin: 10px 0;"><strong>البريد الإلكتروني:</strong> {email}</p>
            </div>
            <div style="background-color: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
                <h3 style="color: #333; margin-top: 0;">الرسالة:</h3>
                <p style="color: #555; line-height: 1.6; white-space: pre-wrap;">{message}</p>
            </div>
            <div style="margin-top: 20px; padding: 15px; background-color: #e8f4ff; border-radius: 8px;">
                <p style="margin: 0; color: #666; font-size: 0.9em;">
                    تم إرسال هذه الرسالة من نموذج الدعم الفني في موقع قبيلة آل مياو
                </p>
            </div>
        </div>
        """
        
        params = {
            "from": "Al Meow Clan <onboarding@resend.dev>",
            "to": [SUPPORT_EMAIL],
            "subject": f"رسالة دعم فني من {name}",
            "html": email_html,
            "reply_to": email
        }
        
        result = resend.Emails.send(params)
        
        return jsonify({'success': True, 'message': 'تم إرسال الرسالة بنجاح'}), 200
        
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        return jsonify({'error': 'حدث خطأ في إرسال الرسالة'}), 500

@app.after_request
def add_header(response):
    response.headers['Cache-Control'] = 'no-store, no-cache, must-revalidate'
    response.headers['Expires'] = '0'
    return response

if __name__ == '__main__':
    PORT = 5000
    HOST = '0.0.0.0'
    print(f"Server running at http://{HOST}:{PORT}/")
    if not RESEND_API_KEY:
        print("⚠️  تحذير: لم يتم العثور على RESEND_API_KEY في المتغيرات البيئية")
        print("   يرجى إضافة المفتاح لتفعيل إرسال البريد الإلكتروني")
    app.run(host=HOST, port=PORT, debug=False)
