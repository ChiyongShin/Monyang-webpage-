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

function signUp(){
  var userEmail=document.getElementById("email_field");
  var userPass=document.getElementById("password_field");

  var auth=firebase.auth();

  auth.createUserWithEmailAndPassword(userEmail.value, userPass.value).catch(function(error) {
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

/*firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("user_div").style.display="block";
    var user=firebase.auth().currentuser;

    if(user!=null){
      var email_id=user.email;
      document.getElementById("user")
    }
    // ...
  } else {
    // User is signed out.
    // ...
  }
});*/
