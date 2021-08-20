/// <reference path='./vendor/babylon.d.ts' />

//getting canvas
const canvas = document.getElementById("renderCanvas");

//create a babylonJS engine
const engine = new BABYLON.Engine(canvas, true);

function createCamera(scene) {
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        BABYLON.Vector3(0, 0, 0),
        scene
    );
    camera.setPosition(new BABYLON.Vector3(0, 0, 20));
    camera.radius = 70;
    //let user move camera
    camera.attachControl(canvas);

    //limit camera limit
    camera.lowerRadiusLimit = 8;
    camera.upperRadiusLimit = 60;
}

function createLight(scene) {
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    light.intensity = 0.5;
    light.groundColor = new BABYLON.Color3(0, 0, 1);
}

function createSun(scene) {
    const sunMaterial = new BABYLON.StandardMaterial("sunMaterial", scene);
    sunMaterial.emissiveTexture = new BABYLON.Texture(
        "assets/images/sun.jpg",
        scene
    );
    sunMaterial.diffuseColor = BABYLON.Color3.Black();
    sunMaterial.specularColor = BABYLON.Color3.Black();
    const sun = BABYLON.MeshBuilder.CreateSphere(
        "sun",
        {
            segments: 16,
            diameter: 4,
        },
        scene
    );
    //sun ling
    const sunLight = new BABYLON.PointLight(
        "sunLight",
        BABYLON.Vector3.Zero(),
        scene
    );
    sunLight.intensity = 2;
    sun.material = sunMaterial;
}

function createPlanet(scene) {
    const planetMaterial = new BABYLON.StandardMaterial(
        "planetMaterial",
        scene
    );
    //planet 'skin'
    planetMaterial.diffuseTexture = new BABYLON.Texture(
        "assets/images/sand.png",
        scene
    );
    //removing the reflection off planets
    planetMaterial.specularColor = BABYLON.Color3.Black();

    const speeds = [0.035, 0.03, 0.025, 0.02, 0.015, 0.013, 0.01, 0.009];
    for (let i = 0; i < 8; i++) {
        const planet = BABYLON.MeshBuilder.CreateSphere(
            `Planet${i}`,
            { segments: 16, diameter: `${i / 3}` },
            scene
        );
        //moving planet on the x line
        planet.position.x = 2 * i + 4;
        //assinging planet.material to planeMaterial variable
        planet.material = planetMaterial;

        planet.orbit = {
            radius: planet.position.x,
            speed: speeds[i],
            angle: 0,
        };

        scene.registerBeforeRender(() => {
            planet.position.x =
                planet.orbit.radius * Math.sin(planet.orbit.angle);
            planet.position.z =
                planet.orbit.radius * Math.cos(planet.orbit.angle);
            planet.orbit.angle += planet.orbit.speed;
        });
    }
}

function createSkybox(scene) {
    const skybox = BABYLON.MeshBuilder.CreateBox(
        "skybox",
        { size: 1000 },
        scene
    );
    const skyboxMaterial = new BABYLON.StandardMaterial(
        "skyboxMaterial",
        scene
    );
    skyboxMaterial.backFaceCulling = false;
    //remove reflection in skybox
    skyboxMaterial.specularColor = BABYLON.Color3.Black();
    skyboxMaterial.diffuseColor = BABYLON.Color3.Black();
    //texture the 6 sides of out box
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture(
        "assets/images/skybox/skybox",
        scene
    );
    skyboxMaterial.reflectionTexture.coordinatesMode =
        BABYLON.Texture.SKYBOX_MODE;
    //move the skybox with camera
    skybox.infiniteDistance = true;

    skybox.material = skyboxMaterial;
}

// function createShip(scene) {
//     BABYLON.SceneLoader.ImportMesh(
//         "",
//         "assets/models/",
//         "spaceCraft1.obj",
//         scene,
//         (meshes) => {
//             console.log(meshes);
//             meshes.forEach((mesh) => {
//                 mesh.position = new BABYLON.Vector3(0, -5, 10);
//                 mesh.scaling = new BABYLON.Vector3(0.2, 0.2, 0.2);
//             });
//         }
//     );
// }

function createScene() {
    //create a scene
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.Black();

    //create a camera
    createCamera();

    //create a light
    createLight(scene);

    //create a sun
    createSun(scene);

    //create first planet
    createPlanet(scene);

    //create skybox
    createSkybox(scene);

    //create ship
    // createShip(scene);

    return scene;
}

//create our scene
const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});

//the canvas/window resize event handle
window.addEventListener("resize", function () {
    engine.resize();
});
