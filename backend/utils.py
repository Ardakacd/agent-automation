import time
import secrets
import base64


def generate_thread_id():
    timestamp = int(time.time() * 1000) # ms
    rand = secrets.token_hex(4)
    thread_id = f"thread-{timestamp}-{rand}"
    return thread_id


def generate_user_id():
    timestamp = int(time.time())
    timestamp_b64 = base64.urlsafe_b64encode(str(timestamp).encode()).decode().rstrip('=')
    rand = base64.urlsafe_b64encode(secrets.token_bytes(4)).decode().rstrip('=')
    user_id = f"u_{timestamp_b64}_{rand}"
    return user_id