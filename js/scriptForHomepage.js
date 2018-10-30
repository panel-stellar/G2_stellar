    var canvasEnv = document.getElementById('three_canvas');
    canvasEnv.style.width = window.innerWidth + 'px';
    canvasEnv.style.height = window.innerHeight + 'px';


    // declare

    var renderer, camera, scene, light, object;
    var width, height;
    positionZ = 17000;
    lineZPosi = 16800;

    var bigDot = document.getElementById('bigdot');

    // Initialize renderer
    
    function initRenderer() {
        width = document.getElementById('three_canvas').clientWidth;
        height = document.getElementById('three_canvas').clientHeight;
        renderer = new THREE.WebGLRenderer({
            canvas: document.getElementById('three_canvas'),
            alpha:true,
            // antialias: true,  <------  Set it as true if you want ur latop start burnning...
        });
        renderer.setSize(width, height);
    }

    // Initialize camera

    function initCamera() {
        camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2300);
        camera.position.x = 0;
        camera.position.y = 200;
        camera.position.z = positionZ;
        camera.up.x = 0;
        camera.up.y = 1;
        camera.up.z = 0;
        camera.lookAt({ x: 0, y: 0, z: 0 });   
    }

    // Initialize scene

    function initScene() {
        scene = new THREE.Scene();
    }

    // Initialize object 

    function initObject() {

        var spline = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0,0,lineZPosi),
        new THREE.Vector3(-100,0,lineZPosi -= 300), 
        new THREE.Vector3(120,0,lineZPosi -= 300),
        new THREE.Vector3(200,0,lineZPosi -= 300),
        new THREE.Vector3(100,0,lineZPosi -= 300),
        new THREE.Vector3(0,0,lineZPosi -= 300),
        new THREE.Vector3(-80,0,lineZPosi -= 300),
        new THREE.Vector3(-200,0,lineZPosi -= 300),
        new THREE.Vector3(-70,0,lineZPosi -= 300),
        new THREE.Vector3(-120,0,lineZPosi -= 300),
        new THREE.Vector3(-30,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(140,0,lineZPosi -= 300),
        new THREE.Vector3(0,0,lineZPosi -= 300),
        new THREE.Vector3(-70,0,lineZPosi -= 300),
        new THREE.Vector3(50,0,lineZPosi -= 300),
        new THREE.Vector3(190,0,lineZPosi -= 300),
        new THREE.Vector3(200,0,lineZPosi -= 300),
        new THREE.Vector3(50,0,lineZPosi -= 300),
        new THREE.Vector3(0,0,lineZPosi -= 300),
        new THREE.Vector3(0,0,lineZPosi -= 300),
        new THREE.Vector3(-110,0,lineZPosi -= 300),
        new THREE.Vector3(-200,0,lineZPosi -= 300),
        new THREE.Vector3(-280,0,lineZPosi -= 300),
        new THREE.Vector3(-170,0,lineZPosi -= 300),
        new THREE.Vector3(-300,0,lineZPosi -= 300),
        new THREE.Vector3(-250,0,lineZPosi -= 300),
        new THREE.Vector3(-200,0,lineZPosi -= 300),
        //4800
        new THREE.Vector3(-60,0,lineZPosi -= 300),
        new THREE.Vector3(-120,0,lineZPosi -= 300),
        new THREE.Vector3(0,0,lineZPosi -= 300),
        new THREE.Vector3(-110,0,lineZPosi -= 300),
        new THREE.Vector3(-70,0,lineZPosi -= 300),
        new THREE.Vector3(-20,0,lineZPosi -= 300),
        new THREE.Vector3(110,0,lineZPosi -= 300),
        new THREE.Vector3(40,0,lineZPosi -= 300),
        new THREE.Vector3(0,0,lineZPosi -= 300),
        new THREE.Vector3(130,0,lineZPosi -= 300),
        //1800
        new THREE.Vector3(50,0,lineZPosi -= 300),
        new THREE.Vector3(-50,0,lineZPosi -= 300),
        new THREE.Vector3(0,0,lineZPosi -= 300),
        new THREE.Vector3(-115,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(0,0,lineZPosi -= 300),
        new THREE.Vector3(-90,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(0,0,lineZPosi -= 300),
        new THREE.Vector3(-90,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 300),
        new THREE.Vector3(80,0,lineZPosi -= 2000),
        ]);
        // console.log('Line length:' + lineZPosi);

        // add line
        points = spline.getPoints(150);
        var geometry = new THREE.Geometry();
        geometry.vertices = points;
        var material=new THREE.LineBasicMaterial({ 
            color:0xeeeeee,
            linecap:'round',
            linejoin:'round',
        });
        var line=new THREE.Line(geometry,material);
        scene.add(line);

        // add star
        var starsGeometry = new THREE.Geometry();
        function generateStar(num, cencentrate = 15000 ) {
            for ( var i = 0; i < 500; i ++ ) {
                var star = new THREE.Vector3();
                star.x = THREE.Math.randFloatSpread( cencentrate );
                star.y = THREE.Math.randFloatSpread( cencentrate );
                star.z = THREE.Math.randFloatSpread( cencentrate );
                starsGeometry.vertices.push(star);     
            }
            var starsMaterial = new THREE.PointsMaterial( { size: num, color: 0xffffff } )
            var starField = new THREE.Points( starsGeometry, starsMaterial );
            scene.add( starField );
        }
        // generateStar(3);
        // generateStar(7);
        // generateStar(10);
        generateStar(3, 10000);
        generateStar(7, 10000);
        generateStar(10, 10000);

        // add spot ----------------------------
    
        circleZPos = 18800;
        circleXPos = [-160, 0, 40, 80];

        //Spot array

        // var circleGeometry = new THREE.CircleGeometry( 30 , 30 );
        // var ringGeometry = new THREE.RingGeometry( 45,40,30,20,0,6.3);
        // for(let i=0; i<=3; i++){
        //     if(i == 3){
        //         circleZPos = -1700;
        //     }else{
        //         circleZPos -= 4000;
        //     }
        //     var spotPosition = new THREE.Vector3(circleXPos[i],0,circleZPos);
        //     circleGeometry.vertices.push(spotPosition);
        //     ringGeometry.vertices.push(spotPosition);
        // }
        // var spotMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
        // var CirclesGroup = new THREE.Mesh(circleGeometry,spotMaterial);
        // var ringsGroup = new THREE.Mesh(ringGeometry,spotMaterial);
        // scene.add(CirclesGroup);
        // scene.add(ringsGroup);
        
    
        for ( let i = 0 ; i <= 3 ; i++ ){
            // circleZPos -= 4000;
            if(i == 3){
                circleZPos = -1700;
            }else{
                circleZPos -= 4000;
            }
            // Create inner circle
            var geometry = new THREE.CircleBufferGeometry( 30 , 30 );
            var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
            var circle = new THREE.Mesh(geometry, material);
            
            circle.position.z = circleZPos;
            circle.position.x = circleXPos[i];
            circle.material.opacity = 0.25;
            circle.rotation.x = Math.PI / -5;

            scene.add( circle );

            // Create outer ring
            //(innerRadius, outerRadius, thetaSegments, phiSegments, thetaStart, thetaLength)
            var geometry = new THREE.RingBufferGeometry( 45,40,30,20,0,6.3);
            var material = new THREE.MeshBasicMaterial({ 
                color: 0xffffff, 
                side: THREE.DoubleSide, 
            });
            var ring = new THREE.Mesh( geometry, material );
            
            ring.position.z = circleZPos;
            ring.position.x = circleXPos[i];
            ring.rotation.x = Math.PI / -5;

            scene.add( ring );
        }

        
        // Create enviornment light

        // var  ambientLight = new THREE.AmbientLight('#ffffff');
        // scene.add(ambientLight);

        // var material = new THREE.MeshBasicMaterial({wireframe:true});
        // var geometry = new THREE.PlaneGeometry();
        // var planeMesh = new THREE.Mesh(geometry,material);
        // planeMesh.position.set(-400,170,7200);
        // scene.add(planeMesh);

        // var element = document.createElement('img');
        // element.src = 'img/sample_1.jpg';
        // element.style.width = '480px';
        // element.style.height = '360px';

        // var cssObj = new THREE.CSS3DObject(element);
        // cssObj.position.set(-400,170,7200);
        // scene.add(cssObj);

        // var cssRenderer = new THREE.CSS3DRenderer();
        // cssRenderer.setSize(window.innerWidth,window.innerHeight);
        // cssRenderer.domElement.style.position = 'absolute';
        // cssRenderer.domElement.style.top = '0';

        // var material   = new THREE.MeshBasicMaterial();
        // material.color.set('black')
        // material.opacity   = 0;
        // material.blending  = THREE.NoBlending;

         
    }

    // // Initialize text 

    // function initFont(){
    //     var loader = new THREE.FontLoader();
    //     loader.load("./font/testFont.json",function(font){
    //         var material = new THREE.MeshDepthMaterial();
    //         var geometry = new THREE.TextGeometry( 'STELLAR', {
    //             font: font,
    //             size: 70,
    //             height: 10,
    //             curveSegments: 12,
    //         } );

    //         var text = new THREE.Mesh(geometry,material);
    //         scene.add(text);
    //         text.position.set(-175,200,16000);
            
    //     })
    // }

    // Start render

    function render() {
        requestAnimationFrame(render);
        renderer.render(scene, camera);
    }

    // Driver

    function driver(e){      
        var signal;
        // console.log(e.deltaY);
        window.removeEventListener('mousewheel', driver);
        // console.log('!!!!!!!!!!!!!!'+parseInt(window.getComputedStyle(bigdot).getPropertyValue('top')));
        if(e.deltaY < 0){
            // console.log('uppppppppppppppppppp('+ e.deltaY +')');
            signal = true;
            if(positionZ == 17000 || positionZ == 13000){
                cameraTimer = setInterval(function(){cameraMove(signal);},10);
            }else if(positionZ == 9000){
                window.addEventListener('mousewheel',manualCameraMove);
                // console.log(signal);
            }
            dotTimer = setInterval(function(){moveDot(signal);},10);
        }else if(e.deltaY > 0){
            // console.log('downnnnnnnnnnnnnnnnn('+ e.deltaY +')');
            signal = false;
            // console.log(positionZ);
            if(positionZ == 13000 || positionZ == 9000){
                cameraTimer = setInterval(function(){cameraMove(signal);},10);
                dotTimer = setInterval(function(){moveDot(signal);},10);  
            }else if(positionZ == 17000){  
                // console.log('nowwwwwwwwwwwwww is'+positionZ);
                window.addEventListener('mousewheel',driver); 
            }  
        }
    }

    // Camera and dots movement (manual mode)

    var esignal;

    function manualCameraMove(e){
        // console.log('now it is manual mode ~');
        // console.log(signal);
        // console.log('positionZ i got here is...' + positionZ);
        if(positionZ < 9000){
            if(e.deltaY < 0){
                esignal = true;
                positionZ -= 20;
                camera.position.z = positionZ;
                if(positionZ < 0){
                    positionZ = 0;
                } 
            }else if(e.deltaY > 0){
                esignal = false;
                // console.log('i am running..........................');
                positionZ += 20;
                camera.position.z = positionZ;
                // console.log(parseInt(window.getComputedStyle(bigdot).getPropertyValue('top')));
                if(parseInt(window.getComputedStyle(bigdot).getPropertyValue('top')) == 175){
                    dotManualMove(esignal);
                }
            } 
            return ImgDriver(esignal);
        }else if(positionZ == 9000){
            if(e.deltaY < 0){
                esignal = true;
                positionZ -= 20;
                camera.position.z = positionZ;
            }else if(e.deltaY > 0){
                esignal = false;
                window.removeEventListener('mousewheel',manualCameraMove);
                window.addEventListener('mousewheel',driver);
            }
        }
    }

    function dotManualMove(esignal){
        var bigDotStyle = window.getComputedStyle(bigdot);
        var bigDotCurTop = parseInt(bigDotStyle.getPropertyValue('top'));
        dotTimer = setInterval(function(){moveDot(esignal);},10);
    }

    // Camera movement (auto mode)

    function cameraMove(signal){
        // console.log(positionZ);
        // console.log('now it is auto mode');
        // console.log('cameraAutoMove : '+signal); 
        if(signal === true){
            positionZ -= 20;
        }else{
            positionZ += 20;
            if(positionZ > 17000){
                positionZ = 17000;
            } 
        }
        cameraStop(positionZ,signal); 
        camera.position.z = positionZ;  
        return ImgDriver(signal);  
    }

    function cameraStop(positionZ,signal){
        if (positionZ == 17000 || positionZ == 13000 || positionZ == 9000){ 
                clearInterval(cameraTimer);
                window.addEventListener('mousewheel', driver);
        }
    }

    // Dot movement (auto mode)

    function moveDot(Signal){
        // console.log(bigDotCurTop);
        var bigDotStyle = window.getComputedStyle(bigdot);
        var bigDotCurTop = parseInt(bigDotStyle.getPropertyValue('top'));
        if(Signal === true){
            if(bigDotCurTop > 175){
                bigDotCurTop = 175;
            }else{
                bigDotCurTop += 1;
            }
        }else{
            if(bigDotCurTop < -5){
                bigDotCurTop = -5;
            }else{
                bigDotCurTop -= 1;
            }
        }
        bigDot.style.top = bigDotCurTop + 'px';
        stopDot(bigDotCurTop);
    }

    function stopDot(bigDotCurTop){
        if(bigDotCurTop == -5 || bigDotCurTop == 55 || bigDotCurTop == 115 || bigDotCurTop == 175){
            clearInterval(dotTimer);  
        }
    }

    // Mobile compatibility

    $(window).on('touchstart', function(e) {

        var swipe = e.originalEvent.touches,
            start = swipe[0].pageY;


        $(this).one('touchmove',driverForMob);

        function driverForMob(e){

            var contact = e.originalEvent.touches,
            end = contact[0].pageY,
            distance = end-start;

            var signal;

            if (distance < -10){
                signal = false;
                if(positionZ == 13000 || positionZ == 9000){
                    cameraTimer = setInterval(function(){cameraMove(signal);},10);
                    dotTimer = setInterval(function(){moveDot(signal);},10);  
                }else if(positionZ == 17000){
                    $(window).bind('touchmove',driverForMob); // mob
                }else if(positionZ >= 0 && positionZ < 9000){
                    $(this).unbind('touchmove',driverForMob);
                    $(this).bind('touchmove',manualCameraMoveForMob);
                }
                return ImgDriver(signal);
            }else if(distance > 10){
                signal = true;
                if(positionZ == 17000 || positionZ == 13000){
                    cameraTimer = setInterval(function(){cameraMove(signal);},10);
                }else if(positionZ <= 9000){
                    $(this).unbind('touchmove',driverForMob);
                    $(this).bind('touchmove',manualCameraMoveForMob);
                }
                dotTimer = setInterval(function(){moveDot(signal);},10);
                return ImgDriver(signal);
            }
        }


        function manualCameraMoveForMob(e){
            var esignal;
            var contact = e.originalEvent.touches,
            end = contact[0].pageY,
            distance = end-start;
            // console.log(distance);
            // console.log(positionZ);
            // console.log('dot: ' + window.getComputedStyle(bigdot).getPropertyValue('top'));
            if(positionZ < 9000){
                if(distance > 1){
                    esignal = true;
                    positionZ -= 20;
                    camera.position.z = positionZ;
                    if(positionZ < 0){
                        positionZ = 0;
                    } 
                }else if(distance < -1){
                    esignal = false;
                    positionZ += 20;
                    camera.position.z = positionZ;
                    // console.log('i am working back');
                    if(parseInt(window.getComputedStyle(bigdot).getPropertyValue('top')) == 175){
                        dotManualMove(esignal);
                    }
                }
                return ImgDriver(esignal);
            }else if(positionZ == 9000){
                if(distance > 10){
                    positionZ -= 20;
                    camera.position.z = positionZ;
                }else if(distance < -10){
                    $(this).unbind('touchmove',manualCameraMoveForMob); // mob
                    $(this).bind('touchmove',driverForMob); // mob
                }
            }
        }

        $(window).one('touchend', function() {
            $(this).off('touchmove touchend');
        });

    });


    // Parallax

    function initParallax(){
        var scene = document.getElementById('scene');
        var parallaxInstance = new Parallax(scene,{
            relativeInput: true,
        });
    }
   

    // Call images

    function ImgDriver(esignal){
        var galleryBox = document.querySelectorAll('.gallery_box');
        // console.log('The positionZ from ImgDriver: '+positionZ);
        if(esignal === true){
            if(screen.width < 768){
                switch(positionZ){
                    case 15000:
                        $('#intro').animate({opacity:'0'},800);
                        break;
                    case 14000:
                        $('#intro').animate({display:'none'},800);
                        $('.layerBg').animate({bottom:'-200%'},800);
                        break;
                    case 13100:
                        $('.act_sec').css('z-index',5);
                        $('.act_content_box.map').animate({right:'0'},800);
                        $('.act_content_box.calendar_block').animate({left:'0'},800);
                        break;
                    case 12980:
                        $('.act_sec').css('z-index',0);
                        $('.act_content_box.map').animate({right:'-3999px'},1000);
                        $('.act_content_box.calendar_block').animate({left:'-3999px'},1000);
                        break;
                    case 10000:
                        $('.gallery_sec').css('z-index',5);
                        $('.gb1').animate({right:'6%'},1000);
                        break;
                    case 8800:
                        $('.gb1').animate({right:'-105%'},1000);
                        $('.gb2').animate({left:'6%'},1000);
                        break;
                    case 7600:
                        $('.gb2').animate({left:'-105%'},1000);
                        $('.gb3').animate({right:'6%'},1000);
                        break;
                    case 6400:
                        $('.gb3').animate({right:'-105%'},1000);
                        $('.gb4').animate({left:'6%'},1000);
                        break;
                    case 5200:
                        $('.gb4').animate({left:'-105%'},1000);
                        $('.gb5').animate({right:'6%'},1000);
                        break;
                    case 4000:
                        $('.gb5').animate({right:'-105%'},1000);
                        $('.gb6').animate({left:'6%'},1000);
                        break;
                    case 2800:
                        $('.gb6').animate({left:'-105%'},1000);
                        break;
                    case 1600:
                        $('.gallery_sec').css('z-index',0);
                        break;
                }
            }else{
                switch(positionZ){
                    case 15000:
                        $('#intro').animate({opacity:'0'},800);
                        break;
                    case 14000:
                        $('#intro').animate({display:'none'},800);
                        $('.layerBg').animate({bottom:'-200%'},800);
                        break;
                    case 13100:
                        $('.act_sec').css('z-index',5);
                        $('.act_content_box.map').animate({right:'0'},800);
                        $('.act_content_box.calendar_block').animate({left:'0'},800);
                        break;
                    case 12980:
                        $('.act_sec').css('z-index',0);
                        $('.act_content_box.map').animate({right:'-3999px'},1000);
                        $('.act_content_box.calendar_block').animate({left:'-3999px'},1000);
                        break;
                    case 10000:
                        $('.gallery_sec').css('z-index',5);
                        $('.gb1').animate({right:'6%'},1000);
                        break;
                    case 8800:
                        $('.gb2').animate({left:'6%'},1000);
                        break;
                    case 7600:
                        $('.gb1').animate({right:'-105%'},1000);
                        $('.gb3').animate({right:'6%'},1000);
                        break;
                    case 6400:
                        $('.gb2').animate({left:'-105%'},1000);
                        $('.gb4').animate({left:'6%'},1000);
                        break;
                    case 5200:
                        $('.gb3').animate({right:'-105%'},1000);
                        $('.gb5').animate({right:'6%'},1000);
                        break;
                    case 4000:
                        $('.gb4').animate({left:'-105%'},1000);
                        $('.gb6').animate({left:'6%'},1000);
                        break;
                    case 2800:
                        $('.gb5').animate({right:'-105%'},1000);
                        break;
                    case 1600:
                        $('.gallery_sec').css('z-index',0);
                        $('.gb6').animate({left:'-105%'},1000);
                        break;
                }
            }
        }else{
            if(screen.width < 768){
                switch(positionZ){
                    case 15000:
                        $('#intro').animate({opacity:'1'},800);
                        break;
                    case 14000:
                        $('#intro').animate({display:'block'},800);
                        $('.layerBg').animate({bottom:'-100%'},800);
                        break;
                    case 13100:
                        $('.act_content_box.map').animate({right:'-3999px'},1000);
                        $('.act_content_box.calendar_block').animate({left:'-3999px'},1000);
                        $('.act_sec').css('z-index',0);
                        break;
                    case 12980:
                        $('.act_sec').css('z-index',5);
                        $('.gallery_sec').css('z-index',0);
                        $('.act_content_box.map').animate({right:'0'},1000);
                        $('.act_content_box.calendar_block').animate({left:'0'},1000);
                        break;
                    case 10000:
                        $('.gallery_sec').css('z-index',5);
                        $('.gb1').animate({right:'-105%'},1000);
                        break;
                    case 7600:
                        $('.gb1').animate({right:'6%'},1000);
                        $('.gb2').animate({left:'-105%'},1000);
                        break;
                    case 6400:
                        $('.gb2').animate({left:'6%'},1000);
                        $('.gb3').animate({right:'-105%'},1000);
                        break;
                    case 5200:
                        $('.gb3').animate({right:'6%'},1000);
                        $('.gb4').animate({left:'-105%'},1000);
                        break;
                    case 4000:
                        $('.gb4').animate({left:'6%'},1000);
                        $('.gb5').animate({right:'-105%'},1000);
                        break;
                    case 2800:
                        $('.gb5').animate({right:'6%'},1000);
                        $('.gb6').animate({left:'-105%'},1000);
                        break;
                    case 1600:
                        $('.gallery_sec').css('z-index',5);
                        $('.gb6').animate({left:'6%'},1000);
                        break;
                }
            }else{
                switch(positionZ){
                    case 15000:
                        $('#intro').animate({opacity:'1'},800);
                        break;
                    case 14000:
                        $('#intro').animate({display:'block'},800);
                        $('.layerBg').animate({bottom:'-100%'},800);
                        break;
                    case 13100:
                        $('.act_content_box.map').animate({right:'-3999px'},1000);
                        $('.act_content_box.calendar_block').animate({left:'-3999px'},1000);
                        $('.act_sec').css('z-index',0);
                        break;
                    case 12980:
                        $('.act_sec').css('z-index',5);
                        $('.gallery_sec').css('z-index',0);
                        $('.act_content_box.map').animate({right:'0'},1000);
                        $('.act_content_box.calendar_block').animate({left:'0'},1000);
                        break;
                    case 10000:
                        $('.gallery_sec').css('z-index',5);
                        $('.gb1').animate({right:'-105%'},1000);
                        break;
                    case 8800:
                        $('.gb2').animate({left:'-105%'},1000);
                        break;
                    case 7600:
                        $('.gb1').animate({right:'6%'},1000);
                        $('.gb3').animate({right:'-105%'},1000);
                        break;
                    case 6400:
                        $('.gb2').animate({left:'6%'},1000);
                        $('.gb4').animate({left:'-105%'},1000);
                        break;
                    case 5200:
                        $('.gb3').animate({right:'6%'},1000);
                        $('.gb5').animate({right:'-105%'},1000);
                        break;
                    case 4000:
                        $('.gb4').animate({left:'6%'},1000);
                        $('.gb6').animate({left:'-105%'},1000);
                        break;
                    case 2800:
                        $('.gb5').animate({right:'6%'},1000);
                        break;
                    case 1600:
                        $('.gallery_sec').css('z-index',5);
                        $('.gb6').animate({left:'6%'},1000);
                        break;
                }
            }
        }
    }

    // Initialize calendar

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

    }

    function calcNextMonth() {
        currentMonthParameter++;
        currentMonth = new Date(currentYearParameter, date.getMonth()+currentMonthParameter, 1);
        showCurrentMonth();

    }

    showCurrentMonth();

    function showCurrentMonth(thisMonth = currentMonth) {
        getCalendar.removeChild(getCalendar.childNodes[1]);


        //建立table
        var newTableElement = document.createElement('div');
        
        newTableElement.setAttribute("id", "calendar_block");
        getCalendar.appendChild(newTableElement);

        getCurrentMonth.innerHTML = `${thisMonth.getFullYear()} ${thisMonth.getMonth()+1}月`;


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

        var getCalendarTd = document.getElementsByClassName('calendar_td');


        for( let i = 0 ; i < getCalendarTd.length ; i++) {
            getCalendarTd[i].addEventListener('click', getClickDate);
        }
    }

    function getClickDate() {
        console.log(this.getAttribute('data-daterecord'));
    }

    document.querySelector('#calendar_block').style.height = 0;

    // Handling click event

    window.onclick = function(e){
        var getCalendar = document.querySelector('#calendar');
        var getCalendarBlock = document.querySelector('#calendar_block');
        var getCancelBtn = document.getElementsByClassName('cancel_calendar')[0];
        var getDateBtn = document.querySelectorAll('.calendar_data');
        var getLightBox = document.getElementById('lightbox');
        var getActInfoHolder = document.getElementById('act_info_holder');

        console.log(window.getComputedStyle(getCalendarBlock,null).height);

        e = e || window.event;

        if(getLightBox.contains(e.target) && !getActInfoHolder.contains(e.target)){
            getLightBox.style.display = 'none';
        }else if(getCancelBtn.contains(e.target)){
            if(window.getComputedStyle(getCalendar,null).display == 'block'){
                getCalendar.style.display = 'none';
                getCancelBtn.style.transform = 'rotate(90deg)';
            }else if(window.getComputedStyle(getCalendar,null).display == 'none'){
                getCalendar.style.display = 'block';
                getCancelBtn.style.transform = 'rotate(-90deg)';
            }
        }

        for(let i=0; i<getDateBtn.length; i++){
            getDateBtn[i].onclick = showLightBox;
        }
        function showLightBox(){
            getLightBox.style.display = 'block';
        }    
    }


    // Preparation

    function threeStart() {
        initScene();
        initObject();
        initRenderer();
        initCamera();
        render();
        initParallax();
        ImgDriver();
        showCurrentMonth();

        window.addEventListener('mousewheel', driver);
        // window.addEventListener('resize',screenVarier);
    }

    window.onload = threeStart();

    
