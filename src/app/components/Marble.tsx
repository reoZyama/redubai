'use client'; // クライアントサイドで実行することを示す

import { useEffect, useRef } from 'react'; // ReactのuseEffectとuseRefフックをインポート
import * as THREE from 'three'; // Three.jsライブラリをインポート

export default function Marble() {
  const mountRef = useRef(null); // DOM要素を参照するためのrefを作成

  useEffect(() => {
    // シーンの作成
    const scene = new THREE.Scene();

    // カメラの作成
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 10;

    // レンダラーの作成
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(Math.random() * 0xffffff, 1); // 背景色をランダムに設定

    if (mountRef.current) {
      (mountRef.current as HTMLElement).appendChild(renderer.domElement);
    }

    // ランダムな形を作成する関数
    const randomShape = () => {
      const shape = new THREE.Shape();
      for (let i = 0; i < 7; i++) { // 頂点の数を7つに変更
        shape.lineTo(Math.random() * 10 - 5, Math.random() * 10 - 5);
      }
      return shape;
    };

    // ジオメトリとマテリアルの作成
    const geometry = new THREE.ShapeGeometry(randomShape()); // ランダムな形を作成
    const material = new THREE.MeshBasicMaterial({ color: Math.random() * 0xffffff }); // ランダムな色のマテリアルを作成
    const amoeba = new THREE.Mesh(geometry, material); // ジオメトリとマテリアルからメッシュを作成
    scene.add(amoeba); // シーンにアメーバを追加

    // アニメーション関数
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // クリーンアップ関数
    return () => {
      if (mountRef.current) {
        (mountRef.current as HTMLElement).removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    />
  );
}
