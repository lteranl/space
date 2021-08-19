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
}

function createSun(scene) {
    const sun = BABYLON.MeshBuilder.CreateSphere(
        "sun",
        {
            segments: 16,
            diameter: 4,
        },
        scene
    );
}

function createScene() {
    //create a scene
    const scene = new BABYLON.Scene(engine);

    //create a camera
    createCamera();

    //create a light
    createLight();

    //create a sun
    createSun();

    // const light = new BABYLON.DirectionalLight(
    //     "light",
    //     new BABYLON.Vector3(5, -1, 0),
    //     scene
    // );

    // //create box
    // const box = BABYLON.MeshBuilder.CreateBox(
    //     "box",
    //     {
    //         size: 1,
    //     },
    //     scene
    // );
    // box.rotation.x = 2;
    // box.rotation.y = 3;

    // camera.lockedTarget = box;

    // //create a sphere
    // const sphere = BABYLON.MeshBuilder.CreateSphere(
    //     "sphere",
    //     {
    //         segments: 32,
    //         diameter: 2,
    //     },
    //     scene
    // );
    // sphere.position = new BABYLON.Vector3(3, 0, 0);
    // sphere.scaling = new BABYLON.Vector3(0.5, 0.5, 0.5);

    // //create a plane
    // const plane = BABYLON.MeshBuilder.CreatePlane("plane", {}, scene);
    // plane.position = new BABYLON.Vector3(-3, 0, 0);

    // //create a line
    // const points = [
    //     new BABYLON.Vector3(2, 0, 0),
    //     new BABYLON.Vector3(2, 1, 1),
    //     new BABYLON.Vector3(2, 1, 0),
    // ];

    // const lines = BABYLON.MeshBuilder.CreateLines("lines", { points }, scene);

    // //create a material
    // const material = new BABYLON.StandardMaterial("material", scene);
    // material.diffuseColor = new BABYLON.Color3(1, 0, 0);
    // material.emissiveColor = new BABYLON.Color3(0, 1, 0);

    // box.material = material;

    // const material2 = new BABYLON.StandardMaterial("material2", scene);
    // material2.diffuseTexture = new BABYLON.Texture(
    //     "assets/images/dark_rock.png",
    //     scene
    // );
    // sphere.material = material2;

    return scene;
}

//create our scene
const scene = createScene();

engine.runRenderLoop(() => {
    scene.render();
});
