import os
from flask import Flask, render_template
from flask_talisman import Talisman
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

app = Flask(__name__)

csp = {
    'default-src': ["'self'"],
    'style-src': ["'self'", "https://fonts.googleapis.com", "'unsafe-inline'"],
    'font-src': ["'self'", "https://fonts.gstatic.com"],
    'script-src': ["'self'", "'unsafe-inline'"]
}

Talisman(app, content_security_policy=csp)

limiter = Limiter(get_remote_address, app=app, default_limits=["100 per minute"])

@app.route("/test1")
def hello():
    return render_template("index.html", msg="Du har fått svar från vår server!")

@app.errorhandler(404)
def not_found(e):
    return "Sidan hittades inte.", 404

@app.errorhandler(500)
def server_error(e):
    return "Internt serverfel.", 500

if __name__ == "__main__":
    app.run(debug=False, host="127.0.0.1")
