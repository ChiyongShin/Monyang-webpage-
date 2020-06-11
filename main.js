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

var shopping_list=[];


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    document.getElementById("login_status").style.display="block";
    document.getElementById("sign_login").style.display="none";
        // ...
  } else {
    document.getElementById("login_status").style.display="none";
    document.getElementById("sign_login").style.display="block";
  }
});

function logout(){
  firebase.auth().signOut().then(function() {

  }).catch(function(error){

  });

}
