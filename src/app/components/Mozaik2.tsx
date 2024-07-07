'use client'; // クライアントサイドで実行することを示す

import { useEffect } from 'react'; // ReactのuseEffectフックをインポート
import * as THREE from 'three'; // Three.jsライブラリをインポート

export default function Mozaiku() {
  // モザイクコンポーネントを定義
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
    document.body.appendChild(renderer.domElement); // レンダラーのDOM要素をドキュメントに追加

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

    // 正十二面体のジオメトリを作成
    const geometry = new THREE.DodecahedronGeometry(5); // サイズ5の正十二面体ジオメトリを作成

    // 輪郭のみの描写にするためのエッジジオメトリを作成
    const edges = new THREE.EdgesGeometry(geometry); // エッジジオメトリを作成
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 }); // 黒色のラインマテリアルを作成
    const wireframe = new THREE.LineSegments(edges, lineMaterial); // エッジジオメトリとラインマテリアルからラインセグメントを作成
    scene.add(wireframe); // シーンにワイヤーフレームを追加

    // 正十二面体の対角線を作成
    const vertices = geometry.attributes.position.array; // 正十二面体の頂点を取得
    const diagonalMaterial = new THREE.LineBasicMaterial({ color: 0xff0000 }); // 赤色のラインマテリアルを作成
    const diagonalGeometry = new THREE.BufferGeometry(); // バッファジオメトリを作成

    // 対角線をジオメトリに追加
    const positions = [];
    for (let i = 0; i < vertices.length; i += 3) {
      for (let j = i + 3; j < vertices.length; j += 3) {
        positions.push(vertices[i], vertices[i + 1], vertices[i + 2]);
        positions.push(vertices[j], vertices[j + 1], vertices[j + 2]);
      }
    }
    diagonalGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(positions, 3),
    );

    const diagonals = new THREE.LineSegments(
      diagonalGeometry,
      diagonalMaterial,
    ); // ジオメトリとマテリアルからラインセグメントを作成
    scene.add(diagonals); // シーンに対角線を追加

    const animate = function () {
      // アニメーション関数を定義
      requestAnimationFrame(animate); // 次のフレームで再度アニメーション関数を呼び出す

      wireframe.rotation.y -= 0.01; // ワイヤーフレームを半時計回りに回転させる
      diagonals.rotation.y -= 0.01; // 対角線も半時計回りに回転させる

      renderer.render(scene, camera); // シーンとカメラをレンダリング
    };

    animate(); // アニメーションを開始

    return () => {
      // クリーンアップ関数を定義
      document.body.removeChild(renderer.domElement); // レンダラーのDOM要素をドキュメントから削除
    };
  }, []); // 空の依存配列を渡して、コンポーネントのマウントとアンマウント時にのみ実行

  return (
    <div>
      {' '}
      {/* コンポーネントのルート要素 */}
      <div
        style={{
          position: 'absolute',
          top: 15,
          left: 25,
          color: 'black',
          fontFamily: 'Helvetica',
          fontWeight: 'bold',
          backgroundColor: 'transparent',
        }}
      >
        {/* スタイルを適用したdiv要素 */}
      </div>
    </div>
  );
}
