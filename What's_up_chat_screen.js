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


var user = localStorage.getItem("user")
var room = localStorage.getItem("room")
console.log(user)
console.log(room)
document.getElementById("room-").innerHTML=room
function send() {
    var message = document.getElementById("msg").value
    if (message.length !== 0) {
        console.log(message)
        firebase.database().ref(room).push({
            name: user,
            msg: message,
            like: 0
        })
        document.getElementById("msg").value = ""
    }
}

function getData() {

    firebase.database().ref("/" + room).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();

            if (childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id)
                console.log(message_data)
                name = message_data["name"]
                msg = message_data["msg"]
                like = message_data["like"]
                name_tag = "<h3>" + name + " <img class='user_tick' src='tick.png'> </h3>"
                msg_tag = " <span> <h4 class='message_h4'>" + msg + "</h4>"
                like_tag = "<button class='btn btn-danger' id=" + firebase_message_id + "value = " + like + "onclick='update_like(this.id)'>"
                span_tag = "<span class='glyphicon glyphicon-thumbs-up'> like : " + like + "</span></button></span<hr>"
                row = name_tag + msg_tag + like_tag + span_tag
                document.getElementById("output").innerHTML += row
                //End code
            }
        });
    });
}


getData();

function update_like(message_id) {
    console.log(message_id)
    var button_id = message_id
    var likes = document.getElementById(button_id).value
    likes = Number(likes) + 1
    firebase.database().ref(room).child(button_id).update({
        like: likes
    })
}

function logout() {
    window.location = "index.html"
    localStorage.removeItem("room")
    localStorage.removeItem("user")
}
