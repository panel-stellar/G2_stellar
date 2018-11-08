
var canvasEnv = document.querySelector('#stellar_canvas');
var stellarTxt = document.querySelector('#stellar_text');


// declaration

var scene,camera,object,light,renderer;
var rendererWidth,rendererHeight;


// Initialize the renderer

function initRenderer(){
    
    rendererWidth = canvasEnv.clientWidth;
    rendererHeight = canvasEnv.clientHeight;

    renderer = new THREE.WebGLRenderer({
        canvas: canvasEnv,
    });
    renderer.setSize(rendererWidth,rendererHeight);

    console.log('initRenderer:ok');
}

// Initialize the camera

function initCamera(){
    //設定相機參數
    var view_angle = 45;
    var aspect = canvasEnv.clientWidth / canvasEnv.clientHeight; 
    var near = 0.1;
    var far = 10000;
    camera = new THREE.PerspectiveCamera(view_angle,aspect,0.01,10000);
    camera.position.set(0,0,400);
    camera.up.set(0,1,0);
    camera.lookAt(0,0,0);   
    console.log('initCamera:ok');
}

// Initialize the scene

function initScene(){
    scene = new THREE.Scene();
    console.log('initScene:ok');
}

// Initialize the objects

function initObj(){


    //設定球體的值
    var radius1 = 50, segemnt1 = 16, rings1 = 16;
    var radius2 = 30, segemnt2 = 16, rings2 = 16;
    var radius3 = 20, segment3 = 16, rings3 = 16;
    var radius4 = 25, segment4 = 16, rings4 = 16;

    // var loader = new THREE.TextureLoader();
    // var sunSkinPic = loader.load('../img/knowledge/source/test.jpg');

    var sphereMaterial1 = new THREE.MeshLambertMaterial({color:0xFF4D00});
    var sphereMaterial2 = new THREE.MeshLambertMaterial({color:0xFF8500});
    var sphereMaterial3 = new THREE.MeshLambertMaterial({color:0xFFFFFF});
    var sphereMaterial4 = new THREE.MeshLambertMaterial({color:0x000BFFF});

    var sphere1 = new THREE.Mesh(
        new THREE.SphereGeometry(radius1,segemnt1,rings1),
        sphereMaterial1
        );
    var sphere2 = new THREE.Mesh(
        new THREE.SphereGeometry(radius2,segemnt2,rings2),
        sphereMaterial2
    );
    var sphere3 = new THREE.Mesh(
        new THREE.SphereGeometry(radius3,segment3,rings3),
        sphereMaterial3
    );
    var sphere4 = new THREE.Mesh(
        new THREE.SphereGeometry(radius4,segment4,rings4),
        sphereMaterial4
    );

    sphere1.geometry.verticesNeedUpdate = true;
    sphere1.geometry.normalsNeedUpdate = true;

    sphere2.geometry.verticesNeedUpdate = true;
    sphere2.geometry.normalsNeedUpdate = true;

    sphere3.geometry.verticesNeedUpdate = true;
    sphere3.geometry.normalsNeedUpdate = true;

    sphere4.geometry.verticesNeedUpdate = true;
    sphere4.geometry.normalsNeedUpdate = true;

    sphere1.position.set(50,-30,60);
    sphere2.position.set(130,60,30);
    sphere3.position.set(0,80,0);
    sphere4.position.set(-70,10,60);

    scene.add(sphere1);
    scene.add(sphere2);
    scene.add(sphere3);
    scene.add(sphere4);

    var pointLight = new THREE.PointLight(0xFFFFFF);
    pointLight.position.set(-150,0,300);
    pointLight.intensity = 1.5;
    // pointLight.distance = 22;

    scene.add(pointLight);

    //星星數量
    var particles = 20000;
    //use buffer 做星星
    var bufferGeometry = new THREE.BufferGeometry();
    var positions = new Float32Array(particles * 3);
    var colors = new Float32Array(particles * 3);
    var color = new THREE.Color();

    var gap = 2200; //星星的最近出現位置

    for (var i = 0; i< positions.length; i += 3) {
        //positions

        // -2gap < x < 2gap
        var x = Math.random() * gap * 2 * (Math.random() < .5 ? -1 : 1);
        var y = Math.random() * gap * 2 * (Math.random() < .5 ? -1 : 1);
        var z = Math.random() * gap * 2 * (Math.random() < .5 ? -1 : 1);
        //找出x,y,z中絕對值最大的數
        var biggest = Math.abs(x) > Math.abs(y) ? Math.abs(x) > Math.abs(z) ? 'x' : 'z' : Math.abs(y) > Math.abs(z) ? 'y' : 'z';

        var pos = { x:x, y:y, z:z };

        // 如果最大值比n,則值為n(-n)
        if (Math.abs(pos[biggest]) < gap ) pos[biggest] < 0 ? -gap : gap;
        x = pos ['x'];
        y = pos ['y'];
        z = pos ['z'];

        positions[i] = x;
        positions[i + 1] = y;
        positions[i + 2] = z;

        //colors

        // 70%的星星有顏色
        var hasColor = Math.random() > 0.3;
        var vx = undefined;
            vy = undefined;
            vz = undefined;

        if(hasColor) {
            vx = (Math.random() + 1 ) / 2;
            vy = (Math.random() + 1 ) / 2;
            vz = (Math.random() + 1 ) / 2;
        } else {
            vx = 1;
            vy = 1;
            vz = 1;
        }
        
        color.setRGB(vx, vy, vz);
        colors[i] = color.r;
        colors[i + 1 ] = color.g;
        colors[i + 2 ] = color.b;
        
    }

    bufferGeometry.addAttribute('position' , new THREE.BufferAttribute( positions , 3));
    bufferGeometry.addAttribute('color' , new THREE.BufferAttribute( colors , 3 ));
    bufferGeometry.computeBoundingSphere();

    //星星的material
    var starMaterial = new THREE.PointsMaterial({ size:6, vertexColors: THREE.VertexColors });
    particlesSystem = new THREE.Points(bufferGeometry, starMaterial);

    scene.add(particlesSystem);

    console.log('initObj:ok');
}

// Start render

function startRender(){
    requestAnimationFrame(startRender); 
    renderer.render(scene, camera);
}


//resize

window.addEventListener('resize',adjustCanvasAndItsNeighbor(),false);

function adjustCanvasAndItsNeighbor(){

    var w = window.innerWidth * 0.6;
    var w2 = window.innerWidth - w;

    canvasEnv.style.width = w +'px';
    canvasEnv.style.height = '100vh';

    stellarTxt.style.width = w2 + 'px';
    stellarTxt.style.height = '100vh';

}

// Preparation

function initThree(){
    adjustCanvasAndItsNeighbor();
    initRenderer();
    initCamera();
    initScene();
    initObj();
    startRender();  
}

window.onload = initThree;
