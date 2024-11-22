from flask import jsonify

def send_request(payload=dict(), message="", code=0):

    response_body = {
        'message': message
    }

    if ((len(payload) >= 0) and (type(payload) is list)) or ((len(payload.keys()) > 0)):
        response_body["data"] = payload

    return jsonify(response_body), code

def request_ok(payload=dict(), message=""):
    return send_request(payload=payload, message=message, code=200)

def request_error(message="Something went wrong"):
    return send_request(message=message, code=400)

def request_forbidden(message=""):
    return send_request(message=message, code=403)

def request_not_found(message=""):
    return send_request(message=message, code=404)