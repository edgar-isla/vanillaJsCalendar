var response=null;
var errorDiv=document.getElementById("errorMessage");
var calendarBtn=document.getElementById("calendarButton");
//var tableCont=document.getElementById("tableContainer");
var formDiv=document.getElementById("userForm");
//var userWelcome= document.getElementById("userWelcome");
//var userNameTime=document.getElementById("userTimeNear");

function postNamePass() {
    var userName = document.getElementById("userN").value;
    var password = document.getElementById("pass").value;

    var data="userName="+userName+"&password="+password;
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
    if (this.readyState === 4) {
        response=this.responseText;
        var obj=JSON.parse(response);

        if(obj["result"]=="invalid"){
            errorDiv.className="view";
           // tableCont.className="hide";
        }
        else {
            location.href="html/gridCalender.html";
            localStorage.cs2550timestamp = obj.userName +" "+obj.timestamp;
            errorDiv.className="hide";
            calendarBtn.className="view";
           // tableCont.className="view";
            formDiv.className="hide";
          //  userWelcome.innerHTML="Welcome: " +localStorage.cs2550timestamp;
           // userNameTime.innerHTML= localStorage.cs2550timestamp;
        }
    }
});

xhr.open("POST", "http://universe.tc.uvu.edu/cs2550/assignments/PasswordCheck/check.php");
xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.send(data);
}

function clearLocalStorage() {
    localStorage.removeItem("cs2550timestamp");
    userWelcome.innerHTML="Edgar's Calendar";
    userNameTime.innerHTML=null;
    console.log(localStorage.cs2550timestamp);
}
