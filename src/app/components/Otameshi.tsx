"use client"

import { useEffect } from 'react';
import * as THREE from 'three';
import useCurrentWeather from '../hooks/useCurrentWeather';

export default function Otameshi() {
  const {data} = useCurrentWeather();
  // data.temp_c ==> 8.7

  /**
   * 赤 = 1 ~ 5
   * 青 = 6 ~ 10
   * 
   * data.temp_c を関数の引数に与え、色を取得する
   * 色を threejs のオブジェクトに当てる
   */

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff, 1); // 背景色を白に設定
    renderer.shadowMap.enabled = true; // 影を有効にする
    document.body.appendChild(renderer.domElement);

    // マリーゴールドのオブジェクトを作成
    const marigoldGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const marigoldMaterial = new THREE.MeshStandardMaterial({ color: 0xFFA500 }); // マリーゴールドの色
    const marigold = new THREE.Mesh(marigoldGeometry, marigoldMaterial);
    marigold.castShadow = true; // マリーゴールドに影をつける
    scene.add(marigold);

    // 茎の部分を作成
    const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 5, 32);
    const stemMaterial = new THREE.MeshStandardMaterial({ color: 0x008000 }); // 茎の色
    const stem = new THREE.Mesh(stemGeometry, stemMaterial);
    stem.position.y = -3; // 茎の位置を調整
    stem.castShadow = true; // 茎に影をつける
    scene.add(stem);

    const light = new THREE.DirectionalLight(0xffffff, 2); // 光の強さを2に設定
    light.position.set(5, 5, 5);
    light.castShadow = true; // ライトの影を有効にする
    scene.add(light);

    const ambientLight = new THREE.AmbientLight(0x404040); // 環境光
    scene.add(ambientLight);

    camera.position.z = 10;

    const animate = function () {
      requestAnimationFrame(animate);

      const time = Date.now() * 0.001;
      marigold.position.x = 5 * Math.cos(time);
      marigold.position.z = 5 * Math.sin(-time); // 反時計回りに変更
      stem.position.x = 5 * Math.cos(time);
      stem.position.z = 5 * Math.sin(-time); // 反時計回りに変更

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
        ドバイ
      </div>
    </div>
  );
}
