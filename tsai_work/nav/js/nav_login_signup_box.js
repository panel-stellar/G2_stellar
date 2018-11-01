window.addEventListener('resize', setMainContent);

var getCheckBox = document.getElementById('translate_view');

function setMainContent() {
	if( document.body.clientWidth >= 768 ) {
		getCheckBox.checked = false;
	}
}



$(window).ready(function() {


	//通知選單開啟與關閉
	var bellFlag = 0;
	$('.bell').click(function(){
		if (bellFlag == 0 ) {
			$('#show_info_detail').css('display', 'block');
			bellFlag = 1;
		} else {
			$('#show_info_detail').css('display', 'none');
			bellFlag = 0;
		}
	});

	//點擊畫面通知選單
	$('.main_content').click(function() {
		if (bellFlag == 1 ) {
			$('#show_info_detail').css('display', 'none');
			bellFlag = 0;
		}
	});



	//若桌機點選會員中心選單，縮小時要消失
	var memberListFlag = 0;
	$('.mem_name_center').click(function() {
		//先判斷寬度，若為手機點選無效
		if ( document.body.clientWidth < 768 ) {
			$('.member_list').css('display', 'none');
		} else if (memberListFlag == 0 ) {
			$('.member_list').css('display', 'block');
			console.log(memberListFlag);
			memberListFlag = 1;
			console.log(memberListFlag);
		} else {
			$('.member_list').css('display', 'none');
			memberListFlag = 0;
		}
	});


	//點擊畫面關閉會員中心選單
	$('.main_content').click(function() {
		if (memberListFlag == 1 ) {
			$('.member_list').css('display', 'none');
			memberListFlag = 0;
		}
	});



	//若桌機點選會員中心選單或通知時，縮小時要消失
	$(window).resize(function() {
		if ( document.body.clientWidth < 768 ) {
			$('.member_list').css('display', 'none');
			$('#show_info_detail').css('display', 'none');
		}

	})


	//登入時註冊和密碼顯示&提示字消失
	//看有沒有要留~~~
	$('#account_input').focus(function() {
		$('#show_account_text').animate({'opacity': 1 },1400);
		$('#account_input').attr({'placeholder': '' });
	})

	$('#account_password').focus(function() {
		$('#show_account_password').animate({'opacity': 1 },1400);
		$('#account_password').attr({'placeholder': '' });
	})



	//hover登入時變色
	$('#login').mouseenter(function() {
		$(this).css('color','#ff5e6a');
	})

	$('#login').mouseleave(function() {
		$(this).css('color','#fff');
	})

	//hover註冊時變色
	$('#signup').mouseenter(function() {
		$(this).css('color','#ff5e6a');
	})

	$('#signup').mouseleave(function() {
		$(this).css('color','#fff');
	})


	// 點擊登入畫面的變化
	$('#login').mousedown(function() {
		$('#signup').css('color','#ffffff');
		$(this).css('color','#ff5e6a');
		$('.login_display').css('display','block');
		$('.signup_display').css('display','none');
		$('.switch_light').css('left','38px');
		$('.login_signup_sec').css('height','380px');
		$('.error_forgot_submit_bar').css({
			'text-align': 'left',
			'margin-top': '30px',
			});
		$('.login_submit_btn').css({
			width: '45px',
			height: '45px',
			top: '-3px', 
			right: '-40px',
			position: 'absolute',
			display: 'block',
			
		})
	})


	// 點擊註冊時畫面的變化
	$('#signup').mousedown(function() {
		$('#login').css('color','#ffffff');
		$(this).css('color','#ff5e6a');
		$('.login_display').css('display','none');
		$('.signup_display').css('display','block');
		$('.switch_light').css('left','111px');

		$('.login_signup_sec').css('height','500px');
		$('.error_forgot_submit_bar').css({
			'text-align': 'center',
			'margin-top': '0px',
			});
		$('.login_submit_btn').css({
			width: '60px',
			height: '40px',
			top: '-3px',
			right: '-40px',
			position: 'static',
			display: 'inline-block',
		});

	});



	// 控制開關登入/註冊燈箱
	var loginBoxFlag = 0;
	$('.login_box').click(function() {
		$('.member_list').css('display','none');
		memberListFlag = 0;
		console.log('!');
		if ( loginBoxFlag == 0 ) {
			$('.login_signup_sec').css('display', 'block');
			loginBoxFlag = 1;
		} else {
			$('.login_signup_sec').css('display', 'none');
			loginBoxFlag = 0;
		}
	});

	//桌機點擊其他區域也可關閉
	$('#close_login_signup_box, .main_content').click(function() {
		$('.login_signup_sec').css('display', 'none');
			loginBoxFlag = 0;
	});


})




