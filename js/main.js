// group 23

var renderer, material, mesh, scene, camera, camera1, camera2, camera3, date, clock;
var rocketship, planet;

// each empty array represents one semi hemisphere
var objects = [[], [], [], []];

const r = 100;
// const h = TODO: spaceship
const cMax = r / 20;
const cMin = r / 24;

const angleMin = 0;
const angleMax = 2 * Math.PI;

var wireframe = false;

function randomValue(min, max) {
    'use strict';

    return Math.random() * (max - min) + min;
}

function whichSemiHemisphere(phi, theta) {
    if (phi < Math.PI) {
        if (theta < Math.PI) {
            return 0;
        }
        return 1;
    }
    if (theta < Math.PI) {
        return 2;
    }
    return 3;
}

function addRocketshipLeg(obj, x, y, z) {
    'use strict';

    const geometry = new THREE.CapsuleGeometry( 2, 5, 4, 8 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addRocketshipTop(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.CylinderGeometry( 1, 6, 10, 32 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y + 20, z);
    obj.add(mesh);
}

function addRocketshipBody(obj, x, y, z) {
    'use strict';
    const geometry = new THREE.CylinderGeometry( 6, 6, 30, 32 );
    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createRocketship(x, y, z) {
    'use strict';
    
    rocketship = new THREE.Object3D();
    
    material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: false });
    var phi = randomValue(angleMin, angleMax);
    var theta = randomValue(angleMin, angleMax);

    var spherical = new THREE.Spherical(r * 1.2, phi, theta);
   
    addRocketshipTop(rocketship, 0, 0, 0);
    addRocketshipLeg(rocketship, -8, -10, 0);
    addRocketshipLeg(rocketship, 8, -10, 0);
    addRocketshipLeg(rocketship, 0, -10, 8);
    addRocketshipLeg(rocketship, 0, -10, -8);
    addRocketshipBody(rocketship, 0, 0, 0);
    
    
    rocketship.position.setFromSpherical(spherical);


    scene.add(rocketship);
}

function createTetrahedron(color) {
    'use strict';

    var tetrahedron = new THREE.Object3D();

    var c = randomValue(cMax, cMin);
    var phi = randomValue(angleMin, angleMax);
    var theta = randomValue(angleMin, angleMax);

    var spherical = new THREE.Spherical(r * 1.2, phi, theta);

    const geometry = new THREE.TetrahedronGeometry(c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);

    tetrahedron.add(mesh);
    tetrahedron.position.setFromSpherical(spherical);

    const semiHemisphere = whichSemiHemisphere(phi, theta);
    objects[semiHemisphere].push(tetrahedron);
    scene.add(tetrahedron);
}

function createOctahedron(color) {
    'use strict';

    var octahedron = new THREE.Object3D();

    var c = randomValue(cMax, cMin);
    var phi = randomValue(angleMin, angleMax);
    var theta = randomValue(angleMin, angleMax);

    var spherical = new THREE.Spherical(r * 1.2, phi, theta);

    const geometry = new THREE.OctahedronGeometry(c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh =  new THREE.Mesh(geometry, material);

    octahedron.add(mesh);
    octahedron.position.setFromSpherical(spherical);
    
    const semiHemisphere = whichSemiHemisphere(phi, theta);
    objects[semiHemisphere].push(octahedron);
    scene.add(octahedron);
}

function createCone(color) {
    'use strict';

    var cone = new THREE.Object3D();

    var c = randomValue(cMax, cMin);
    var phi = randomValue(angleMin, angleMax);
    var theta = randomValue(angleMin, angleMax);

    var spherical = new THREE.Spherical(r * 1.2, phi, theta);
    
    const geometry = new THREE.ConeGeometry(c, c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);

    cone.add(mesh);
    cone.position.setFromSpherical(spherical);

    const semiHemisphere = whichSemiHemisphere(phi, theta);
    objects[semiHemisphere].push(cone);
    scene.add(cone);
}

function createPlanet(color) {
    'use strict';

    planet = new THREE.Object3D();

    const geometry = new THREE.SphereGeometry(r);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);

    
    planet.add(mesh);
    planet.add(rocketship);
    objects.push(planet);
    scene.add(planet);

    planet.position.x = 0;
    planet.position.y = 0;
    planet.position.z = 0;
}

function createIcosahedron(color) {
    'use strict';

    var icosahedron = new THREE.Object3D();

    var c = randomValue(cMax, cMin);
    var phi = randomValue(angleMin, angleMax);
    var theta = randomValue(angleMin, angleMax);

    var spherical = new THREE.Spherical(r * 1.2, phi, theta);

    const geometry = new THREE.IcosahedronGeometry(c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);

    icosahedron.add(mesh);
    icosahedron.position.setFromSpherical(spherical);

    const semiHemisphere = whichSemiHemisphere(phi, theta);
    objects[semiHemisphere].push(icosahedron);
    scene.add(icosahedron);
}

function createBox(color) {
    'use strict';

    var box = new THREE.Object3D();

    var c = randomValue(cMax, cMin);
    var phi = randomValue(angleMin, angleMax);
    var theta = randomValue(angleMin, angleMax);

    var spherical = new THREE.Spherical(r * 1.2, phi, theta);

    const geometry = new THREE.BoxGeometry(c, c, c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });

    const mesh = new THREE.Mesh(geometry, material);

    box.add(mesh);
    box.position.setFromSpherical(spherical);

    const semiHemisphere = whichSemiHemisphere(phi, theta);
    objects[semiHemisphere].push(box);
    scene.add(box);
}

