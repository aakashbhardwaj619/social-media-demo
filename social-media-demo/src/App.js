import React, { useState, useEffect } from 'react';
import { getLikesOrDislikes, addLikesOrDislikes } from '../src/utils/likesDislikes';
import { addReply } from '../src/utils/comments';
import './App.css';
import Comment from './Comment';

function App() {
  const [comments, setComments] = useState([]);
  const [likesContent, setLikesContent] = useState([]);
  const [commentBoxVisible, setCommentBoxVisible] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams({
      'PostID': '1',
      'ParentID': 'NULL',
      'N': 1
    });

    fetch(`http://127.0.0.1:5000/getComments?${params}`, {
      method: 'GET',
      headers: { 'ContentType': 'application/json' },

    }).then(res => res.json()).then(data => {
      setComments(data);
    });
  }, []);

  const getLikesOrDislikesForPost = (type) => {
    resetState();
    openDialog();
    getLikesOrDislikes(type).then(data => {
      setLikesContent(data);
      console.log('likedata', data);
    });
  };

  const openDialog = () => {
    const dialog = document.querySelector("dialog");
    dialog.showModal();
  }

  const closeDialog = () => {
    const dialog = document.querySelector("dialog");
    dialog.close();
  }

  const resetState = () => {
    setLikesContent([]);
    setCommentBoxVisible(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="Post-content">
          Nunc mattis ullamcorper tincidunt. Integer quis sodales dolor, semper dignissim turpis. Ut in sem hendrerit, posuere magna ut, cursus sem. Aliquam nec convallis enim. Donec sagittis malesuada lacus, ac blandit tellus luctus non. Donec luctus lorem lorem, at congue nulla aliquam at. Proin semper lectus at consequat ullamcorper. Sed lacinia dictum felis, cursus molestie neque mattis ac. Mauris pulvinar diam ac pharetra efficitur.
        </div>
        <div className="Post-actions">
          <div className="Post-action-item" onClick={() => setCommentBoxVisible(true)}>
            Add Reply
          </div>
          <div className="Post-action-item" onClick={() => getLikesOrDislikesForPost(1)}>
            View likes
          </div>
          <div className="Post-action-item" onClick={() => getLikesOrDislikesForPost(0)}>
            View dislikes
          </div>
          <div className="Post-action-item" onClick={() => addLikesOrDislikes(1)}>
            Add Like
          </div>
          <div className="Post-action-item" onClick={() => addLikesOrDislikes(0)}>
            Add Dislike
          </div>
        </div>
        {commentBoxVisible &&
          <div className="Post-comment-box">
            <textarea rows={3} style={{ width: '100%' }} />
            <button onClick={addReply}>Submit</button>
          </div>
        }
        {comments.length > 0 &&
          comments.map((comment) => (
            <Comment comment={comment} />
          ))
        }
        <dialog>
          <button autofocus onClick={closeDialog}>Close</button>
          {likesContent &&
            <ul>
              {likesContent.map((user) => (
                <li>
                  {user.UserName}
                </li>
              ))}
            </ul>
          }
        </dialog>


      </header>

    </div>
  );
}

export default App;
