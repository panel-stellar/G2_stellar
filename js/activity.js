var aBtn1 = document.getElementById('a_btn1');
var aBtn2 = document.getElementById('a_btn2');
var show_event_info_sec2 = document.getElementById('show_event_info_sec2');
var tw_sec2 = document.getElementById('tw_sec2');


aBtn1.onclick = function(){
    tw_sec2.style.display="none";
    show_event_info_sec2.style.display="block";
}

aBtn2.onclick = function(){
    tw_sec2.style.display="block";
    show_event_info_sec2.style.display="none";
}


