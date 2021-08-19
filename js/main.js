/// <reference path='./vendor/babylon.d.ts' />

//getting canvas
const canvas = document.getElementById("renderCanvas");

//create a babylonJS engine
const engine = new BABYLON.Engine(canvas, true);

function createCamera(scene) {
    const camera = new BABYLON.ArcRotateCamera(
        "camera",
        0,
        0,
        15,
        BABYLON.Vector3.Zero(),
        scene
    );
    //let user move camera
    camera.attachControl(canvas);

    //limit camera limit
    camera.lowerRadiusLimit = 6;
    camera.upperRadiusLimit = 20;
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
    planetMaterial.diffuseTexture = new BABYLON.Texture(
        "assets/images/sand.png",
        scene
    );
    planetMaterial.specularColor = BABYLON.Color3.Black();
    const planet = BABYLON.MeshBuilder.CreateSphere(
        "planet",
        { segments: 16, diameter: 1 },
        scene
    );
    planet.position.x = 4;
    planet.material = planetMaterial;
}

function createScene() {
    //create a scene
    const scene = new BABYLON.Scene(engine);
    scene.clearColor = BABYLON.Color3.Black();

    //create a camera
    createCamera();

    //create a light
    createLight();

    //create a sun
    createSun();

    //create first planet
    createPlanet();

    return scene;
}

//create our scene
const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
