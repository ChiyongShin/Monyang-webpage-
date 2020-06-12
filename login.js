var firebaseConfig = {
  apiKey: "AIzaSyCK5rFqPURPNPrbEOU0cvpSd5f0s6IBt3Y",
  authDomain: "monyang-8820b.firebaseapp.com",
  databaseURL: "https://monyang-8820b.firebaseio.com",
  projectId: "monyang-8820b",
  storageBucket: "monyang-8820b.appspot.com",
  messagingSenderId: "317483662694",
  appId: "1:317483662694:web:0d28f12a65b7d3335f5ca7",
  measurementId: "G-Q3D42JT7QS"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db=firebase.firestore();




function signUp(){
  var userEmail=document.getElementById("email_field").value;
  var userPass=document.getElementById("password_field").value;

  var auth=firebase.auth();

  db.collection("users").add({
      name: userEmail
  })
  .then(function() {
      console.log("Document successfully written!");
  })
  .catch(function(error) {
      console.error("Error writing document: ", error);
  });


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
