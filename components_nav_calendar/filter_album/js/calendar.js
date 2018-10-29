var getCalendar = document.getElementById('calendar');
var getCurrentMonth = document.getElementById('showCurrentMonth');
var getCalendarTable = document.getElementById('calendar_table');
var getLastMonthBtn = document.getElementById('lastMonth');
var getNextMonthBtn = document.getElementById('nextMonth');


//建立table
var newTableElement = document.createElement('div');
var newTableTdElement = document.createElement('div');
newTableElement.setAttribute("id", "calendar_table");
getCalendar.appendChild(newTableElement);

//建立上下個月
getLastMonthBtn.addEventListener('click', calcLastMonth);
getNextMonthBtn.addEventListener('click', calcNextMonth);



//建立日期物件
var date = new Date();
//取得這個月1號
var currentMonth = new Date(date.getFullYear(),date.getMonth(), 1);


var weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

currentYearParameter = 2018;
currentMonthParameter = 0;
function calcLastMonth() {
	currentMonthParameter--;
	currentMonth = new Date(currentYearParameter, date.getMonth()+currentMonthParameter, 1);
	showCurrentMonth();
	console.log(currentMonth);

}

function calcNextMonth() {
	currentMonthParameter++;
	currentMonth = new Date(currentYearParameter, date.getMonth()+currentMonthParameter, 1);
	showCurrentMonth();
	console.log(currentMonth);

}

showCurrentMonth();

function showCurrentMonth(thisMonth = currentMonth) {
	console.log(getCalendar.childNodes[4])
	getCalendar.removeChild(getCalendar.childNodes[0]);

	//建立table
	var newTableElement = document.createElement('div');
	
	newTableElement.setAttribute("id", "calendar_block");
	getCalendar.appendChild(newTableElement);

	getCurrentMonth.innerHTML = `${thisMonth.getMonth()+1}月, ${thisMonth.getFullYear()}`;


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
			var newTableTdElement = document.createElement('div');
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
					var dataMonth = thisMonth.getMonth();
					//如果跨年分，月份和月份要調整
					if (dataMonth == 0) {
						dataMonth = 12;
						dataYear--;
					}


				} else if (monthArrIndex >= 28 && (showMonthArrar[monthArrIndex] >= 1 && showMonthArrar[monthArrIndex] <=7 )) {
					var dataMonth = thisMonth.getMonth()+2;
					//如果跨年分，月份和月份要調整
					if (dataMonth == 13) {
						dataMonth = 1;
						dataYear++;
					}
				} else {
					var dataMonth = thisMonth.getMonth()+1;
				}
				//紀錄日期
				var dataDate = showMonthArrar[monthArrIndex];
				newTableTdElement.setAttribute("data-daterecord", `${dataYear}-${dataMonth}-${dataDate}`);
				newTableTdElement.innerHTML = showMonthArrar[monthArrIndex];
				monthArrIndex++;
			}
			// 
		}
	}

	var getCalendarTd = document.getElementsByClassName('calendar_td');


	for( let i = 0 ; i < getCalendarTd.length ; i++) {
		getCalendarTd[i].addEventListener('click', getClickDate);
	}
}

function getClickDate() {
	console.log(this.getAttribute('data-daterecord'));
}