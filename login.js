var firebaseConfig = {
  apiKey: "AIzaSyAR15-moVDC3IOe1-RlR1kPvX-aiVQ9mOg",
  authDomain: "monyang-project.firebaseapp.com",
  databaseURL: "https://monyang-project.firebaseio.com",
  projectId: "monyang-project",
  storageBucket: "monyang-project.appspot.com",
  messagingSenderId: "654134927505",
  appId: "1:654134927505:web:9dc79a84cf0b8c35339f30",
  measurementId: "G-2JGEF8XEPL"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db=firebase.firestore();




function signUp(){
  var userEmail=document.getElementById("email_field").value;
  var userPass=document.getElementById("password_field").value;

  var auth=firebase.auth();
  auth.createUserWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });


  // ...
alert("Signed Up");
}

function login(){
  var userEmail=document.getElementById("email_field").value;
  var userPass=document.getElementById("password_field").value;




  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  window.alert("Error : "+errorMessage);
  // ...
});

}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display="block";
    document.getElementById("login_div").style.display="none";

    db.collection("users").doc(user.email).set({
        name: user.email,
        count: 0
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });



    var user=firebase.auth().currentUser;


    if(user!=null){
      var email_id=user.email;
      var email_verified= user.emailVerified;

      document.getElementById("user_para").innerHTML="Welcome : " + email_id +"<br/> Verified : "+email_verified;


      if(email_verified){
        document.getElementById("verify_btn").style.display="none";
        document.getElementById("dog_btn").style.display="block";
        document.getElementById("cat_btn").style.display="block";


      }
      else{
        document.getElementById("verify_btn").style.display="block";
        document.getElementById("dog_btn").style.display="none";
        document.getElementById("cat_btn").style.display="none";
      }

    }
    // ...
  } else {
    document.getElementById("user_div").style.display="none";
    document.getElementById("login_div").style.display="block";
  }
});

function logout(){
  firebase.auth().signOut().then(function() {

  }).catch(function(error){

  });

}

function send_verification() {
  var user=firebase.auth().currentUser;

  user.sendEmailVerification().then(function(){
    alert("Verification Sent");
  }).catch(function(error){
    alert("Error : "+errorMessage);
  });
}
