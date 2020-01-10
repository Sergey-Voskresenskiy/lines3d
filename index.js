import * as THREE from 'three'

let OrbitControls = require('three-orbit-controls')(THREE);

let canvas = document.querySelector('#canvas')

let width = window.innerWidth;
let height = window.innerHeight;

let dots = 50;
let lines = 50;
let radius = 100;

// renderer

let renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});

renderer.setPixelRatio(window.devicePixelRatio > 1 ? 2 : 1);
renderer.setSize(width, height)
renderer.setClearColor(0x333333);

// renderer END

// camera

let camera = new THREE.PerspectiveCamera(40, width / height, 1, 1000);
camera.position.set(0, 0, 300);

// camera END

//scene

let scene = new THREE.Scene();
let group = new THREE.Group();
scene.add(group);
let controls = new OrbitControls(camera, renderer.domElement);

//scene END

// line

let material = new THREE.LineBasicMaterial({
  color: 0x848484
});

// for (let i = 0; i < lines; i++) {
//   let geometry = new THREE.Geometry();
//   let line = new THREE.Line(geometry, material);

//   for (let j = 0; j < dots; j++) {

//     let coord = (j / dots) * radius * 2 - radius;

//     let vector = new THREE.Vector3(coord, 0)
//     geometry.vertices.push(vector);

//   }

//   line.rotation.x = Math.random() * Math.PI
//   line.rotation.y = Math.random() * Math.PI
//   line.rotation.z = Math.random() * Math.PI

//   group.add(line)
// }

// function UpdateLines(time) {
//   let line, vector, ratio
//   for (let i = 0; i < lines; i++) {
//     line = group.children[i];
//     for (let j = 0; j < dots; j++) {
//       vector = line.geometry.vertices[j];
//       ratio = 1 - (radius - Math.abs(vector.x))/radius;
//       vector.y = Math.sin(j/5 + time/100)* 20*ratio;
//     }
//     line.geometry.verticesNeedUpdate = true;
//   }
// }

// line END



let canvas2d = document.querySelector('#canvas2')
let ctx = canvas2d.getContext('2d')
let size = 200;

canvas2d.width = size;
canvas2d.height = size;

let img = document.querySelector('#img')

ctx.drawImage(img, 0, 0, size, size)

let data = ctx.getImageData(0, 0, size, size);
data = data.data;

for (let y = 0; y < size; y++) {

  let geometry = new THREE.Geometry();
  let line = new THREE.Line(geometry, material);

  for (let x = 0; x < size; x++) {
    let bright = data[((size * y) + x) * 4];
    let vector = new THREE.Vector3((x - 100)/2, (y - 100)/2, bright/2)
    geometry.vertices.push(vector);
  }
  line.rotation.z = 3.2
  group.add(line)

}

let time = 0;
function Render() {
  renderer.render(scene, camera);
  controls.autoRotate = true;
  controls.update();
  // UpdateLines(time);
  window.requestAnimationFrame(Render);
}

Render();