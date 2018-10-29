$(window).ready(function() {


	var extendFilterFlag = 0;
	$('.wrap_filter > p, .filter_plus').click(function() {
		$('#wrap_filter_condition').slideToggle();
		if (extendFilterFlag == 0) {
			$('#extend_filter').css('transform','rotate(180deg)');
			extendFilterFlag = 1;
		} else {
			$('#extend_filter').css('transform','rotate(0deg)');
			extendFilterFlag = 0;
		}
	})

		var extnedCalendarFlag = 0;
	$('.filter_time').click(function() {
		$('.show_calendar').slideToggle();
	})

	$(window).resize(function() {
		if( document.body.clientWidth >= 768 ) {
			$('#wrap_filter_condition').css('display','block');
		}
	})


})