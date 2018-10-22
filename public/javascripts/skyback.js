
    var pinsFormation = [];
    var pins = [ 6 ];
    pinsFormation.push( pins );
    pins = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
    pinsFormation.push( pins );
    pins = [ 0 ];
    pinsFormation.push( pins );
    pins = []; // cut the rope ;)
    pinsFormation.push( pins );
    pins = [ 0, cloth.w ]; // classic 2 pins
    pinsFormation.push( pins );
    pins = pinsFormation[ 1 ];
    function togglePins() {
        pins = pinsFormation[ ~~ ( Math.random() * pinsFormation.length ) ];
    }
    if ( WEBGL.isWebGLAvailable() === false ) {
        document.body.appendChild( WEBGL.getWebGLErrorMessage() );
    }
    var clothGeometry;
    var container, stats;
    var camera, scene, renderer;
    var sphere;
    var object;
    let window_W = window.innerWidth  ;
    let window_H = window.innerHeight-65;
    init();
    animate();
    function init() {
        container = document.getElementById( 'three-container' );
        // document.body.appendChild( container );
        // scene
        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0xcce0ff );
        scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 );
        // camera
        camera = new THREE.PerspectiveCamera( 45, window_W / window_H, 1, 10000 );
        camera.position.set( 1000, 50, 1500 );
        // lights
        scene.add( new THREE.AmbientLight( 0x666666 ) );
        var light = new THREE.DirectionalLight( 0xdfebff, 1 );
        light.position.set( 50, 200, 100 );
        light.position.multiplyScalar( 1.3 );
        light.castShadow = true;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
        var d = 300;
        light.shadow.camera.left = - d;
        light.shadow.camera.right = d;
        light.shadow.camera.top = d;
        light.shadow.camera.bottom = - d;
        light.shadow.camera.far = 1000;
        scene.add( light );
        // cloth material
        var loader = new THREE.TextureLoader();
        var clothTexture = loader.load( './images/circuit_pattern.png' );
        clothTexture.anisotropy = 16;
        var clothMaterial = new THREE.MeshLambertMaterial( {
            map: clothTexture,
            side: THREE.DoubleSide,
            alphaTest: 0.5
        } );
        // cloth geometry
        clothGeometry = new THREE.ParametricGeometry( clothFunction, cloth.w, cloth.h );
        // cloth mesh
        object = new THREE.Mesh( clothGeometry, clothMaterial );
        object.position.set( 0, 0, 0 );
        object.castShadow = true;
        scene.add( object );
        object.customDepthMaterial = new THREE.MeshDepthMaterial( {
            depthPacking: THREE.RGBADepthPacking,
            map: clothTexture,
            alphaTest: 0.5
        } );
        // sphere
        var ballGeo = new THREE.SphereBufferGeometry( ballSize, 32, 16 );
        var ballMaterial = new THREE.MeshLambertMaterial();
        sphere = new THREE.Mesh( ballGeo, ballMaterial );
        sphere.castShadow = true;
        sphere.receiveShadow = true;
        scene.add( sphere );
        // ground
        var groundTexture = loader.load( './images/grasslight-big.jpg' );
        groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping;
        groundTexture.repeat.set( 25, 25 );
        groundTexture.anisotropy = 16;
        var groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
        var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
        mesh.position.y = - 250;
        mesh.rotation.x = - Math.PI / 2;
        mesh.receiveShadow = true;
        scene.add( mesh );
        // poles
        var poleGeo = new THREE.BoxBufferGeometry( 5, 375, 5 );
        var poleMat = new THREE.MeshLambertMaterial();
        var mesh = new THREE.Mesh( poleGeo, poleMat );
        mesh.position.x = - 125;
        mesh.position.y = - 62;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add( mesh );
        var mesh = new THREE.Mesh( poleGeo, poleMat );
        mesh.position.x = 125;
        mesh.position.y = - 62;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add( mesh );
        var mesh = new THREE.Mesh( new THREE.BoxBufferGeometry( 255, 5, 5 ), poleMat );
        mesh.position.y = - 250 + ( 750 / 2 );
        mesh.position.x = 0;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add( mesh );
        var gg = new THREE.BoxBufferGeometry( 10, 10, 10 );
        var mesh = new THREE.Mesh( gg, poleMat );
        mesh.position.y = - 250;
        mesh.position.x = 125;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add( mesh );
        var mesh = new THREE.Mesh( gg, poleMat );
        mesh.position.y = - 250;
        mesh.position.x = - 125;
        mesh.receiveShadow = true;
        mesh.castShadow = true;
        scene.add( mesh );
        // renderer
        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window_W, window_H );
        container.appendChild( renderer.domElement );
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        // controls
        var controls = new THREE.OrbitControls( camera, renderer.domElement );
        controls.maxPolarAngle = Math.PI * 0.5;
        controls.minDistance = 1000;
        controls.maxDistance = 5000;
        // performance monitor
        // stats = new Stats();
        // container.appendChild( stats.dom );
        //
        window.addEventListener( 'resize', onWindowResize, false );
        sphere.visible =  true; //默认让球出来
    }
    //
    function onWindowResize() {
        camera.aspect = window_W / window_H;
        camera.updateProjectionMatrix();
        renderer.setSize( window_W, window_H );
    }
    //
    function animate() {
        requestAnimationFrame( animate );
        var time = Date.now();
        var windStrength = Math.cos( time / 7000 ) * 20 + 40;
        windForce.set( Math.sin( time / 2000 ), Math.cos( time / 3000 ), Math.sin( time / 1000 ) )
        windForce.normalize();
        windForce.multiplyScalar( windStrength );
        simulate( time );
        render();
        // stats.update();
    }
    function render() {
        var p = cloth.particles;
        for ( var i = 0, il = p.length; i < il; i ++ ) {
            clothGeometry.vertices[ i ].copy( p[ i ].position );
        }
        clothGeometry.verticesNeedUpdate = true;
        clothGeometry.computeFaceNormals();
        clothGeometry.computeVertexNormals();
        sphere.position.copy( ballPosition );
        renderer.render( scene, camera );
    }
























