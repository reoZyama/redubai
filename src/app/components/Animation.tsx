"use client"; // この行を追加します


import { useEffect } from 'react';
import * as THREE from 'three';  

export default function Animation() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // 背景色を白に設定
    renderer.shadowMap.enabled = true; // 影を有効にする
    document.body.appendChild(renderer.domElement);

    const light = new THREE.DirectionalLight(0xffffff, 2); // 光の強さを2に設定
    light.position.set(5, 5, 5);
    light.castShadow = true; // ライトの影を有効にする
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040); // 環境光
    scene.add(ambientLight);

    camera.position.z = 10;

    const animate = function () {
      requestAnimationFrame(animate);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <div style={{ position: 'absolute', top: 0, left: 0, color: 'black', fontFamily: 'Source Han Serif', fontWeight: 'bold' }}>
        dubai
      </div>
    </div>
  );
}
