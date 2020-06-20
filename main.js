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
var username;
var usercnt;
function storeData(item_name,price){

    db.collection("items").doc(username+usercnt).set({
        name: item_name,
        price: price,
        userId: username
    })
    .then(function() {
        console.log("Item successfully added!");
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
        console.log("user's profile updated!");
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

      });total_price.innerHTML="<div><p id='tp'> 총 제품 가격 : "+total+"원</p> <p id='tp'> 배송비 : 2500원</p><div>"
    });



    document.getElementById("credit_btn").style.display="block";
    cart_cnt++;
  }
  else{
    alert("장바구니를 두 번 열수 없습니다.");
  }
}

function delData(){
  const list__cart= document.querySelector("#list_cart");
  const total_price= document.querySelector("#total_price");
  for(var i=0;i<usercnt;i++){
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
    total=0;
    list_cart.innerHTML ="<div class='col-sm-2'> <img src='' ></div>"
    total_price.innerHTML="<div><p id='tp'> 총 가격 : "+total+"원</p><div>"
}

function logout(){
  firebase.auth().signOut().then(function() {
  }).catch(function(error){
  });
}
