import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {db} from './firebase';

function App() {
  const [posts, setPosts] = useState([]);

  // useEffect
  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);



  return (
    <div className="App">
      <div className="app__header">
      <img 
      className="app__headerImage"
      src="https://cdn.discordapp.com/attachments/873498894389100596/1245762945103696003/imgbin_camera-logo-png.png?ex=6659eea7&is=66589d27&hm=174ff2a907dc3555e5eb693160c7b5dcfa5a966bf3af598084f9f6749266d0f0&"
      alt=""/>

      
    </div>

      <h1>lets fking gooo</h1>


      {
        posts.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

    
    {/* Header */}

    {/* post */}
    {/* post */}

    </div>
  );
}

export default App;
