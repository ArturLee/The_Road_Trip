function dropdown() {
    document.getElementById("myDropdown").classList.toggle("show");
}

function openpro() {
    document.getElementById('myprofile').style.display = "block";
}
function closepro(){
    document.getElementById('myprofile').style.display = "none";
}

function openfeed() {
    document.getElementById('myfeedback').style.display = "block";
}
function closefeed(){
    document.getElementById('myfeedback').style.display = "none";
}

function openset() {
    document.getElementById('mysettings').style.display = "block";
}
function closeset(){
    document.getElementById('mysettings').style.display = "none";
}

window.onclick = function(event) {
    if (event.target == document.getElementById('myprofile')) {
        document.getElementById('myprofile').style.display = "none";
    }
    else if (event.target == document.getElementById('myfeedback')) {
        document.getElementById('myfeedback').style.display = "none";
    }
    else if (event.target == document.getElementById('mysettings')) {
        document.getElementById('mysettings').style.display = "none";
    }
    else  if (!event.target.matches('.dropmysh')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  } 
}

function previewFile(){
       var preview = document.querySelector('img'); //selects the query named img
       var file    = document.querySelector('input[type=jpg,png]').files[0]; //sames as here
       var reader  = new FileReader();

       reader.onloadend = function () {
           preview.src = reader.result;
       }

       if (file) {
           reader.readAsDataURL(file); //reads the data as a URL
       } else {
           preview.src = "";
       }
  }
  previewFile();  //calls the function named previewFile()