function login() {
    var username = document.getElementById("user-name").value
    if (username.length !== 0) {
        localStorage.setItem("user", username)
        window.location = "What's_up_room.html"
    }else{
        document.getElementById("user-name").setAttribute("placeholder","Enter your user name to login")
    }
}
