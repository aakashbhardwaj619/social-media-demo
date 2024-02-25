import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [comments, setComments] = useState(0);
  const [likesContent, setLikesContent] = useState([]);

  const params = new URLSearchParams({
    'PostID': '1',
    'ParentID': 'NULL',
    'N': 1
  });

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/getComments?${params}`, {
      method: 'GET',
      headers: { 'ContentType': 'application/json' },

    }).then(res => res.json()).then(data => {
      setComments(data);
      console.log('data', data);
    });
  }, []);

  const getLikes = (type) => {
    openDialog();
    const likeDislikeParams = new URLSearchParams({
      'ParentID': '1',
      'Type': type
    });
    fetch(`http://127.0.0.1:5000/getLikesOrDislikes?${likeDislikeParams}`, {
      method: 'GET',
      headers: { 'ContentType': 'application/json' },
    }).then(res => res.json()).then(data => {
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
  return (
    <div className="App">
      <header className="App-header">
        <div className="Post-content">
          Nunc mattis ullamcorper tincidunt. Integer quis sodales dolor, semper dignissim turpis. Ut in sem hendrerit, posuere magna ut, cursus sem. Aliquam nec convallis enim. Donec sagittis malesuada lacus, ac blandit tellus luctus non. Donec luctus lorem lorem, at congue nulla aliquam at. Proin semper lectus at consequat ullamcorper. Sed lacinia dictum felis, cursus molestie neque mattis ac. Mauris pulvinar diam ac pharetra efficitur.
        </div>
        <div className="Post-actions">
          <div className="Post-action-item">
            Add Reply
          </div>
          <div className="Post-action-item" onClick={() => getLikes(1)}>
            View likes
          </div>
          <div className="Post-action-item" onClick={() => getLikes(0)}>
            View dislikes
          </div>
          <div className="Post-action-item">
            Add Like
          </div>
          <div className="Post-action-item">
            Add Dislike
          </div>
        </div>
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
