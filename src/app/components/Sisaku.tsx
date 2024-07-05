"use client"; // クライアントサイドで実行することを示す

import { useEffect, useRef } from 'react'; // ReactのuseEffectとuseRefフックをインポート
import * as THREE from 'three';  // Three.jsライブラリをインポート

export default function Animation() { // Animationコンポーネントを定義
  const mountRef = useRef(null); // DOM要素を参照するためのrefを作成

  useEffect(() => { // コンポーネントがマウントされたときに実行される副作用を定義
    const scene = new THREE.Scene(); // Three.jsのシーンを作成
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // カメラを作成
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // レンダラーを作成
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズを設定
    renderer.setClearColor(0xffffff, 1); // 背景色を白に設定
    renderer.shadowMap.enabled = true; // 影を有効にする

    if (mountRef.current) {
      (mountRef.current as HTMLElement).appendChild(renderer.domElement); // レンダラーのDOM要素をrefに追加
    }

    // ウィンドウのリサイズに対応
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    const light = new THREE.DirectionalLight(0xffffff, 2); // 指向性ライトを作成し、光の強さを2に設定
    light.position.set(5, 5, 5); // ライトの位置を設定
    light.castShadow = true; // ライトの影を有効にする
    scene.add(light); // シーンにライトを追加

    const ambientLight = new THREE.AmbientLight(0x404040); // 環境光を作成
    scene.add(ambientLight); // シーンに環境光を追加

    camera.position.z = 10; // カメラの位置を設定

    // 球体のジオメトリとマテリアルを作成
    const geometry = new THREE.SphereGeometry(1, 32, 32); // 半径1の球体ジオメトリを作成
    const material = new THREE.MeshBasicMaterial({ color: 0x007700 }); // 青色のマテリアルを作成
    const sphere = new THREE.Mesh(geometry, material); // ジオメトリとマテリアルからメッシュを作成
    scene.add(sphere); // シーンに球体を追加

    const animate = function () { // アニメーション関数を定義
      requestAnimationFrame(animate); // 次のフレームで再度アニメーション関数を呼び出す

      sphere.position.x -= 0.3; // 球体を左に移動させる

      // 球体が画面外に出たら再び右から出るようにする
      if (sphere.position.x < -window.innerWidth / -0 / 90) {
        sphere.position.x = window.innerWidth / 0 / 90;
      }

      renderer.render(scene, camera); // シーンとカメラをレンダリング
    };

    animate(); // アニメーションを開始

    return () => { // クリーンアップ関数を定義
      if (mountRef.current) {
        (mountRef.current as HTMLElement).removeChild(renderer.domElement); // レンダラーのDOM要素をrefから削除
      }
    };
  }, []); // 空の依存配列を渡して、コンポーネントのマウントとアンマウント時にのみ実行

  return (
    <div ref={mountRef} style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}> {/* コ��ポーネントのルート要素 */}
      <div style={{ position: 'absolute', top: 30, left: 25, color: 'black', fontFamily: 'Helvetica', fontWeight: 'bold', backgroundColor: 'transparent' }}>
      بروت
      </div>
    </div>
  );
}
