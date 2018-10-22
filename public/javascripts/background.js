// 加载three.js背景

;(function () {
    //
    var scene,renderer,camera,light,controls,div;
    var auxiliary;//辅助坐标系
    let width = window.innerWidth - 40;
    let height = window.innerHeight * 0.42;

    //程序入口
    draw();

    /**
     * 初始化场景
     */
    function init() {
        //scene 场景
        scene = new THREE.Scene();
        //相机
        camera = new THREE.PerspectiveCamera(45,width/height,100,20000);
        camera.position.set(0,0,200);



        //渲染器
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0xf6f6f6);//设置背景颜色
        renderer.setSize(width,height);
        document.getElementById("three").appendChild(renderer.domElement);


        //添加光源
        scene.add(new THREE.AmbientLight(0xffffff));

        //添加平行光，平行光可以看做太阳光
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        // scene.add(light);

    }

    /**
     * 鼠标控制
     */
    function initControls() {

        controls = new THREE.OrbitControls(camera,renderer.domElement);

        // 如果使用animate方法时，将此函数删除
        //controls.addEventListener( 'change', render );
        // 使动画循环使用时阻尼或自转 意思是否有惯性
        controls.enableDamping = true;
        //动态阻尼系数 就是鼠标拖拽旋转灵敏度
        controls.dampingFactor = 0.25;
        //是否可以缩放
        controls.enableZoom = false;
        //是否自动旋转
        controls.autoRotate = false;
        controls.autoRotateSpeed = 0.2;
        //设置相机距离原点的最远距离
        controls.minDistance = 20;
        //设置相机距离原点的最远距离
        controls.maxDistance = 20000000000;
        //是否开启右键拖拽
        controls.enablePan = false;
        // controls.target = new THREE.Vector3(0,0,0);


    }
    /**
     * 适应窗口变化
     */
    function onWindowResize() {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);

    }

    /**
     * 动画
     */
    function animate() {
        //更新控制器
        controls.update();
        renderer.render(scene,camera);
        requestAnimationFrame(animate);
    }

    //开始函数
    function draw() {
        init();//初始化
        initObj();//画模型
        initControls();//控制器初始化
        animate();//动画
        window.onresize = onWindowResize;//根据窗口变化
    }


    /**
     * 画模型
     */
    function initObj() {
        var loader = new THREE.TextureLoader();
        var groundTexture = loader.load( './images/grasslight-big.jpg' );
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set( 25, 25 );
        groundTexture.anisotropy = 16;
        var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
        var pmesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
        pmesh.position.y = - 350;
        pmesh.rotation.x = - Math.PI / 2;
        pmesh.receiveShadow = true;
        scene.add( pmesh );


       let box = new THREE.BoxGeometry(120,100,80);
        //加载六个面的纹理贴图
        var texture1 = THREE.ImageUtils.loadTexture("./images/1.jpg");
        var texture2= THREE.ImageUtils.loadTexture("./images/2.jpg");
        var texture3 = THREE.ImageUtils.loadTexture("./images/3.jpg");
        var texture4= THREE.ImageUtils.loadTexture("./images/4.png");
        var texture5 = THREE.ImageUtils.loadTexture("./images/5.jpg");
        var texture6 = THREE.ImageUtils.loadTexture("./images/6.jpg");
        var materialArr=[
            //纹理对象赋值给6个材质对象
            new THREE.MeshPhongMaterial({map:texture1}),
            new THREE.MeshPhongMaterial({map:texture2}),
            new THREE.MeshPhongMaterial({map:texture3}),
            new THREE.MeshPhongMaterial({map:texture4}),
            new THREE.MeshPhongMaterial({map:texture5}),
            new THREE.MeshPhongMaterial({map:texture6})
        ];
        //6个材质对象组成的数组赋值给MeshFaceMaterial构造函数
        var facematerial=new THREE.MeshFaceMaterial(materialArr);
       let mesh = new THREE.Mesh(box,facematerial);

       scene.add(mesh);


     }
})();