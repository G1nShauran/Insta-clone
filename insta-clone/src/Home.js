import React, { useEffect, useState } from 'react';
import './App.css';
import Post from './Post';
import {auth, db} from './firebase';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Input } from '@mui/material';
import ImageUpload from './ImageUpload';
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const useStyles = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function Home() {
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if( authUser) {
        //login
        console.log(authUser);
        setUser(authUser);

      } else {
        //logout
        setUser(null);
      }
    })

    return () => {
      //perform clearup action
      unsubscribe();
    }
  }, [user, username]);  


  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);



  const signUp = (event) => {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email, password)
    .then((authUser) => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch((error) => alert(error.message));

    setOpen(false);
  }

  const signIn = (event) => {
    event.preventDefault();

    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
      setOpenSignIn(false);
  }

  const [goToProfile, setGoToProfile] = React.useState(false);

  if (goToProfile) {
    return <Navigate to="/profile" />;
  }

  return (
    <div className="App">
  
      {/* signup */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        
      >
        <Box sx={useStyles}>
          <form className='app__signup'>
            <center>
              <img 
                className="app__headerImage"
                src="https://i.imgur.com/Zgznk2c.png"
                alt=""
              />
              

            </center>

            <Input
                placeholder = 'username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <Input
              placeholder = 'email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder = 'password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type='submit' onClick={signUp}>Sign Up</Button>

          </form>
          


        </Box>
      </Modal>

    {/* Login */}
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        
      >
        <Box sx={useStyles}>
          <form className='app__signup'>
            <center>
              <img 
                className="app__headerImage"
                src="https://i.imgur.com/Zgznk2c.png"
                alt=""
              />
              

            </center>

            <Input
              placeholder = 'email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              placeholder = 'password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button type='submit' onClick={signIn}>Sign In</Button>

          </form>
          


        </Box>
      </Modal>
    

      <div className="app__header">
      <Button onClick={() => {
                navigate("/");
            }
                }><img 
                className="app__headerImage"
                src="https://i.imgur.com/Zgznk2c.png"
                alt=""
              /></Button>


      {user ?(
        <div className="app__loginContainer">
            <Button onClick={() => auth.signOut()}>Logout</Button>
            <Button onClick={() => {setGoToProfile(true);}}>
                {" "}
                Profile
            </Button>
        </div>
      ): (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign in</Button>
          <Button onClick={() => setOpen(true)}>Sign up</Button>
        </div>
        
      )}
      
    </div>

    <div className='app__imgUploadForm'>
      {user?.displayName ? (
        <ImageUpload username />
      ) : (
        <h3>You need to login to upload</h3>
      )}
    </div>
      

      

    <div className='app__posts'>

      {
        posts.map(({id, post}) => (
          <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
        ))
      }

    </div>

      

      
    
    {/* Header */}

    {/* post */}
    {/* post */}

    </div>
  );
}

export default Home;
