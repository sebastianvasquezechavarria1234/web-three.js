import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFF9C4);

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 1, 5);

// Renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});

renderer.setSize(
  window.innerWidth,
  window.innerHeight
);

renderer.setPixelRatio(
  Math.min(window.devicePixelRatio, 2)
);

document.body.appendChild(
  renderer.domElement
);

// Controls
const controls = new OrbitControls(
  camera,
  renderer.domElement
);

controls.enableDamping = true;

// Lights

const ambientLight = new THREE.AmbientLight(
  0xffffff,
  2
);

scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(
  0xffffff,
  4
);

directionalLight.position.set(
  5,
  5,
  5
);

scene.add(directionalLight);

const directionalLight2 = new THREE.DirectionalLight(
  0xffffff,
  2
);

directionalLight2.position.set(
  -5,
  3,
  -5
);

scene.add(directionalLight2);

// Grid (opcional para referencia)

const gridHelper = new THREE.GridHelper(
  20,
  20
);

scene.add(gridHelper);

// Model

const loader = new GLTFLoader();

loader.load(
  './model.glb',

  (gltf) => {

    const model = gltf.scene;

    scene.add(model);

    model.position.set(
      0,
      0,
      0
    );

    model.scale.set(
      1,
      1,
      1
    );

    // Centrar modelo automáticamente

    const box = new THREE.Box3().setFromObject(model);

    const center = box.getCenter(
      new THREE.Vector3()
    );

    model.position.sub(center);

    // Ajustar cámara automáticamente

    const size = box.getSize(
      new THREE.Vector3()
    );

    const maxDimension = Math.max(
      size.x,
      size.y,
      size.z
    );

    camera.position.set(
      maxDimension,
      maxDimension * 0.7,
      maxDimension * 1.8
    );

    controls.target.set(
      0,
      0,
      0
    );

    controls.update();
  },

  (progress) => {

    console.log(
      `${(
        progress.loaded /
        progress.total
      ) * 100}% loaded`
    );
  },

  (error) => {

    console.error(
      'Error loading model:',
      error
    );
  }
);

// Resize

window.addEventListener(
  'resize',
  () => {

    camera.aspect =
      window.innerWidth /
      window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );
  }
);

// Animation

function animate() {

  requestAnimationFrame(
    animate
  );

  controls.update();

  renderer.render(
    scene,
    camera
  );
}

animate();