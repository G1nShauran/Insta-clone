import React from 'react';
import './Post.css';
import Avatar from '@mui/material/Avatar';

function Post() {
  return (
    <div className='post'>
        <div className='post__header'>
            <Avatar
                className='post__avatar'
                alt='Gin'
                src='/static/images/avatar/1,jpg'
            />

            <h3>Username</h3>
        </div>
    


      <img className='post__image' src="https://iopwiki.com/images/6/65/Lee-Enfield_costume4_D.png" alt=""/>


      <h4 className='post__text'><strong>Username</strong> caption</h4>
    </div>
  )
}

export default Post
