var getCalendar = document.getElementById('calendar');
var getCurrentYear = document.getElementById('showCurrentYear');
var getCalendarTable = document.getElementById('calendar_table');
var getLastYearBtn = document.getElementById('lastMonth');
var getNextYearBtn = document.getElementById('nextMonth');
var getStartDate = document.getElementById('select_start_date');
var getEndDate = document.getElementById('select_end_date');
var getAreaItem = document.getElementsByClassName('area_item');
var getEventItem = document.getElementsByClassName('show_event');

//建立table
var newTableElement = document.createElement('div');
var newTableTdElement = document.createElement('div');
newTableElement.setAttribute("id", "calendar_table");
getCalendar.appendChild(newTableElement);

//建立上下個月
// getLastYearBtn.addEventListener('click', calcLastMonth);
// getNextYearBtn.addEventListener('click', calcNextMonth);

getLastYearBtn.addEventListener('click', calcLastYear);
getNextYearBtn.addEventListener('click', calcNextYear);

//建立日期物件
var date = new Date();
//取得這個月1號
var currentMonth = new Date(date.getFullYear(),date.getMonth(), 1);


var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

//default現在年份
currentYearParameter = date.getFullYear();
getCurrentYear.innerHTML = currentYearParameter;
//default現在月份
currentMonthParameter = date.getMonth();


function calcLastYear() {
	currentYearParameter--;
	getCurrentYear.innerHTML = currentYearParameter;
	currentMonth = new Date(currentYearParameter, currentMonthParameter-1, 1);
	console.log(currentMonth);
	showCurrentMonth();
}

function calcNextYear() {
	currentYearParameter++;
	getCurrentYear.innerHTML = currentYearParameter;
	currentMonth = new Date(currentYearParameter, currentMonthParameter-1, 1);
	console.log(currentMonth);
	showCurrentMonth();
}

function calcThisMonth(monthVal) {
	console.log('this',monthVal);
	currentMonth = new Date(currentYearParameter, monthVal-1, 1);
	console.log(currentMonth);
	showCurrentMonth();
}

showCurrentMonth();

getStartDate.value = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;

if( date.getMonth() == 11 ) {
	getEndDate.value = `${date.getFullYear()}-1-${date.getDate()}`;
} else {
	getEndDate.value = `${date.getFullYear()}-${date.getMonth()+2}-${date.getDate()}`;
}


function showCurrentMonth(thisMonth = currentMonth) {
	getCalendar.removeChild(getCalendar.childNodes[1]);


	//建立table
	var newTableElement = document.createElement('div');
	
	newTableElement.setAttribute("id", "calendar_block");
	getCalendar.appendChild(newTableElement);

	


	//當月有幾天
	var monthMaxDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

	//今年
	currentYear = thisMonth.getFullYear();

	//判斷閏年並推入更改二月
	if ((currentYear % 4 == 0 && currentYear %100 != 0 ) || (currentYear % 400 == 0)) {
		monthMaxDays[1] = 29;
	} else {
		monthMaxDays[1] = 28;
	}

	//抓出當月天數
	var monthDays = monthMaxDays[thisMonth.getMonth()];

	showMonthArrar = [];
	//推送顯示日期給陣列
	for( let i = 1 ; i <= monthDays ; i++) {
		showMonthArrar.push(i);
	}

	//取得上個月天數
	var lastMonthDays = monthMaxDays[thisMonth.getMonth()-1];

	if (thisMonth.getMonth() == 0 ) {
		lastMonthDays = 31;
	}

	//計算當月一號之前有幾個空格
	var getlastMonthSpace = 7-(7-currentMonth.getDay());

	//將上個月的天數塞進陣列
	var lastMonthInitDay = lastMonthDays - getlastMonthSpace + 1;

	//將上個月天數推入陣列
	for ( let i = 1 ; i <= getlastMonthSpace ; i++ ) {
		showMonthArrar.splice(0,0,lastMonthDays--);
	}

	//取得下個月一號星期幾
	var getNextMonthWeekDay = new Date(thisMonth.getFullYear(),thisMonth.getMonth()+1, 1).getDay();


	//下個月空白有幾天
	var getNextMonthSpace = 7-getNextMonthWeekDay;

	//將下個月天數推入陣列
	for ( let i = 1 ; i <= getNextMonthSpace ; i++ ) {
		showMonthArrar.splice(showMonthArrar.length, 0, i);
	}

	//計算需要幾個星期存放陣列
	var homManyWeekforArr = showMonthArrar.length / 7;

	monthArrIndex = 0;
	for ( let i = 0 ; i <= homManyWeekforArr ; i++ ) {
		var newTableTrElement = document.createElement('div');
		newTableTrElement.setAttribute("class", "calendar_row");
		newTableElement.appendChild(newTableTrElement);


		for ( let k = 0 ; k <= 6 ; k++ ) {
			var newTableTdElement = document.createElement('p');
			if ( i == 0 ) {
				newTableTdElement.setAttribute("class", "calendar_weekday");
				newTableTrElement.appendChild(newTableTdElement);
				newTableTdElement.innerHTML = weekday[k];
			} else {
				newTableTdElement.setAttribute("class", "calendar_data");
				newTableTrElement.appendChild(newTableTdElement);


				//紀錄年分
				var dataYear = thisMonth.getFullYear();

				//紀錄月份
				if(monthArrIndex <= 6 && (showMonthArrar[monthArrIndex] >= 25 && showMonthArrar[monthArrIndex] <=31 )) {
					newTableTdElement.style.opacity = '0.5';
					var dataMonth = thisMonth.getMonth();
					//如果跨年分，月份和月份要調整
					if (dataMonth == 0) {
						dataMonth = 12;
						dataYear--;
					}


				} else if (monthArrIndex >= 28 && (showMonthArrar[monthArrIndex] >= 1 && showMonthArrar[monthArrIndex] <=7 )) {
					newTableTdElement.style.opacity = '0.5';
					var dataMonth = thisMonth.getMonth()+2;
					//如果跨年分，月份和月份要調整
					if (dataMonth == 13) {
						dataMonth = 1;
						dataYear++;
					}
				} else {
					var dataMonth = thisMonth.getMonth()+1;
					newTableTdElement.classList.add('hover_color');
					newTableTdElement.addEventListener('click', getClickDate);
				}
				//紀錄日期
				var dataDate = showMonthArrar[monthArrIndex];
				newTableTdElement.setAttribute('data-daterecord', `${dataYear}-${dataMonth}-${dataDate}`);
				
				newTableTdElement.innerHTML = showMonthArrar[monthArrIndex];
				monthArrIndex++;
			}
			// 
		}
	}

	// var getCalendarTd = document.getElementsByClassName('calendar_td');


	// for( let i = 0 ; i < getCalendarTd.length ; i++) {
	// 	getCalendarTd[i].addEventListener('click', getClickDate);
	// }
}