function createDodecahedron(color) {
    'use strict';

    var dodecahedron = new THREE.Object3D();

    var c = randomValue(cMax, cMin);
    var phi = randomValue(angleMin, angleMax);
    var theta = randomValue(angleMin, angleMax);

    var spherical = new THREE.Spherical(r * 1.2, phi, theta);

    const geometry = new THREE.DodecahedronGeometry(c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);

    dodecahedron.add(mesh);
    dodecahedron.position.setFromSpherical(spherical);

    const semiHemisphere = whichSemiHemisphere(phi, theta);
    objects[semiHemisphere].push(dodecahedron);
    scene.add(dodecahedron);
}



function createScene() {
    'use strict';

    scene = new THREE.Scene();

    createPlanet(0xffffff);
    createRocketship(0, 0 , 0);

    for (let i = 0; i < 5; i++) {
        createCone(0xffffff);
    }

    for (let i = 0; i < 3; i++) {
        createTetrahedron(0xffffff);
    }

    for (let i = 0; i < 3; i++) {
        createOctahedron(0xffffff);
    }

    for (let i = 0; i < 4; i++) {
        createBox(0xffffff);
    }

    for (let i = 0; i < 2; i++) {
        createDodecahedron(0xffffff);
    }

    for (let i = 0; i < 3; i++) {
        createIcosahedron(0xffffff);
    }

    scene.add(new THREE.AxesHelper(10));
}

function createCameras() {
    'use strict';
    
    camera1 = new THREE.OrthographicCamera(-200, 200, -200, 200, 1, 1000);
    camera1.lookAt(scene.position);

    camera2 = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 1, 1000);
    camera2.position.set(0, 0, -300);
    camera2.lookAt(scene.position);

    // camera3 = new THREE.PerspectiveCamera();
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        // spaceship movement controls
        case 37: // left arrow
            longitude = true;
            break;
        case 39: // right arrow
            azimuth = true;
            break;
        case 38: // up arrow
            latitude = true;
            break;
        case 40: // down arrow
            zenith = true;
            break;

        default:
            break;
    }
}

function onKeyUp(e) {
    'use strict';

    switch (e.keyCode) {
        // spaceship movement controls
        case 37: // left arrow
            longitude = false;
            break;
        case 39: // right arrow
            azimuth = false;
            break;
        case 38: // up arrow
            latitude = false;
            break;
        case 40: // down arrow
            zenith = false;
            break;

        // camera controls
        case 49: // 1
            camera = camera1;
            break;
        case 50: // 2
            camera = camera2;
            break;
        case 51: // 3
            camera = camera3;
            break;

        // switch wireframe mode
        case 52: // 4
            wireframe = true;
            break;

        default:
            break;
    }
}

function onResize() {
    'use strict';

    renderer.setSize(window.innerWidth, window.innerHeight);
    
    if (window.innerHeight > 0 && window.innerWidth > 0) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }
}

function init() {
    'use strict';

    clock = new THREE.Clock();
    renderer = new THREE.WebGLRenderer({
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000);
    document.body.appendChild(renderer.domElement);

    createScene();
    createCameras();

    camera = camera1;

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function update() {
    'use strict';

    // switch wireframe on and off 
    if (wireframe) {
        objects.forEach(function(element) {
            if (element instanceof THREE.Object3D) {
                element.children.forEach(function(mesh) {
                    mesh.material.wireframe = !mesh.material.wireframe;
                });
                return;
            }
            element.forEach(function(object) {
                object.children.forEach(function(mesh) {
                    mesh.material.wireframe = !mesh.material.wireframe;
                });
            });
        });
        wireframe = false;
    }
    var delta = clock.getDelta();
    var elapsed = clock.elapsedTime;

    rocketship.position.x = planet.position.x + Math.sin(elapsed*2) * r *1.2;
    rocketship.position.z = planet.position.z + Math.cos(elapsed*2) * r *1.2;
    rocketship.rotation.x += delta;
    rocketship.rotation.z += 0.2 * delta;
}

function animate() {
    'use strict';

    update();

    render();

    requestAnimationFrame(animate);
}