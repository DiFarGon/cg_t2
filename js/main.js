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

const keyLime =0xedf67d, orchidCrayola = 0xf896d8,
      heliotrope = 0xca7df9, majorelleBlue = 0x724cf9, darkSlateBlue = 0x564592;

const colors = [keyLime, orchidCrayola, heliotrope, majorelleBlue, darkSlateBlue];

function randomValue(min, max) {
    'use strict';

    return Math.random() * (max - min) + min;
}

function whichSemiHemisphere(object) {
    'use strict';

    if (object != rocketship) {
        console.log(object.position.x);
        console.log(object.position.y);
    }
    if (object.position.y > 0) {
        if (object.position.x > 0) {
            return 0;
        }
        return 1;
    }
    if (object.position.x > 0) {
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
        phi: randomValue(angleMin, angleMax),
        theta: randomValue(angleMin, angleMax),
        hitRadius: h / 2
    };

    var spherical = new THREE.Spherical(r * 1.2, rocketship.userData.phi, rocketship.userData.theta);
   
    addRocketshipTop(rocketship, heliotrope, 0, (9 * h / 10) / 2, 0);
    addRocketshipLeg(rocketship, heliotrope, - (h / 6), - h / 3, 0);
    addRocketshipLeg(rocketship, heliotrope, (h / 6), - h / 3, 0);
    addRocketshipLeg(rocketship, heliotrope, 0, - h / 3, (h / 6));
    addRocketshipLeg(rocketship, heliotrope, 0, - h / 3, - (h / 6));
    addRocketshipBody(rocketship, orchidCrayola, 0, 0, 0);
    
    rocketship.position.setFromSpherical(spherical);

    scene.add(rocketship);
    rocketship.up.set(0, 1, 0);
    rocketship.lookAt(0, 0, 0);

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

    var c = randomValue(cMax, cMin) / 2;
    tetrahedron.userData = {hitRadius: c};

    tetrahedron.userData.phi = randomValue(angleMin, angleMax);
    tetrahedron.userData.theta = randomValue(angleMin, angleMax);
    
    var spherical = new THREE.Spherical(r * 1.2, tetrahedron.userData.phi, tetrahedron.userData.theta);
    
    const geometry = new THREE.TetrahedronGeometry(c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);

    tetrahedron.add(mesh);
    tetrahedron.position.setFromSpherical(spherical);

    scene.add(tetrahedron);

    const semiHemisphere = whichSemiHemisphere(tetrahedron);
    objects[semiHemisphere].push(tetrahedron);
}

