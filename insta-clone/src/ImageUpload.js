import { Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { storage, db } from "./firebase";
import firebase from 'firebase/compat/app';
import './ImageUpload.css';
import {auth} from './firebase';
function ImageUpload() {
  const [user, setUser] = useState(null);
  const [image, setImage] = useState(null);
  const [progress, setProgress] = useState(0);
  const [caption, setCaption] = useState('');
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
  }, [user]);  
  const handleChange = (e) => {
    if (e.target.files[0]){
      setImage(e.target.files[0]);
    }
  }

  const handleUpload =() => {
    const uploadTask = storage.ref(`images/${image.name}`).put(image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //progress function...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        // Error function
        console.log(error);
        alert(error.message);
      },
      () => {
        //complete function
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url => {
          // post img inside db
          db.collection("posts").add({
            idUser: user.uid,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            caption: caption,
            imageUrl: url,
            username: user.displayName
          });

          setProgress(0);
          setCaption("");
          setImage(null);
        })
      }

    )
  }

  return (
    <div className='imageupload'>

      <progress className='imageupload__progress' value={progress} max="100" />
      <input type='text' placeholder='Enter a caption' onChange={event => setCaption(event.target.value)} value={caption}/>
      <input type='file' onChange={handleChange}/>
      <Button onClick={handleUpload}>
        Upload
      </Button>


    </div>
  )
}

export default ImageUpload
