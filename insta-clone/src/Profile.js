import React,  { useEffect, useState }  from 'react'
import { useNavigate } from "react-router-dom";
import "./Apps.css";
import Post from './Post';
import Button from '@mui/material/Button';
import {auth, db} from './firebase';



function Profile() {

    const [posts, setPosts] = useState([]);
    const [open, setOpen] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

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

      const signIn = (event) => {
        event.preventDefault();
    
        auth
          .signInWithEmailAndPassword(email, password)
          .catch((error) => alert(error.message))
          setOpenSignIn(false);
      }


  return (
    <div className='Profile'>
        <div className="app__header">
            <div>

            <Button onClick={() => {
                navigate("/");
            }
                }>            
                <img 
                className="app__headerImage"
                src="https://i.imgur.com/Zgznk2c.png"
                alt=""
            /></Button>
            </div>


            {user ?(
                <Button onClick={() => {
                    auth.signOut();
                    navigate("/");
                }
                    }>Logout</Button>
            ):(null)}

      
      
    </div>
    <div className='app__posts'>

      {
        posts.map(({id, post}) => {
            if (post.idUser == user.uid) {
                return <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
            }
        })
      }

    </div>

    
    </div>
  )
}

export default Profile
