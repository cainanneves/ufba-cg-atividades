// Desenhando objetos gráficos 2D

import * as THREE from "three";

import { GUI } from "../../../resources/scripts/three.js/examples/jsm/libs/lil-gui.module.min.js";

const gui = new GUI();
const rendSize = new THREE.Vector2();

var controls,
  scene,
  camera,
  renderer,
  curObj = null,
  shaderMat,
  rad = Math.PI / 180,
  uniforms;

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function main() {
  renderer = new THREE.WebGLRenderer();

  renderer.setClearColor(new THREE.Color(0.0, 0.0, 0.0));

  rendSize.x = rendSize.y =
    Math.min(window.innerWidth, window.innerHeight) * 0.8;

  renderer.setSize(rendSize.x, rendSize.y);

  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize);

  scene = new THREE.Scene();

  camera = new THREE.OrthographicCamera(-1.0, 1.0, 1.0, -1.0, -1.0, 1.0);

  uniforms = {
    scale: { value: new THREE.Vector3(1.0, 1.0, 1.0) },
  };

  shaderMat = new THREE.ShaderMaterial({
    linewidth: 1.0,
    uniforms: uniforms,
    vertexShader: document.getElementById("minVertShader").textContent,
    fragmentShader: document.getElementById("minFragShader").textContent,
    vertexColors: true,
  });

  initGUI();

  geraFormas();

  requestAnimationFrame(anime);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //

function anime(time) {
  const v = Math.sin(time * 0.001) * 0.5 + 0.5;
  const c1 = new THREE.Vector3(0.8, 0.8, 0.0);
  const c2 = new THREE.Vector3(1.0, 1.0, 0.0);
  var pulse = c1.lerp(c2, v);

  uniforms["scale"].value = pulse;

  renderer.clear();
  renderer.render(scene, camera);

  requestAnimationFrame(anime);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //

function geraFormas() {
  geraCircle();
  geraHeart();
  geraAstroid();
  geraStar();
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //

function geraCircle() {
  const positions = [];
  const colors = [];

  let rcircle = 0.5;
  let circleJump = 1;
  let colorsNumber = 360 / circleJump;

  for (let i = 0; i < 360; i += circleJump) {
    let degree = i * rad;
    var y = rcircle * Math.sin(degree);
    var x = rcircle * Math.cos(degree);
    positions.push(x, y, 0);
  }

  // for (let i = 0; i < 360) {
  // 	indices.push
  // }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < colorsNumber / 3; j++) {
      let k = (j * 255) / (colorsNumber / 3);
      if (i === 0) colors.push((255 - k) / 255, 0, k / 255);
      if (i === 1) colors.push(0, k / 255, (255 - k) / 255);
      if (i === 2) colors.push(k / 255, (255 - k) / 255, 0);
    }
  }

  const circleGeometry = new THREE.BufferGeometry();

  circleGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  circleGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  var drawCircle = new THREE.LineLoop(circleGeometry, shaderMat);

  drawCircle.rotateZ((90 * Math.PI) / 180);
  drawCircle.name = "circle";
  drawCircle.visible = true;
  scene.add(drawCircle);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //

function geraHeart() {
  const positions = [];
  const colors = [];

  let rheart = 0.05;
  let heartJump = 0.1;
  let colorsNumber = 360 / heartJump;

  for (let i = 0; i < 360; i += heartJump) {
    let degree = i * rad;
    var x =
      rheart * (16 * (Math.sin(degree) * Math.sin(degree) * Math.sin(degree)));
    var y =
      rheart *
      (13 * Math.cos(degree) -
        5 * Math.cos(2 * degree) -
        2 * Math.cos(3 * degree) -
        Math.cos(4 * degree));
    positions.push(x, y, 0);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < colorsNumber / 3; j++) {
      let k = j * (255 / (colorsNumber / 3));
      if (i === 0) colors.push((255 - k) / 255, k / 255, 0);
      if (i === 1) colors.push(0, (255 - k) / 255, k / 255);
      if (i === 2) colors.push(k / 255, 0, (255 - k) / 255);
    }
  }

  const heartGeometry = new THREE.BufferGeometry();

  heartGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  heartGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  var drawHeart = new THREE.LineLoop(heartGeometry, shaderMat);

  drawHeart.name = "heart";
  drawHeart.visible = false;
  scene.add(drawHeart);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //

function geraAstroid() {
  const positions = [];
  const colors = [];

  let rastroid = 0.8;
  let astroidJump = 1;
  let colorsNumber = 360 / astroidJump;

  for (let i = 0; i < 360; i += astroidJump) {
    let degree = i * rad;
    var x = rastroid * (Math.cos(degree) * Math.cos(degree) * Math.cos(degree));
    var y = rastroid * (Math.sin(degree) * Math.sin(degree) * Math.sin(degree));
    positions.push(x, y, 0);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < colorsNumber / 3; j++) {
      let k = j * (255 / (colorsNumber / 3));
      if (i === 0) colors.push((255 - k) / 255, k / 255, 0);
      if (i === 1) colors.push(0, (255 - k) / 255, k / 255);
      if (i === 2) colors.push(k / 255, 0, (255 - k) / 255);
    }
  }

  const astroidGeometry = new THREE.BufferGeometry();

  astroidGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );
  astroidGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );

  var drawAstroid = new THREE.LineLoop(astroidGeometry, shaderMat);

  drawAstroid.rotateZ((90 * Math.PI) / 180);
  drawAstroid.name = "astroid";
  drawAstroid.visible = false;
  scene.add(drawAstroid);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //

