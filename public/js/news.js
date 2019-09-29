var just= setInterval(run,500)

function run() {
	for (var i = 0; i < 12; i++) {
	var r = Math.floor((Math.random() * 255) + 1);
	var g = Math.floor((Math.random() * 255) + 1);
	var b = Math.floor((Math.random() * 255) + 1);
		var name =i+1;
	document.getElementById(name).style.backgroundColor = 'rgb('+r+','+g+','+b+')';
	}
}
function calsec(x) {
  if (x.className == "nselc") { 
    x.className = "active";
  }
  else if (x.className == "active") { 
    x.className = "nselc";
  }
}
