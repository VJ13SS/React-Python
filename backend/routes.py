from flask import jsonify,Blueprint,request
from models import Friend,db
import requests

#defining the blueprint
main = Blueprint('main',__name__)

#defining the routes under the blueprint

#The requests sent by the client to the server is in string format(converting the json to string(json.stringify))
#The server sends the respone  in Json
#CRUD -- Create Read Update Delete Operations

#Get all the friends
@main.route('/api/friends', methods = ['GET'])
def get_friends():
    friends = Friend.query.all()#Getting all the members
    result = [friend.to_json() for friend in friends]
    return jsonify(result)

#create a friend
@main.route("/api/friends", methods = ['POST'])
def create_friend():
    try:
        data = request.get_json() #converting the request to json

        required_fields = ['name','role','description','gender']
        #checking if all the required fields exists in the data
        for field in required_fields:
            if field not in data or not data.get(field):
                return jsonify({"error":f'Missing error field {field}'}),400
            
        name = data.get('name')
        role = data.get('role')
        description = data.get('description')
        gender = data.get('gender')

        #fetch avatar images based on gender
        if gender == 'male':
            img_url = f'https://avatar.iran.liara.run/public/boy?   username={name}'
        elif gender == 'female':
            img_url = f'https://avatar.iran.liara.run/public/girl?username={name}'
        else:
            img_url = None
        
        #creating a new entry to the database
        new_friend = Friend(name = name,role = role, description = description,gender = gender,img_url = img_url)

        db.session.add(new_friend)
        db.session.commit()

        return jsonify(new_friend.to_json()),201
    except Exception as e:
        return jsonify({'error':str(e)}),500
    
#delete a friend
@main.route('/api/friends/delete/<int:id>', methods = ['DELETE'])
def delete_friend(id):
    try:
        friend = Friend.query.get(id)
        
        if friend is None:
            return jsonify({'error':'friend not found'}),404
        
        db.session.delete(friend)
        db.session.commit()
        return jsonify({'msg':'Friend Deleted'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}),500
    
#update a friend profile
@main.route('/api/friends/update/<int:id>', methods = ['PATCH'])
def update_friend(id):
    try:
        friend = Friend.query.get(id)

        if friend is None:
            return jsonify({'error':'Friend not found'})
        
        data = request.get_json()

        friend.name = data.get('name',friend.name)
        friend.role = data.get('role',friend.role)
        friend.description = data.get('description',friend.description)
        friend.gender = data.get('gender',friend.gender)

        db.session.commit()
        return jsonify(friend.to_json()),200 #returns that friend
    
    except Exception as e:
        db.session.rollback()
        return jsonify({'error':str(e)}),404