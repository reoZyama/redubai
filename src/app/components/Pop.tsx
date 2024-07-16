`use client`;

import * as THREE from 'three';

export default function Pop() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const canvas = document.createElement('canvas');
  canvas.id = 'canvas';
  document.body.appendChild(canvas);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
    alpha: true // 背景を透明に設定
  });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0x000000, 0); // 背景色を透明に設定

  const geometry = new THREE.BufferGeometry().setFromPoints(new THREE.EllipseCurve(0, 0, 5, 5, 0, 2 * Math.PI).getPoints()); // 楕円ジオメトリを使用して楕円を作成
  const material = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const ellipse = new THREE.Mesh(geometry, material);
  scene.add(ellipse);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  return null;
}