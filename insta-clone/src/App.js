import React, { useState } from 'react';
import './App.css';
import Post from './Post';

function App() {
  const [posts, setPosts] = useState([
    {
      username: "Gin2511",
      caption: "My waifu <3",
      imageUrl: "https://iopwiki.com/images/6/65/Lee-Enfield_costume4_D.png"
    },
    {
      username: "DEFYLover",
      caption: "Last event",
      imageUrl: "https://iopwiki.com/images/7/77/Dual_Randomness_Login_Wallpaper.png"
    }
  ]);

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
        posts.map(post => (
          <Post username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }


      {/* <Post username="Gin2511" caption="My waifu <3" imageUrl="https://iopwiki.com/images/6/65/Lee-Enfield_costume4_D.png"/>
      <Post username="DEFYLover" caption="Last event" imageUrl="https://iopwiki.com/images/7/77/Dual_Randomness_Login_Wallpaper.png"/> */}
    
    {/* Header */}

    {/* post */}
    {/* post */}

    </div>
  );
}

export default App;