//選擇時間
var dateClickFlag = 0;

function getClickDate() {
	console.log(this.getAttribute('data-daterecord'));

	if ( dateClickFlag == 0) {
		getStartDate.value = this.getAttribute('data-daterecord');
		dateClickFlag = 1;
	} else {
		getEndDate.value = this.getAttribute('data-daterecord');
		dateClickFlag = 0;
	}

}


//點擊日期可更換日期

getStartDate.addEventListener('focus', focusDateBar);
getEndDate.addEventListener('focus', focusDateBar);

function focusDateBar() {
	if(this.getAttribute('id') == 'select_start_date' ) {
		dateClickFlag = 0;
	} else if(this.getAttribute('id') == 'select_end_date' ){
		dateClickFlag = 1;
	}
}


//選擇地區

for ( let i = 0 ; i <= 3 ; i++ ){
	getAreaItem[i].classList.add('hover_color');
	getAreaItem[i].addEventListener('click', setBgcColor)
	
}

function setBgcColor() {
	for ( let i = 0 ; i <= 3 ; i++ ){
		getAreaItem[i].classList.remove('addAreaColor');
	}
	this.classList.add('addAreaColor');
}



//點擊活動圓點變色

for ( let i = 0 ; i < getEventItem.length ; i++ ){
	getEventItem[i].addEventListener('click', setCircleColor)
	
}

function setCircleColor() {
	for ( let i = 0 ; i < getEventItem.length ; i++ ){
		getEventItem[i].firstChild.nextSibling.classList.remove('event_click_color');
	}
	this.firstChild.nextSibling.classList.add('event_click_color');
}


//小紅點點移動

$('#month1').click(function() {
	$('.month_dot').animate({'left': '18px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
})

$('#month2').click(function() {
	$('.month_dot').animate({'left': '39px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);

})

$('#month3').click(function() {
	$('.month_dot').animate({'left': '60px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);

})

$('#month4').click(function() {
	$('.month_dot').animate({'left': '80px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
	
})

$('#month5').click(function() {
	$('.month_dot').animate({'left': '99px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
	
})

$('#month6').click(function() {
	$('.month_dot').animate({'left': '119px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
	
})

$('#month7').click(function() {
	$('.month_dot').animate({'left': '139px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
	
})

$('#month8').click(function() {
	$('.month_dot').animate({'left': '159px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
	
})

$('#month9').click(function() {
	$('.month_dot').animate({'left': '179px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
	
})

$('#month10').click(function() {
	$('.month_dot').animate({'left': '199px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
	
})

$('#month11').click(function() {
	$('.month_dot').animate({'left': '221px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
	
})

$('#month12').click(function() {
	$('.month_dot').animate({'left': '248px'});
	currentMonthParameter = $(this).text();
	calcThisMonth(currentMonthParameter);
	
})






switch(date.getMonth()) {
case 1:
	$('.month_dot').css({'left': '18px'});
	break;
case 2:
	$('.month_dot').css({'left': '60px'});
	break;
case 3:
	$('.month_dot').css({'left': '39px'});
	break;
case 4:
	$('.month_dot').css({'left': '80px'});
	break;
case 5:
	$('.month_dot').css({'left': '99px'});
	break;
case 6:
	$('.month_dot').css({'left': '119px'});
	break;
case 7:
	$('.month_dot').css({'left': '139px'});
	break;
case 8:
	$('.month_dot').css({'left': '159px'});
	break;
case 9:
	$('.month_dot').css({'left': '179px'});
	break;
case 10:
	$('.month_dot').css({'left': '199px'});
	break;
case 11:
	$('.month_dot').css({'left': '221px'});
	break;
case 12:
	$('.month_dot').css({'left': '248px'});
	break;
}


	
	

	

	

	

	

	

	

	

	

	