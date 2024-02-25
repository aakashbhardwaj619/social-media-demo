import React, { useState, useEffect } from 'react';
import { getLikesOrDislikes, addLikesOrDislikes } from '../src/utils/likesDislikes';
import { addReply } from '../src/utils/comments';
import './App.css';

function Comment({comment}) {
    console.log('comment', comment);
    const [commentBoxVisible, setCommentBoxVisible] = useState(false);
    const [likesContent, setLikesContent] = useState([]);

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
        <div className="Post-comments-section">
            <div className="Post-comment-body">{comment?.Content}</div>
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
        </div>
    );
}

export default Comment;