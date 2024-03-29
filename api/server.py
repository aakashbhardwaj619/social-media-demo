from flask import Flask, request
from flask_cors import CORS

# Initializing flask app
app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})

#CORS(app)

# Route for seeing a data
@app.route('/getComments', methods=['GET'])
def get_comments():
    postID = request.args.get('PostID')
    parentID = request.args.get('ParentID')
    N = request.args.get('N')
    # Returning an api for showing in  reactjs
    return [
        {
        'PostID':postID, 
        "ParentId":parentID,
        "Content":"Sample Comment"
        },
        {
        'PostID':postID, 
        "ParentId":parentID,
        "Content":"Sample Comment 2"
        }
    ]

@app.route('/getLikesOrDislikes', methods=['GET'])
def get_likes_or_dislikes():
    parentID = request.args.get('ParentID')
    type = request.args.get('Type')
    return [
        {
            "UserName": "Arshi Dadhwal"
        },
        {
            "UserName": "Aakash Bhardwaj"
        },
    ]

@app.route('/addComment', methods=['POST'])
def add_comment():
    print(request.data)
    return 204

@app.route('/addLikeOrDislike', methods=['POST'])
def add_like_or_dislike():
    print(request.data)
    return {"status": "202"}
     
# Running app
if __name__ == '__main__':
    app.run(debug=True)