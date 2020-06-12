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
var username;
var usercnt=0;
function storeData(item_name,price){

    db.collection("items").doc(username+usercnt).set({
        name: item_name,
        price: price,
        userId: username
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    alert("장바구니에 추가했어요.");
    usercnt++;
    db.collection("users").doc(username).set({
        name: username,
        count: usercnt

    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("login_status").style.display="block";
    document.getElementById("sign_login").style.display="none";
    username=user.email;
    db.collection("users")
    .get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){

        usercnt=doc.data().count;

      });
    });
    if(user!=null){
      var email_id=user.email;
      var email_verified= user.emailVerified;

      document.getElementById("user_para").innerHTML="Welcome : " + email_id +"<br/> Verified : "+email_verified;




  } else {
    document.getElementById("login_status").style.display="none";
    document.getElementById("sign_login").style.display="block";
  }
});

var cart_cnt=0;

function showData(){
  const list__cart= document.querySelector("#list_cart");
  const total_price= document.querySelector("#total_price");
  var total=0;
  if(cart_cnt==0){
    db.collection("items").where("userId", "==", username)
    .get().then(function(querySnapshot){
      querySnapshot.forEach(function(doc){
        total+=doc.data().price;
        list_cart.innerHTML +="<div class='col-sm-2'> <img src='"+doc.data().name+".jpg'  >"+doc.data().price+"원"+"</div>"

      });total_price.innerHTML="<div><p id='tp'> 총 가격 : "+total+"원</p><div>"
    });



    document.getElementById("payment_btn").style.display="block";
    cart_cnt++;
  }
  else{
    alert("장바구니를 두 번 열수 없습니다.");
  }
}

function delData(){
  for(var i=0;i<160;i++){
  db.collection("items").doc(username+i).delete().then(function() {
    console.log("Document successfully deleted!");
      }).catch(function(error) {
        console.error("Error removing document: ", error);
      });
    }
    usercnt=0;
    db.collection("users").doc(username).set({
        name: username,
        count: usercnt

    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

function logout(){
  firebase.auth().signOut().then(function() {
  }).catch(function(error){
  });
}
