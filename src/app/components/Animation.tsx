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

    // 小さな正五角形を作成し、サッカーボールの展開図を作成
    const createPentagon = (radius: number, color: number) => {
      const geometry = new THREE.BufferGeometry();
      const vertices = [];
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2; // 底辺を水平にするために角度を調整
        vertices.push(radius * Math.cos(angle), radius * Math.sin(angle), 0);
      }
      vertices.push(vertices[0], vertices[1], vertices[2]); // 最後の頂点を最初の頂点に戻す

      geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geometry.setIndex([0, 1, 2, 0, 2, 3, 0, 3, 4]);

      const material = new THREE.MeshBasicMaterial({ color: color }); // 指定された色のマテリアルを作成
      return new THREE.Mesh(geometry, material); // ジオメトリとマテリアルからメッシュを作成
    };

    const radius = 1; // 五角形の半径を小さく設定
    const colors = [0x000000, 0xffffff]; // 黒と白の色を交互に使用
    const positions = [
      [0, 0, 0],
      [2, 0, 0],
      [1, Math.sqrt(3), 0],
      [-1, Math.sqrt(3), 0],
      [-2, 0, 0],
      [-1, -Math.sqrt(3), 0],
      [1, -Math.sqrt(3), 0]
    ]; // サッカーボールの展開図の頂点位置

    positions.forEach((pos, index) => {
      const pentagon = createPentagon(radius, colors[index % 2]);
      pentagon.position.set(pos[0], pos[1], pos[2]);
      scene.add(pentagon);
    });

    const animate = function () { // アニメーション関数を定義
      requestAnimationFrame(animate); // 次のフレームで再度アニメーション関数を呼び出す

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
    <div ref={mountRef} style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, overflow: 'hidden' }}> {/* コンポーネントのルート要素 */}
      <div style={{ position: 'absolute', top: 15, left: 25, color: 'white', fontFamily: 'Helvetica', fontWeight: 'bold', backgroundColor: 'transparent' }}>
        {/* スタイルを適用したdiv要素 */}
        DUBAI {/* 表示するテキスト */}
      </div>
    </div>
  );
}
