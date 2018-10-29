function doFirst() {
	//先跟HTML畫面產生關連	
	//再建事件聆聽的功能

	document.getElementById('theFile').onchange = fileChange;
}

function fileChange() {
	var file = document.getElementById('theFile').files[0];
	var message = '';

	message += 'File Name: ' + file.name + '\n';
	message += 'File Type: ' + file.type + '\n';
	message += 'File Size: ' + file.size + ' byte(s)\n';
	message += 'Last Modified: ' + file.lastModifiedDate + '\n';

	document.getElementById('fileInfo').value = message;

	var readFile = new FileReader();
	readFile.readAsDataURL(file);
	readFile.addEventListener('load', function () {
		var image = document.getElementById('image');
		image.src = this.result;
		image.style.maxWidth = '450px';
		image.style.maxHeight = '300px';
	});
}
window.addEventListener('load', doFirst);


// var next = document.getElementById('next');
// var modify = document.getElementById('modify');
// var sent = document.getElementById('sent');
// var back = document.getElementById('back');
// var informationSec1 = document.getElementById('information_sec1');
// var informationSec2 = document.getElementById('information_sec2');
// var informationSec3 = document.getElementById('information_sec3');

// next.onclick=function(){
//     informationSec1.style.display="none";
//     informationSec2.style.display="block";
//     informationSec3.style.display="none";
// }

// modify.onclick=function(){
//     informationSec1.style.display="block";
//     informationSec2.style.display="none";
//     informationSec3.style.display="none";
// }

// sent.onclick=function(){
//     informationSec1.style.display="none";
//     informationSec2.style.display="none";
//     informationSec3.style.display="block";
// }

// back.onclick=function(){
//     informationSec1.style.display="block";
//     informationSec2.style.display="none";
//     informationSec3.style.display="none";
// }