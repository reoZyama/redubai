"use client"; // クライアントサイドで実行することを示す

import { useEffect, useRef } from 'react'; // ReactのuseEffectとuseRefフックをインポート
import * as THREE from 'three';  // Three.jsライブラリをインポート
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

// 型宣言をインポート
import 'three/examples/jsm/lines/LineMaterial';

export default function Animation() { // Animationコンポーネントを定義
  const mountRef = useRef(null); // DOM要素を参照するためのrefを作成

  useEffect(() => { // コンポーネントがマウントされたときに実行される副作用を定義
    const scene = new THREE.Scene(); // Three.jsのシーンを作成
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // カメラを作成
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // レンダラーを作成
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズを設定
    renderer.setClearColor(0xffffff, 1); // 背景色を白に設定

    if (mountRef.current) {
      (mountRef.current as HTMLElement).appendChild(renderer.domElement); // レンダラーのDOM要素をrefに追加
    }

    // ウィンドウのリサイズに対応
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    camera.position.z = 10; // カメラの位置を設定

    // 楕円のジオメトリとマテリアルを作成
    const ellipseGeometry = new THREE.EllipseCurve(
      0, 0,            // 中心の位置
      7, 2,            // x半径とy半径
      0, 2 * Math.PI,  // 開始角度と終了角度
      false,           // 時計回りかどうか
      0                // 回転角度
    );
    const ellipsePoints = ellipseGeometry.getPoints(50);
    const ellipsePositions = new Float32Array(ellipsePoints.length * 3);
    for (let i = 0; i < ellipsePoints.length; i++) {
      ellipsePositions[i * 3] = ellipsePoints[i].x;
      ellipsePositions[i * 3 + 1] = ellipsePoints[i].y;
      ellipsePositions[i * 3 + 2] = 0;
    }
    const ellipseLineGeometry = new LineGeometry();
    ellipseLineGeometry.setPositions(ellipsePositions);
    const ellipseLineMaterial = new LineMaterial({
      color: 0x000000,
      linewidth: 40, // 線の太さを大きく調整
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight) // 解像度を設定
    });
    const ellipse = new Line2(ellipseLineGeometry, ellipseLineMaterial);
    scene.add(ellipse); // シーンに楕円を追加

    // 楕円の中心を結ぶ交差する直径の二つの線を作成
    const diameterPositions = new Float32Array([
      -7, 0, 0, 7, 0, 0, // 水平線
      0, -2, 0, 0, 2, 0  // 垂直線
    ]);
    const diameterLineGeometry = new LineGeometry();
    diameterLineGeometry.setPositions(diameterPositions);
    const diameterLineMaterial = new LineMaterial({
      color: 0x000000, // 黒色
      linewidth: 40, // 線の太さを楕円と揃える
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight) // 解像度を設定
    });
    const diameterLines = new Line2(diameterLineGeometry, diameterLineMaterial);
    scene.add(diameterLines); // シーンに直径の線を追加

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
      <div style={{ position: 'absolute', top: 15, left: 25, color: 'black', fontFamily: 'Helvetica', fontWeight: 'bold', backgroundColor: 'transparent' }}>
        Prot
      </div>
    </div>
    
  );
}
