import os
import sys
import time
import socket
import threading
import ctypes
import urllib.request
import webview
from app import app, init_db

def find_free_port():
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind(('127.0.0.1', 0))
        return s.getsockname()[1]

def set_windows_app_id():
    if sys.platform == 'win32':
        try:
            app_id = 'SmartNotesAI.DesktopApp.1.0'
            ctypes.windll.shell32.SetCurrentProcessExplicitAppUserModelID(app_id)
        except Exception as e:
            pass

def wait_for_server(port):
    url = f'http://127.0.0.1:{port}'
    for _ in range(40):
        try:
            with urllib.request.urlopen(url) as response:
                if response.status == 200:
                    return True
        except Exception:
            time.sleep(0.1)
    return False

def main():
    set_windows_app_id()
    init_db()

    # Find free port dynamically
    port = find_free_port()

    # Start Flask server thread on free port
    flask_thread = threading.Thread(target=lambda: app.run(host='127.0.0.1', port=port, debug=False, use_reloader=False), daemon=True)
    flask_thread.start()

    # Wait until Flask server is up and responding
    wait_for_server(port)

    icon_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "static", "images", "app_icon.ico")

    # Create PyWebView Window pointing to local server port
    window = webview.create_window(
        title='Smart Notes AI',
        url=f'http://127.0.0.1:{port}',
        width=1280,
        height=820,
        resizable=True,
        min_size=(900, 600)
    )

    webview.start(icon=icon_path if os.path.exists(icon_path) else None)

if __name__ == '__main__':
    main()
