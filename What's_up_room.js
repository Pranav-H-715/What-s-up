var firebaseConfig = {
    apiKey: "AIzaSyAgrzXkOsX-xBPb1zhL3G9Fbu6uozsTRhg",
    authDomain: "what-s-up-f2ae3.firebaseapp.com",
    databaseURL: "https://what-s-up-f2ae3-default-rtdb.firebaseio.com/",
    projectId: "what-s-up-f2ae3",
    storageBucket: "what-s-up-f2ae3.appspot.com",
    messagingSenderId: "503972602980",
    appId: "1:503972602980:web:6879befbd969c615baeb71"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//ADD YOUR FIREBASE LINKS HERE

var un = localStorage.getItem("user")
document.getElementById("user_name").innerHTML = "Welcome " + un

function getData() {
    firebase.database().ref("/").on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            Room_names = childKey;
            //Start code
            console.log(Room_names)
            var row = "<div class='room_name' id="+Room_names+" onclick='room_way(this.id)'>"+Room_names+"</div><hr>"
            document.getElementById("output").innerHTML += row 
            //End code
        });
    });
}
getData();

function addroom() {
    var room = document.getElementById("room").value
    localStorage.setItem("room", room)
    firebase.database().ref("/").child(room).update({
        purpose: "Add-Room"
    })
    window.location = "What's_up_chat_screen.html" 
}
function logout(){
    window.location="index.html"
    localStorage.removeItem("room")
    localStorage.removeItem("user")
}
function room_way(name){
    localStorage.setItem("room",name)
    window.location = "What's_up_chat_screen.html" 
}