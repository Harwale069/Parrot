from flask import Flask, render_template
from flask_socketio import SocketIO
import subprocess

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('command')
def handle_command(command):
    # Execute the command in the terminal
    if command == "start":
        subprocess.Popen(["curl", "https://harwale069.github.io/Parrot/frames/0.txt"])
    elif command == "stop":
        subprocess.run(["killall", "curl"])
    # Add more commands as needed

if __name__ == '__main__':
    socketio.run(app)