function geraStar() {
  const starVert = [];
  const starCircleVert = [];
  const colorStar = [];
  const colorStarCircle = [];

  let rstar = 0.8;
  let starJump = 1;
  let colorStarCircleNumber = 360 / starJump;

  for (let i = 0; i < 360; i += starJump) {
    let degree = i * rad;
    var y = rstar * Math.sin(degree);
    var x = rstar * Math.cos(degree);
    starCircleVert.push(x, y, 0);
  }

  for (let i = 0; i < 720; i += 144) {
    let degree = i * rad;
    var x = rstar * Math.cos(degree);
    var y = rstar * Math.sin(degree);
    starVert.push(x, y, 0);
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < colorStarCircleNumber / 3; j++) {
      let k = (j * 255) / (colorStarCircleNumber / 3);
      if (i === 0) colorStarCircle.push((255 - k) / 255, 0, k / 255);
      if (i === 1) colorStarCircle.push(0, k / 255, (255 - k) / 255);
      if (i === 2) colorStarCircle.push(k / 255, (255 - k) / 255, 0);
    }
  }

  for (let i = 0; i < 5; i++) {
    let k = i * 144;
    k = k % 360;
    k = k * (255 / 360);
    if ((i * 144) % 360 < 120) colorStar.push((255 - k) / 255, 0, k / 255);
    else if ((i * 144) % 360 < 240) colorStar.push(0, k / 255, (255 - k) / 255);
    else if ((i * 144) % 360 < 360) colorStar.push(k / 255, (255 - k) / 255, 0);
  }
  const starGeometry = new THREE.BufferGeometry();
  const starCircleGeometry = new THREE.BufferGeometry();

  starGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starVert, 3)
  );
  starGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colorStar, 3)
  );
  starCircleGeometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(starCircleVert, 3)
  );
  starCircleGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colorStarCircle, 3)
  );

  var drawStarCircle = new THREE.LineLoop(starCircleGeometry, shaderMat);
  var drawStar = new THREE.LineLoop(starGeometry, shaderMat);

  drawStar.name = "star";
  drawStar.visible = false;
  drawStarCircle.name = "starcircle";
  drawStarCircle.visible = false;
  scene.add(drawStarCircle);
  scene.add(drawStar);
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //

function initGUI() {
  var controls = {
    Formas: "Circulo",
  };

  gui
    .add(controls, "Formas", ["Circulo", "Coração", "Astroid", "Estrela"])
    .onChange(changeForm);
  gui.open();
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //

function changeForm(val) {
  switch (val) {
    case "Circulo":
      curObj = scene.getObjectByName("circle");
      curObj.visible = true;
      scene.getObjectByName("heart").visible = false;
      scene.getObjectByName("astroid").visible = false;
      scene.getObjectByName("star").visible = false;
      scene.getObjectByName("starcircle").visible = false;
      break;
    case "Coração":
      curObj = scene.getObjectByName("heart");
      curObj.visible = true;
      scene.getObjectByName("circle").visible = false;
      scene.getObjectByName("astroid").visible = false;
      scene.getObjectByName("star").visible = false;
      scene.getObjectByName("starcircle").visible = false;
      break;
    case "Astroid":
      scene.getObjectByName("astroid").visible = true;
      scene.getObjectByName("circle").visible = false;
      scene.getObjectByName("heart").visible = false;
      scene.getObjectByName("star").visible = false;
      scene.getObjectByName("starcircle").visible = false;
      break;
    case "Estrela":
      scene.getObjectByName("star").visible = true;
      scene.getObjectByName("starcircle").visible = true;
      scene.getObjectByName("circle").visible = false;
      scene.getObjectByName("heart").visible = false;
      scene.getObjectByName("astroid").visible = false;
      break;
  }
}

// ******************************************************************** //
// **                                                                ** //
// ******************************************************************** //
function onWindowResize() {
  let minDim = Math.min(window.innerWidth, window.innerHeight);

  renderer.setSize(minDim * 0.8, minDim * 0.8);

  renderer.clear();
  renderer.render(scene, camera);
}

// ******************************************************************** //
// ******************************************************************** //
// ******************************************************************** //
main();
