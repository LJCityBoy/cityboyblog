// 加载three.js背景

;(function () {
    //
    var scene,renderer,camera,light,controls,div;
    var auxiliary;//辅助坐标系



    //程序入口
    draw();

    /**
     * 初始化场景
     */
    function init() {
        //scene 场景
        scene = new THREE.Scene();
        //相机
        camera = new THREE.PerspectiveCamera(75,window.innerWidth/250,100,20000*10);
        camera.position.set(0,0,150);




        //渲染器
        renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setClearColor(0xf6f6f6);//设置背景颜色
        renderer.setSize(window.innerWidth,250);
        document.getElementById("three").appendChild(renderer.domElement);
        // $("#three").appendChild(renderer.domElement);
        // document.body.appendChild(renderer.domElement);//加到控制器中

        //添加光源
        scene.add(new THREE.AmbientLight(0xffffff));

        //添加平行光，平行光可以看做太阳光
        light = new THREE.DirectionalLight(0xffffff);
        light.position.set(1, 1, 1);
        // scene.add(light);

        //辅助坐标系
        //轴辅助 （每一个轴的长度）
        // auxiliary = new THREE.AxesHelper(100);
        // auxiliary.z = -100;
        // scene.add(auxiliary);
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
        controls.autoRotate = true;
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
        camera.aspect = window.innerWidth / 250;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, 250);

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

        //声明一个球体
        var geometry = new THREE.SphereBufferGeometry( 500, 60, 40 );
        // 反转X轴上的几何图形，使所有的面点向内。
        geometry.scale( - 1, 1, 1 );
        //声明球体纹理
        var material = new THREE.MeshBasicMaterial( {
            map: new THREE.TextureLoader().load( '../images/7.jpg' ) //加载一整张纹理图片
        } );
        mesh = new THREE.Mesh( geometry, material );
        scene.add( mesh );

     }
})();