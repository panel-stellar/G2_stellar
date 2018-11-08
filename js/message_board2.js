
// 全域變數宣告 -----------------------------------------

    var sent_btn = document.getElementById("sent_btn");
    var star = document.getElementsByClassName("e_str");
    var star_content = document.getElementById('star');
    var getTextArea = document.querySelector('textarea');
    var starRate;

// Function -----------------------------------------


    function changecolor(e) {

        for(let i=0; i<star.length; i++){
            star[i].style.color = '#E7E7E7';
            if(star[i] == e.target){
                starRate = i;
                star_content.value = i + 1;
                for(let j=0; j<=starRate; j++){
                    star[j].style.color = '#fc0';
                }
            }
        }
        console.log('star_content_value: '+star_content.value);
    }


    // addItem 裡面的東西可以用陣列迴圈簡化

    function addItem() {

        if (/^\s+$/.test(getTextArea.value) || getTextArea.value == '') {
            alert('不可為空白');
            getTextArea.value = '';
            return false;
        }else if(starRate === undefined){
            alert('評價啦');
            return false;
        }

        //外殼
        comment_box = document.createElement('div');
        comment_box.className = 'comment_box clearfix';

        //img的外殼
        conmment_img = document.createElement('div');
        conmment_img.className = 'conmment_img';

        //img
        var image = document.createElement('img');
        image.src = "img/event_detail_signup/p.jpg";
        image.alt = 'img_p';

        //評分星星
        var starGroup = document.createElement('div');
        starGroup.className = 'evaluate_content_test';
        var starForm = document.createElement('form');
        var starUl = document.createElement('ul');

        for(let i=0; i<5; i++){
            let star = document.createElement('li');
            star.innerText = '★';
            if(i <= starRate){
                star.style.color = '#fc0';
            }
            starUl.appendChild(star);
        }
    
        document.getElementById('comment_box_wrapper').appendChild(comment_box);
        comment_box.appendChild(starGroup);
        starGroup.appendChild(starForm);
        starForm.appendChild(starUl);

        //最外層 把東西append進去
        document.getElementById('comment_box_wrapper').appendChild(comment_box);
        comment_box.appendChild(conmment_img);
        conmment_img.appendChild(image);

        // create messagearea
        var comment = document.createElement('div');
        comment.className = 'comment';

        var comment_p = document.createElement('p');
        comment_p.innerHTML = 'name';

        var comment_p2 = document.createElement('p');
        comment_p2.innerText = getTextArea.value;

        var comment_p3 = document.createElement('p');
        var dt = new Date();
        var m = (dt.getMinutes() < 10 ? '0' : '') + dt.getMinutes();
        comment_p3.innerHTML = dt.getMonth() + 1 + " 月 " + dt.getDate() + " 日 " + dt.getHours() + ':' + m;

        //文字
        document.getElementById('comment_box_wrapper').appendChild(comment_box);
        comment_box.appendChild(comment);
        comment.appendChild(comment_p);
        comment.appendChild(comment_p2);
        comment.appendChild(comment_p3);


        getTextArea.value = '';
    }



// 註冊監聽 -----------------------------------------

    sent_btn.addEventListener('click', function(){
        addItem(starRate);
    });
    
    for (let i = 0; i < star.length; i++) {
        star[i].addEventListener('click', changecolor, false);
        star[i].addEventListener('mouseover', changecolor, false);
    }