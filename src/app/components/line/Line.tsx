'use client'; // クライアントサイドで実行することを示す

import { useEffect } from 'react';
import * as THREE from 'three';
import LineTitle from './LineTitle';

export default function Line() {
  useEffect(() => {
    // コンポーネントがマウントされたときに実行される副作用を定義
    const scene = new THREE.Scene(); // Three.jsのシーンを作成
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    ); // カメラを作成
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // レンダラーを作成
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズを設定
    renderer.setClearColor(0x000000, 0); // 背景色を透明に設定
    renderer.shadowMap.enabled = true; // 影を有効にする

    const lineDiv = document.getElementById('line');
    if (lineDiv) {
      lineDiv.appendChild(renderer.domElement); // レンダラーのDOM要素をline idのdivに追加
    }

    // 画面サイズ変更時にレンダラーとカメラのサイズを更新
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    const light = new THREE.DirectionalLight(0xffffff, 2); // 指向性ライトを作成
    light.position.set(5, 5, 5); // ライトの位置を設定
    light.castShadow = true; // ライトの影を有効にする
    scene.add(light); // シーンにライトを追加

    const ambientLight = new THREE.AmbientLight(0x404040); // 環境光を作成
    scene.add(ambientLight); // シーンに環境光を追加

    camera.position.z = 20; // カメラの位置を設定

    let turns = 5; // 螺旋の回転数を定義

    const objects: THREE.Line[] = []; // ドラッグ可能なオブジェクトの配列

    const createSpirals = () => {
      // 10本の螺旋を作成
      const numSpirals = 10; // 螺旋の数を定義
      const numPoints = 50; // 螺旋の点の数
      const radius = 10; // 螺旋の半径

      for (let j = 0; j < numSpirals; j++) {
        const material = new THREE.LineBasicMaterial({
          color: Math.random() * 0xffffff,
        }); // 線のマテリアルを作成し、色をランダムに設定
        const points = []; // 点の配列を作成
        const randomTurns = turns + Math.floor(Math.random() * 2) - 2; // 螺旋の回転数をランダムに増減
        for (let i = 0; i < numPoints; i++) {
          const angle = (i * (randomTurns * 6 * Math.PI)) / numPoints; // 螺旋の角度を計算
          const x = radius * Math.cos(angle + (j * 2 * Math.PI) / numSpirals); // x座標を計算
          const y = radius * Math.sin(angle + (j * 2 * Math.PI) / numSpirals); // y座標を計算
          const z = (i / numPoints) * 10 - 5; // z座標を計算
          points.push(new THREE.Vector3(x, y, z)); // 点を配列に追加
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points); // 点の配列からジオメトリを作成
        const line = new THREE.Line(geometry, material); // オメトリとマテリアルから線を作成
        scene.add(line); // シーンに線を追加
        objects.push(line); // ドラッグ可能なオブジェクトの配列に追加
      }
    };

    createSpirals(); // 初回に螺旋を作成

    setInterval(() => {
      // シーンからすべてのオブジェクトを削除
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
      turns += Math.floor(Math.random() * 5) - 1; // 螺旋の回転数をランダムに増減
      createSpirals(); // 新しい螺旋を作成
    }, 5000); // 5秒ごとに実行

    const animate = function () {
      // アニメーション関数を定義
      requestAnimationFrame(animate); // 次のフレームで再度アニメーション関数を呼び出す

      scene.rotation.z += 0.0005; // シーン全体を時計回りに回転させる

      renderer.render(scene, camera); // シーンとカメラをレンダリング
    };

    animate(); // アニメーションを開始

    return () => {
      // クリーンアップ関数を定義
      if (lineDiv) {
        lineDiv.removeChild(renderer.domElement); // レンダラーのDOM要素をline idのdivから削除
      }
      window.removeEventListener('resize', onWindowResize); // リサイズイベントリスナーを削除
    };
  }, []); // 空の依存配列を渡して、コンポーネントのマウントとアンマウント時にのみ実行

  return (
    <>
      <LineTitle />
      <div id="line" />
    </>
  );
}
