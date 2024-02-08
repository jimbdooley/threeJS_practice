



const scene = new THREE.Scene();
var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
var ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
directionalLight.position.set(5, 5, 5); 
scene.add(ambientLight);
scene.add(directionalLight)

const cubeLoader = new THREE.CubeTextureLoader();
//cubeLoader.setPath( 'textures/cube/Bridge2/' );

scene.background = cubeLoader.load([
  'threeAssets/skyrender0001.jpg', 'threeAssets/skyrender0003.jpg',
  'threeAssets/skyrender0005.jpg', 'threeAssets/skyrender0006.jpg',
  'threeAssets/skyrender0004.jpg', 'threeAssets/skyrender0002.jpg'
]);

const container = document.getElementById('threejs-container');
container.height = 700
container.width = 700
const camera = new THREE.PerspectiveCamera( 75, container.width / container.height, 0.1, 2000 );
//camera.position = {x: 40.90538119177537, y: -11.199999999999998, z: -56.17984988529549}
//camera.rotation.y = 33

const renderer = new THREE.WebGLRenderer();
renderer.setSize( container.width, container.height );
container.appendChild( renderer.domElement );

var texture2 = textureLoader.load('threeAssets/x_red.png');

const THREE_TEXTURES = {}
for (const key in WAREHOUSE.objNameToPng) {
    const pngURL = WAREHOUSE.objNameToPng[key]
    if (pngURL in THREE_TEXTURES) continue
    THREE_TEXTURES[pngURL] = new THREE.MeshStandardMaterial({ 
        map: textureLoader.load(pngURL),
        metalness: 1,
        metalnessMap:  textureLoader.load(pngURL.replace("_color", "_met"))
    })
}

var glassMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,         // Color of the material
    transparent: true,       // Enable transparency
    opacity: 0.2,            // Set the opacity (0 to 1, where 0 is fully transparent and 1 is fully opaque)
    metalness: 0.2,          // Metalness of the material (0 to 1, where 0 is non-metallic and 1 is fully metallic)
    roughness: 0.1,          // Roughness of the material (0 to 1, where 0 is completely smooth and 1 is completely rough)
    side: THREE.DoubleSide   // Render material on both sides of faces
});

let silo = null;
console.log("loading")
objLoader.load(
    'threeAssets/warehouse.obj',
    function (object) {
        // Create a material with the texture
        console.log("creating")
        const material2 = new THREE.MeshBasicMaterial({ map: texture2 });

        // Apply the material to each mesh in the object
        object.traverse(function (child) {
            if (child instanceof THREE.Mesh) {
                if (child.name in WAREHOUSE.objNameToPng
                    && WAREHOUSE.objNameToPng[child.name] in THREE_TEXTURES) {
                    child.material = THREE_TEXTURES[WAREHOUSE.objNameToPng[child.name]]
                } else {
                    child.material = glassMaterial
                }
            }
        });

        silo = object
        silo.position.x = -165
        silo.position.z = 20
        silo.position.y = -30
        console.log('adding')
        scene.add(object);
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.log('An error happened');
    }
);


function animate() {
	requestAnimationFrame( animate );

    if (silo != null) {
        silo.rotation.x += 0//0.01;
        silo.rotation.y += 0//0.01;
    }

	renderer.render( scene, camera );
}

animate();

camSpeed = 0.7
moveDistance = 1
window.addEventListener("keydown", (e) => {
    const direction = new THREE.Vector3(
        Math.sin(camera.rotation.y),
        0,
        Math.cos(camera.rotation.y)
    );

    switch (e.key) {
        case "ArrowUp":
            camera.position.add(direction.multiplyScalar(-moveDistance));
            break;
        case "ArrowDown":
            camera.position.add(direction.multiplyScalar(moveDistance));
            break;
        case "ArrowRight":
            // To move to the right, rotate 90 degrees clockwise
            camera.position.add(direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 2).multiplyScalar(moveDistance));
            break;
        case "ArrowLeft":
            // To move to the left, rotate 90 degrees counterclockwise
            camera.position.add(direction.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 2).multiplyScalar(moveDistance));
            break;
    }
    //if (e.key == "ArrowUp") {
    //    camera.position.z += camSpeed
    //}
    //if (e.key == "ArrowDown") {
    //    camera.position.z -= camSpeed
    //}
    //if (e.key == "ArrowRight") {
    //    camera.position.x += camSpeed
    //}
    //if (e.key == "ArrowLeft") {
    //    camera.position.x -= camSpeed
    //}
    if (e.key == "d") {
        camera.rotation.y -= 0.02
    }
    if (e.key == "a") {
        camera.rotation.y += 0.02
    }
    if (e.key == "w") {
        camera.rotation.x += 0.02
    }
    if (e.key == "s") {
        camera.rotation.x -= 0.02
    }

    if (e.key == "r") {
        camera.position.y += camSpeed
    }
    if (e.key == "f") {
        camera.position.y -= camSpeed
    }
})
