// group 23

var renderer, scene, camera, camera1, camera2, camera3, date, clock;
var rocketship, planet;

// each empty array represents one semi hemisphere
var objects = [[], [], [], []];

const r = 100;
const h = r / 10;
const cMax = r / 20;
const cMin = r / 24;

const angleMin = 0;
const angleMax = 2 * Math.PI;

var wireframe = false;

var showHitbox = false, showHitboxChanged = false;

// rocketship movement controls
var longitude, latitude, zenith, azimuth;
const velocity = 0.01;

function randomValue(min, max) {
    'use strict';

    return Math.random() * (max - min) + min;
}

function whichSemiHemisphere(phi, theta) {
    'use strict';

    if (Math.sin(phi) > 0) {
        if (Math.cos(theta) > 0) {
            return 0;
        }
        return 1;
    }
    if (Math.cos(theta) > 0) {
        return 2;
    }
    return 3;
}

function addRocketshipLeg(obj, color, x, y, z) {
    'use strict';

    const geometry = new THREE.CapsuleGeometry(h / 15, h / 6);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addRocketshipTop(obj, color, x, y, z) {
    'use strict';

    const geometry = new THREE.CylinderGeometry(h / 30, h / 6, 2 * h / 10);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function addRocketshipBody(obj, color, x, y, z) {
    'use strict';

    const geometry = new THREE.CylinderGeometry(h / 6, h / 6, 8 * h / 10);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    obj.add(mesh);
}

function createRocketship() {
    'use strict';
    
    rocketship = new THREE.Object3D();
    rocketship.userData = {
        phi: 0.1,
        theta: 0.1,
        hitRadius: h / 2
    };

    var spherical = new THREE.Spherical(r * 1.2, rocketship.userData.phi, rocketship.userData.theta);
   
    addRocketshipTop(rocketship, 0x00ff00, 0, (9 * h / 10) / 2, 0);
    addRocketshipLeg(rocketship, 0x00ff00, - (h / 6), - h / 3, 0);
    addRocketshipLeg(rocketship, 0x00ff00, (h / 6), - h / 3, 0);
    addRocketshipLeg(rocketship, 0x00ff00, 0, - h / 3, (h / 6));
    addRocketshipLeg(rocketship, 0x00ff00, 0, - h / 3, - (h / 6));
    addRocketshipBody(rocketship, 0x00ff00, 0, 0, 0);
    
    rocketship.position.setFromSpherical(spherical);
    rocketship.lookAt(planet.position);

    const axes = new THREE.AxesHelper(20);
    rocketship.add(axes);

    scene.add(rocketship);
    objects.push(rocketship);
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
    objects.push(planet);
    scene.add(planet);

    planet.position.x = 0;
    planet.position.y = 0;
    planet.position.z = 0;
}

function createTetrahedron(color) {
    'use strict';

    var tetrahedron = new THREE.Object3D();

    var c = randomValue(cMax, cMin);
    tetrahedron.userData = {hitRadius: c};

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
    octahedron.userData = {hitRadius: c};

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
    cone.userData = {hitRadius: c};

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

function createIcosahedron(color) {
    'use strict';

    var icosahedron = new THREE.Object3D();

    var c = randomValue(cMax, cMin);
    icosahedron.userData = {hitRadius: c};

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
    box.userData = {hitRadius: c};

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
    dodecahedron.userData = {hitRadius: c};

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
    createRocketship();

    for (let i = 0; i < 5; i++) {
        createCone(0x0000ff);
    }

    for (let i = 0; i < 3; i++) {
        createTetrahedron(0x0000ff);
    }

    for (let i = 0; i < 3; i++) {
        createOctahedron(0x0000ff);
    }

    for (let i = 0; i < 4; i++) {
        createBox(0x0000ff);
    }

    for (let i = 0; i < 2; i++) {
        createDodecahedron(0x0000ff);
    }

    for (let i = 0; i < 3; i++) {
        createIcosahedron(0x0000ff);
    }

    scene.add(new THREE.AxesHelper(150));
}

function createCameras() {
    'use strict';
    
    camera1 = new THREE.OrthographicCamera(200, -200, 200, -200, 1, 1000);
    camera1.position.set(300, 0, 0);
    camera1.lookAt(scene.position);

    camera2 = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 1, 1000);
    camera2.position.set(-300, 0, 0);
    camera2.lookAt(scene.position);

    camera3 = new THREE.PerspectiveCamera(90, innerWidth / innerHeight, 1, 1000);
    camera3.position.set(10, -20, 0);
    camera3.lookAt(rocketship.position.x, rocketship.position.y, rocketship.position.z);
}

function onKeyDown(e) {
    'use strict';

    switch (e.keyCode) {
        // rocketship movement controls
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
        // rocketship movement controls
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

        case 53: // 5
            showHitboxChanged = true;

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
    rocketship.add(camera3);

    camera = camera1;

    window.addEventListener("resize", onResize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
}

function render() {
    'use strict';
    renderer.render(scene, camera);
}

function checkCollision(object) {
    'use strict';

    return (rocketship.userData.hitRadius + object.userData.hitRadius) ** 2 >= 
            (rocketship.position.x - object.position.x) ** 2 + 
            (rocketship.position.y - object.position.y) ** 2 +
            (rocketship.position.z - object.position.z) ** 2;
}

function checkForCollisions(semiHemisphere) {
    'use strict';

    for (var i = 0; i < objects[semiHemisphere].length; i++) {
        if (checkCollision(objects[semiHemisphere][i])) {
            scene.remove(objects[semiHemisphere][i]);
            objects[semiHemisphere].splice(i, 1);
        }
    }
}

function drawHitbox(object) {
    'use strict';

    const radius = object.userData.hitRadius;

    const geometry = new THREE.SphereGeometry(radius);
    const material = new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true
    });
    const mesh = new THREE.Mesh(geometry, material);

    object.add(mesh);
    object.userData.hitbox = mesh;
}

function removeHitbox(object) {
    'use strict';

    object.remove(object.userData.hitbox);
}

function calculateMovement(angle, velocity) {
    'use strict';

    if (angle + velocity < 0) {
        return 2 * Math.PI + (angle + velocity);
    }
    return (angle + velocity) % (2 * Math.PI);
}

function update() {
    'use strict';

    // switch wireframe on and off 
    if (wireframe) {
        objects.forEach(function(element) {
            if (element instanceof THREE.Object3D) {
                element.children.forEach(function(mesh) {
                    if (mesh instanceof THREE.Camera) {
                        return;
                    }
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

    // rocketship movement
    if (longitude) {
        rocketship.userData.theta = calculateMovement(rocketship.userData.theta, velocity);
        rocketship.position.setFromSpherical(new THREE.Spherical(
            r * 1.2,
            rocketship.userData.phi,
            rocketship.userData.theta
        ));
        rocketship.lookAt(planet.position);
        // rocketship.rotation.z = - Math.PI / 2;
    }
    if (azimuth) {
        rocketship.userData.theta = calculateMovement(rocketship.userData.theta, - velocity);
        rocketship.position.setFromSpherical(new THREE.Spherical(
            r * 1.2,
            rocketship.userData.phi,
            rocketship.userData.theta
        ));
        rocketship.lookAt(planet.position);
        // rocketship.rotation.z = Math.PI / 2;
    }
    if (latitude) {
        rocketship.userData.phi = calculateMovement(rocketship.userData.phi, - velocity);
        rocketship.position.setFromSpherical(new THREE.Spherical(
            r * 1.2,
            rocketship.userData.phi,
            rocketship.userData.theta
        ));
        rocketship.lookAt(planet.position);
        // rocketship.rotation.z = 0;
    }
    if (zenith) {
        rocketship.userData.phi = calculateMovement(rocketship.userData.phi, velocity);
        rocketship.position.setFromSpherical(new THREE.Spherical(
            r * 1.2,
            rocketship.userData.phi,
            rocketship.userData.theta
        ));
        rocketship.lookAt(planet.position);
        // rocketship.rotation.z = Math.PI;
    }

    // hiding and showing object hitboxes
    if (showHitboxChanged) {
        showHitboxChanged = false;
        showHitbox = !showHitbox;

        if (showHitbox) {
            objects.forEach(function(element) {
                if (element instanceof THREE.Object3D) {
                    if (element != planet) {
                        drawHitbox(element);
                    }
                } else {
                    element.forEach(object => drawHitbox(object));
                }
            });
        } else {
            objects.forEach(function(element) {
                if (element instanceof THREE.Object3D) {
                    if (element != planet) {
                        removeHitbox(element);
                    }
                } else {
                    element.forEach(object => removeHitbox(object));
                }
            });
        }
    }

    // collisions logic
    const semiHemisphere = whichSemiHemisphere(rocketship.userData.phi, rocketship.userData.theta);
    checkForCollisions(semiHemisphere);

    // var delta = clock.getDelta();
    // var elapsed = clock.elapsedTime;

    // rocketship.position.x = planet.position.x + Math.sin(elapsed*2) * r *1.2;
    // rocketship.position.z = planet.position.z + Math.cos(elapsed*2) * r *1.2;
    // rocketship.rotation.x += delta;
    // rocketship.rotation.z += 0.2 * delta;
}

function animate() {
    'use strict';

    update();

    render();

    requestAnimationFrame(animate);
}