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

var shopping_list=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var shopping_count=0;
var list_shop=[0,0,0,0];



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

function shopping_item(item_name){
  var index;
  var i,j,k=1,s,cnt=0;
  /*
  매개변수로 들어온 item_name과 배열에 등록된 상품이름과 비교하여
  스위치문으로 index값 부여
  BB -> feed -> snacks -> toy 순서
  cat -> dog 순서
  */

    for(i=0;i<20;i++){
        j=i%20+k;
        s=i+20;
      switch(item_name){
        case 'BB/BB_images/cat_BB'+j:
        index=i;
        break;
        case 'BB/BB_images/dog_BB'+j:
        index=s;
        break;
      }
  }
  for(i=40;i<60;i++){
    j=i%20+k;
    s=i+20;
    switch(item_name){
      case 'feed/feed_images/cat_feed'+j:
      index=i;
      break;
      case 'feed/feed_images/dog_feed'+j:
      index=s;
      break;
    }
  }
  for(i=80;i<100;i++){
    j=i%20+k;
    s=i+20;
    switch(item_name){
      case 'snacks/snacks_images/cat_snacks'+j:
      index=i;
      break;
      case 'snacks/snacks_images/dog_snacks'+j:
      index=s;
      break;
    }
  }
  for(i=120;i<140;i++){
    j=i%20+k;
    s=i+20;
    switch(item_name){
      case 'toy/toy_images/cat_toy'+j:
      index=i;
      break;
      case 'toy/toy_images/dog_toy'+j:
      index=s;
      break;
    }
  }

  if(shopping_list[index]==0){
    shopping_list[index]=shopping_count+1;

    list_shop[shopping_count]=item_name;
    shopping_count++;
    alert("장바구니에 추가했습니다! 장바구니에 가서 확인!");



  }
  else if(shopping_list[index]==1){
    alert("이미 선택하신 상품입니다.");
  }
  else if(shopping_count>4){
    alert("장바구니가 꽉 찼습니다.");
  }
  alert(shopping_list);
  createFile();
}

function shoppingcart(){
  showFile();
  var i=0;
alert(shopping_list);
  for(i=0;i<160;i++){


    switch (shopping_list[i]) {
      case 1:
        document.getElementById("first_cart").src=list_shop[0]+".jpg";
        break;
        case 2:
        document.getElementById("second_cart").src=list_shop[1]+".jpg";
        break;
        case 3:
        document.getElementById("third_cart").src=list_shop[2]+".jpg";
        break;
        case 4:
        document.getElementById("fourth_cart").src=list_shop[3]+".jpg";
        break;


    }

  }
  shopping_count=0;

}

function createFile(){

  var fileObject= new ActiveXObject("Scripting.FileSystemObject");
  fWrite=fileObject.CreateTextFile("C:\\write.txt",true);
  fWrite.write(shopping_list);
  fWrite.close();
}

function showFile(){
  var fileName="C:\\write.txt";
  var fileObject= new ActiveXObject("Scripting.FileSystemObject");
  if(!fileObject.FileExist(fileName)){
    alert("만들어진 파일이 없습니다.");
  }
  else{
    var fOpen=fileObject.OpenTextFile(fileName,1);
    while(!fOpen,AtEndOfStream){
      shopping_list=fOpen.Readline();
    }
    fOpen.close();
  }
}
