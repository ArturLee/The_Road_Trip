
function openlogin() {
    document.getElementById('mylogin').style.display = "block";
}
function closelogin(){
    document.getElementById('mylogin').style.display = "none";
}

function openregis() {
    document.getElementById('myregis').style.display = "block";
}
function closeregis(){
    document.getElementById('myregis').style.display = "none";
}


window.onclick = function(event) {
    if (event.target == document.getElementById('mylogin')) {
        document.getElementById('mylogin').style.display = "none";
    }
    else if (event.target == document.getElementById('myregis')) {
        document.getElementById('myregis').style.display = "none";
    } 
}

function alert(){
    $.post("/login",function(data){
        if (typeof data.alert == "string"){
        alert(data.alert);
    }else if (typeof data.redirect == "string"){
        window.location = data.redirect;   
        }
    }); 
}