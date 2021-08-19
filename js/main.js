/// <reference path='./vendor/babylon.d.ts' />

//getting canvas
const canvas = document.getElementById("renderCanvas");

//create a babylonJS engine
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
    //create a scene
    const scene = new BABYLON.Scene(engine);
    //create a camera
    const camera = new BABYLON.FreeCamera(
        "camera",
        new BABYLON.Vector3(0, 0, -5),
        scene
    );
    camera.attachControl(canvas, true);
    //create a light
    const light = new BABYLON.HemisphericLight(
        "light",
        new BABYLON.Vector3(0, 1, 0),
        scene
    );
    //create box
    const box = BABYLON.MeshBuilder.CreateBox(
        "box",
        {
            size: 1,
        },
        scene
    );
    box.rotation.x = 2;
    box.rotation.y = 3;
    //create a sphere
    const sphere = BABYLON.MeshBuilder.CreateSphere(
        "sphere",
        {
            segments: 32,
            diameter: 2,
        },
        scene
    );
    sphere.position = new BABYLON.Vector3(3, 0, 0);
    sphere.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

    //create a plane
    const plane = BABYLON.MeshBuilder.CreatePlane("plane", {}, scene);
    plane.position = new BABYLON.Vector3(-3, 0, 0);

    //create a line
    const points = [
        new BABYLON.Vector3(2, 0, 0),
        new BABYLON.Vector3(2, 1, 1),
        new BABYLON.Vector3(2, 1, 0),
    ];

    const lines = BABYLON.MeshBuilder.CreateLines("lines", { points }, scene);

    return scene;
}

//create our scene
const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
