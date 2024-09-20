from flask import Flask,send_from_directory
from flask_cors import CORS
from models import db
from routes import main
import os

app = Flask(__name__)
CORS(app)

#app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///Friends.db'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(app.instance_path, 'Friends.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)

#linking the current working directory(backend) with the frondend
# .. indicates that we came to the folder outside the backend (here the root folder ReactPyhton) and is ready to join with the other 
frontend_folder = os.path.join(os.getcwd(),"..","frontend")
dist_folder = os.path.join(frontend_folder,"dist")

#server static files from "dist" folder under the "frontend directory"
#to get the files from the dist folder
@app.route('/',defaults={"filename":""})
@app.route('/<path:filename>')
def index(filename):
    if not filename:
        filename = 'index.html' #entry point to frontend
    return send_from_directory(dist_folder,filename)


#registering the blueprint
app.register_blueprint(main)

with app.app_context():
    db.create_all()

if __name__ == '__main__':
    app.run(debug = True)
