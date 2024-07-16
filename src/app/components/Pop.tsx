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

  const geometry = new THREE.SphereGeometry(1, 32, 32); // 球のジオメトリを作成
  const material = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // 球のマテリアルを作成
  const sphere = new THREE.Mesh(geometry, material); // ジオメトリとマテリアルから球を作成
  scene.add(sphere); // シーンに球を追加

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();

  const onWindowResize = (
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
  ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  return null;
}