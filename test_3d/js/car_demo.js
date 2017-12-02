window.onload = function() {

    // 渲染器（renderer）
    var renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('main')
    });
    renderer.setSize(window.innerWidth/2, window.innerHeight/2);
    renderer.setClearColor(0xcccccc);
    // 场景（scene）
    var scene = new THREE.Scene();

    // 照相机（camera）
    var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 1000);
  camera.position.set(100, 100, 100);
  camera.lookAt(new THREE.Vector3(0, 0, 0));

//添加一个正方体作为光源模型
  var materialLambert = new THREE.MeshLambertMaterial({
    color: 0xffff00,//颜色设置为黄色
    emissive: 0xff0000//emissive是材质的自发光颜色
  });
  //Lambert材质立方体
  var cubeLambert = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), materialLambert);
  cubeLambert.position.set(100, 100, 100);
  scene.add(cubeLambert);
  //Lambert材质立方体
  var cubeLambert2 = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), materialLambert);
  cubeLambert2.position.set(-100, 100, -100);
  scene.add(cubeLambert2);
  //Lambert材质立方体
  var cubeLambert3 = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), materialLambert);
  cubeLambert3.position.set(-100, 100, 100);
  scene.add(cubeLambert3);
  //Lambert材质立方体
  var cubeLambert4 = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2), materialLambert);
  cubeLambert4.position.set(100, 100, -100);
  scene.add(cubeLambert4);

    // // 准备控制器 (OrbitControls)
    // var controls = new THREE.OrbitControls(camera);
    // controls.target = new THREE.Vector3(0, 0, 0);
    // /* 设置滚动最小值和最大值 */
    // controls.minDistance = 3.5;
    // controls.maxDistance = 8;
    // /* 设置旋转最小角度和最大角度 */
    // controls.minPolarAngle = 0;
    // controls.maxPolarAngle = Math.PI/2;
    // scene.add(camera);

  //控制器
  var controls = new THREE.TrackballControls(camera);
  controls.rotateSpeed = 2.0;
  controls.zoomSpeed = 2.4;
  controls.panSpeed = 1.6;
  controls.noZoom = false;
  controls.noPan = false;
  controls.staticMoving = true;
  controls.dynamicDampingFactor = 0.3;
  controls.keys = [65, 83, 68];
  controls.addEventListener('change', render);

  scene.add(camera);


    // 进度条（progress bar）
    var progress = document.getElementById('progress');
    var proInfo = document.getElementById('progress-info').getElementsByTagName('span')[0];

    // 贴图（texture loader）
    var tLoader = new THREE.TextureLoader();
    var textureFloor = tLoader.load('img/floor.jpg', function() {
        renderer.render(scene, camera);
    });
    textureFloor.wrapS = THREE.RepeatWrapping;
    textureFloor.wrapT = THREE.RepeatWrapping;
    textureFloor.repeat.set(6, 8);
    // 地板（plane）
    // var plane = new THREE.Mesh(new THREE.PlaneGeometry(6, 8),
    //     new THREE.MeshLambertMaterial({
    //         map: textureFloor
    //     })
    // );
    // plane.rotation.x = -Math.PI / 2;
    // plane.position.y = -1.15;
    // scene.add(plane);


  // 汽车模型（model）
  var car;
  var mtlLoader = new THREE.MTLLoader();
  mtlLoader.load('model/xiaotao.mtl', function(materials) {
      var objLoader = new THREE.OBJLoader();//创建loader变量，用于导入模型
      objLoader.setMaterials(materials);
      objLoader.load('model/xiaotao.obj', function(obj) {
          obj.traverse(function(child) {
              if (child instanceof THREE.Mesh) {
                  child.material.side = THREE.DoubleSide;
              }
          });
          obj.scale.set(0.1,0.1,0.1);
          obj.position.set(0, 0, 0);
          obj.rotation.set(-Math.PI / 2, Math.PI / 2, Math.PI / 2);
          car = obj;//储存到变量 car 中
          scene.add(obj);////将导入的模型添加到场景中
          renderer.render(scene, camera);//渲染
      }, function(xhr) {//加载进度条
          if (xhr.lengthComputable) {
              var percent = +(xhr.loaded / xhr.total * 100).toFixed(2);
              progress.style.marginLeft = '-' + (100 - percent) + '%';
              proInfo.innerText = percent;
          }
      }, function(err) {
          console.error(err);
      });
  });


  // 灯光（light）
  var ambientLight = new THREE.AmbientLight(0x0c0c0c);
  scene.add(ambientLight);

  var plintLight1 = new THREE.PointLight(0x999999);
  plintLight1.position.set(200, 100, 200);
  scene.add(plintLight1);
  var plintLight2 = new THREE.PointLight(0x999999);
  plintLight2.position.set(200, 100, -200);
  scene.add(plintLight2);
  var plintLight3 = new THREE.PointLight(0x7a7a7a);
  plintLight3.position.set(-200, 100, -200);
  scene.add(plintLight3);
  var plintLight4 = new THREE.PointLight(0x999999);
  plintLight4.position.set(-200, 100, 200);
  scene.add(plintLight4);


    //坐标轴x-y-z
    function drawAxes() {
        // x-axis
        var xGeo = new THREE.Geometry();
        xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        xGeo.vertices.push(new THREE.Vector3(50, 0, 0));
        var xMat = new THREE.LineBasicMaterial({
            color: 0xff0000
        });
        var xAxis = new THREE.Line(xGeo, xMat);
        scene.add(xAxis);

        // y-axis
        var yGeo = new THREE.Geometry();
        yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        yGeo.vertices.push(new THREE.Vector3(0, 50, 0));
        var yMat = new THREE.LineBasicMaterial({
            color: 0x00ff00
        });
        var yAxis = new THREE.Line(yGeo, yMat);
        scene.add(yAxis);

        // z-axis
        var zGeo = new THREE.Geometry();
        zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
        zGeo.vertices.push(new THREE.Vector3(0, 0, 50));
        var zMat = new THREE.LineBasicMaterial({
            color: 0x00ccff
        });
        var zAxis = new THREE.Line(zGeo, zMat);
        scene.add(zAxis);
    }
    drawAxes();

    //开启监听渲染
    function render() {
      stats.update();
      renderer.render(scene, camera);
    }

    // 监控（stats）
    var stats = new Stats();
    document.body.appendChild(stats.dom);

    // 执行动画（animate）
    animate();
    function animate() {
        var perforObj = performance.now() / 1000;
        controls.update(perforObj - 1);
        requestAnimationFrame(animate);
        render();
    }

    /* 事件和函数（events & functions）*/

    // 当调整浏览器窗口的大小时,发生 resize 事件
    window.addEventListener('resize', function() {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    });

    /*// 用户按下键盘按钮操作时，发生 keydow 事件
    var disUnit = 0.01;
    var radUnit = Math.PI / 36;
    document.addEventListener('keydown', function(event) {
        switch (event.keyCode) {
            case 38:    //'up'
            case 87:    // 'W'
                drive(car, disUnit, 0);
                break;
            case 40:    //'down'
            case 83:    // 'S'
                drive(car, -disUnit, 0);
                break;
            case 37:    //'left'
            case 65:    // 'A'
                drive(car, 0, radUnit);
                break;
            case 39:    //'right'
            case 68:    // 'D'
                drive(car, 0, -radUnit);
                break;
            default:
                // nothing
        }
    });

    //汽车运行函数
    function drive(car, dis, rad) {
        car.rotation.z += rad;
        var direction = car.rotation.z - Math.PI / 2;
        car.position.x += -dis * Math.cos(direction);
        car.position.z += dis * Math.sin(direction);
        stats.update();
        renderer.render(scene, camera);
    }*/
};


