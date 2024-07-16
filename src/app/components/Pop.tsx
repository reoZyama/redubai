`use client`;
import { useEffect } from 'react';
import * as THREE from 'three';

export default function Pop() {
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    document.body.appendChild(renderer.domElement);

    const sphereGeometry = new THREE.SphereGeometry(1, 60, 60);
    const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    scene.add(sphere);

    const animate = () => {
      requestAnimationFrame(animate);
      sphere.rotation.x += 0.01;
      sphere.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      document.body.removeChild(renderer.domElement);
    };
  }, []);

  return null;
}
