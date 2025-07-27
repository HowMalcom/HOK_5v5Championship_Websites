  // Import the functions you need from the SDKs you need
  import { initializeApp } from 'https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js';
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries
  // Your web app's Firebase configuration
  import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from'https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js'
  import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js"

  const firebaseConfig = {
    apiKey: "AIzaSyBWhyw-vYkyy0J-ftCGAYk94T2ODWvMvL4",
    authDomain: "hok-login-system.firebaseapp.com",
    projectId: "hok-login-system",
    storageBucket: "hok-login-system.firebasestorage.app",
    messagingSenderId: "996857242125",
    appId: "1:996857242125:web:6cc9d9162394a1eaf62b44"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  function showMessage(message, divId) {
    var messageDiv = document.createElement("divId");
    messageDiv.style.display="block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity=1;
    setTimeout(function () {
      messageDiv.style.opacity="0";
    },5000);
  }

  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click', (event) => {
    event.preventDefault();
    const email = document.getElementById('R_username').value;
    const password = document.getElementById('R_password').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData={
            email: email,
            firstname: firstName,
            lastname: lastName
          };
          showMessage('Account Created Successfully!', 'signUpMessage');
          const docRef=doc(db, "users", user.uid);
          setDoc(docRef,userData)
          .then(()=>{
            window.location.href='HOKRegister.html';
          })
          .catch((error)=>{
            console.error("error writing document", error);
          });
        })
    .catch((error)=>{
      const errorCode=error.code;
      if(errorCode==='auth/email-already-in-use'){
        showMessage('Email Address Already In Exists!', 'signUpMessage');
      }
      else{
        showMessage('Unable to Create user', 'signUpMessage');
      }
    })
  });