function createOctahedron(color) {
    'use strict';

    var octahedron = new THREE.Object3D();

    var c = randomValue(cMax, cMin) / 2;
    octahedron.userData = {hitRadius: c};

    octahedron.userData.phi = randomValue(angleMin, angleMax);
    octahedron.userData.theta = randomValue(angleMin, angleMax);
    
    var spherical = new THREE.Spherical(r * 1.2, octahedron.userData.phi, octahedron.userData.theta);
    
    const geometry = new THREE.OctahedronGeometry(c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh =  new THREE.Mesh(geometry, material);

    octahedron.add(mesh);
    octahedron.position.setFromSpherical(spherical);
    
    scene.add(octahedron);

    const semiHemisphere = whichSemiHemisphere(octahedron);
    objects[semiHemisphere].push(octahedron);
}

function createCone(color) {
    'use strict';

    var cone = new THREE.Object3D();

    var c = randomValue(cMax, cMin) / 2;
    cone.userData = {hitRadius: c};

    cone.userData.phi = randomValue(angleMin, angleMax);
    cone.userData.theta = randomValue(angleMin, angleMax);
    
    var spherical = new THREE.Spherical(r * 1.2, cone.userData.phi, cone.userData.theta);
    
    const geometry = new THREE.ConeGeometry(c, c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    cone.add(mesh);
    cone.position.setFromSpherical(spherical);
    
    scene.add(cone);
    
    const semiHemisphere = whichSemiHemisphere(cone);
    objects[semiHemisphere].push(cone);
}

function createIcosahedron(color) {
    'use strict';

    var icosahedron = new THREE.Object3D();

    var c = randomValue(cMax, cMin) / 2;
    icosahedron.userData = {hitRadius: c};

    icosahedron.userData.phi = randomValue(angleMin, angleMax);
    icosahedron.userData.theta = randomValue(angleMin, angleMax);
    
    var spherical = new THREE.Spherical(r * 1.2, icosahedron.userData.phi, icosahedron.userData.theta);
    
    const geometry = new THREE.IcosahedronGeometry(c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    icosahedron.add(mesh);
    icosahedron.position.setFromSpherical(spherical);
    
    scene.add(icosahedron);
    
    const semiHemisphere = whichSemiHemisphere(icosahedron);
    objects[semiHemisphere].push(icosahedron);
}

function createBox(color) {
    'use strict';

    var box = new THREE.Object3D();

    var c = randomValue(cMax, cMin) / 2;
    box.userData = {hitRadius: c};

    box.userData.phi = randomValue(angleMin, angleMax);
    box.userData.theta = randomValue(angleMin, angleMax);

    var spherical = new THREE.Spherical(r * 1.2, box.userData.phi, box.userData.theta);
    
    const geometry = new THREE.BoxGeometry(c, c, c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });

    const mesh = new THREE.Mesh(geometry, material);

    box.add(mesh);
    box.position.setFromSpherical(spherical);

    scene.add(box);
    
    const semiHemisphere = whichSemiHemisphere(box);
    objects[semiHemisphere].push(box);
}

function createDodecahedron(color) {
    'use strict';

    var dodecahedron = new THREE.Object3D();

    var c = randomValue(cMax, cMin);
    dodecahedron.userData = {hitRadius: c};

    dodecahedron.userData.phi = randomValue(angleMin, angleMax);
    dodecahedron.userData.theta = randomValue(angleMin, angleMax);
    
    var spherical = new THREE.Spherical(r * 1.2, dodecahedron.userData.phi, dodecahedron.userData.theta);
    
    const geometry = new THREE.DodecahedronGeometry(c);
    const material = new THREE.MeshBasicMaterial({
        color: color,
        wireframe: false
    });
    const mesh = new THREE.Mesh(geometry, material);

    dodecahedron.add(mesh);
    dodecahedron.position.setFromSpherical(spherical);

    scene.add(dodecahedron);

    const semiHemisphere = whichSemiHemisphere(dodecahedron);
    objects[semiHemisphere].push(dodecahedron);
}

function createScene() {
    'use strict';

    scene = new THREE.Scene();

    createPlanet(darkSlateBlue);
    createRocketship();

    var randomColor;

    for (let i = 0; i < 5; i++) {
        randomColor = colors[Math.floor(randomValue(0, colors.length - 1))];
        createCone(randomColor);
    }

    for (let i = 0; i < 3; i++) {
        randomColor = colors[Math.floor(randomValue(0, colors.length - 1))];
        createTetrahedron(randomColor);
    }

    for (let i = 0; i < 3; i++) {
        randomColor = colors[Math.floor(randomValue(0, colors.length - 1))];
        createOctahedron(randomColor);
    }

    for (let i = 0; i < 4; i++) {
        randomColor = colors[Math.floor(randomValue(0, colors.length - 1))];
        createBox(randomColor);
    }

    for (let i = 0; i < 2; i++) {
        randomColor = colors[Math.floor(randomValue(0, colors.length - 1))];
        createDodecahedron(randomColor);
    }

    for (let i = 0; i < 3; i++) {
        randomColor = colors[Math.floor(randomValue(0, colors.length - 1))];
        createIcosahedron(randomColor);
    }
}

function createCameras() {
    'use strict';
    
    camera1 = new THREE.OrthographicCamera(-200, 200, 200, -200, 1, 1000);
    camera1.position.set(-300, 0, 0);
    camera1.lookAt(scene.position);

    camera2 = new THREE.PerspectiveCamera(50, innerWidth / innerHeight, 1, 1000);
    camera2.position.set(-300, 0, 0);
    camera2.lookAt(scene.position);

    camera3 = new THREE.PerspectiveCamera(90, innerWidth / innerHeight, 1, 1000);
    camera3.position.set(10, -20, 0);
    camera3.lookAt(0, 0, 0);
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
        rocketship.lookAt(0, 0, 0);
    }
    if (azimuth) {
        rocketship.userData.theta = calculateMovement(rocketship.userData.theta, - velocity);
        rocketship.position.setFromSpherical(new THREE.Spherical(
            r * 1.2,
            rocketship.userData.phi,
            rocketship.userData.theta
        ));
        rocketship.lookAt(0, 0, 0);
    }
    if (latitude) {
        rocketship.userData.phi = calculateMovement(rocketship.userData.phi, - velocity);
        rocketship.position.setFromSpherical(new THREE.Spherical(
            r * 1.2,
            rocketship.userData.phi,
            rocketship.userData.theta
        ));
        if (Math.sin(rocketship.userData.phi) < 0) {
            rocketship.up.set(0, -1, 0);
        } else {
            rocketship.up.set(0, 1, 0);
        }
        rocketship.lookAt(0, 0, 0);
    }
    if (zenith) {
        rocketship.userData.phi = calculateMovement(rocketship.userData.phi, velocity);
        rocketship.position.setFromSpherical(new THREE.Spherical(
            r * 1.2,
            rocketship.userData.phi,
            rocketship.userData.theta
        ));
        if (Math.sin(rocketship.userData.phi) < 0) {
            rocketship.up.set(0, -1, 0);
        } else {
            rocketship.up.set(0, 1, 0);
        }
        rocketship.lookAt(0, 0, 0);
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
    const semiHemisphere = whichSemiHemisphere(rocketship);
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