"use client"; // クライアントサイドで実行することを示す

import { useEffect } from 'react'; // ReactのuseEffectフックをインポート
import * as THREE from 'three';  // Three.jsライブラリをインポート

export default function Mozaiku() { // モザイクコンポーネントを定義
  useEffect(() => { // コンポーネントがマウントされたときに実行される副作用を定義
    const scene = new THREE.Scene(); // Three.jsのシーンを作成
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // カメラを作成
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

    // 五角形のジオメトリを作成
    const geometry = new THREE.BufferGeometry();
    const size = 5; // 五角形のサイズを設定
    const vertices = new Float32Array([
      size * Math.cos(0), size * Math.sin(0), 0,
      size * Math.cos(2 * Math.PI / 5), size * Math.sin(2 * Math.PI / 5), 0,
      size * Math.cos(4 * Math.PI / 5), size * Math.sin(4 * Math.PI / 5), 0,
      size * Math.cos(6 * Math.PI / 5), size * Math.sin(6 * Math.PI / 5), 0,
      size * Math.cos(8 * Math.PI / 5), size * Math.sin(8 * Math.PI / 5), 0,
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3, 0, 3, 4]);
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    const material = new THREE.MeshBasicMaterial({ color: 0x000000 }); // 黒色のマテリアルを作成
    const pentagon = new THREE.Mesh(geometry, material); // ジオメトリとマテリアルからメッシュを作成
    pentagon.position.set(0, 0, 0); // 五角形の位置を原点に設定
    pentagon.geometry.computeBoundingBox(); // バウンディングボックスを計算
    scene.add(pentagon); // シーンに五角形を追加

    // レイキャストの対象を更新
    const objects = [pentagon];

    // レイキャスターとマウスベクトルを作成
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // マウスムーブイベントリスナーを追加
    window.addEventListener('mousemove', (event) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    });

    const animate = function () { // アニメーション関数を定義
      requestAnimationFrame(animate); // 次のフレームで再度アニメーション関数を呼び出す

      // レイキャストを更新
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(objects); // 複数オブジェクトに対応

      if (intersects.length > 0) {
        const intersectedObject = intersects[0].object as THREE.Mesh; // 型アサーションを追加
        (intersectedObject.material as THREE.MeshBasicMaterial).color.set(0xff0000); // 型アサーションを追加して赤色に変更
      } else {
        (pentagon.material as THREE.MeshBasicMaterial).color.set(0x000000); // 型アサーションを追加して黒色に戻す
      }

      renderer.render(scene, camera); // シーンとカメラをレンダリング
    };

    animate(); // アニメーションを開始

    return () => { // クリーンアップ関数を定義
      document.body.removeChild(renderer.domElement); // レンダラーのDOM要素をドキュメントから削除
    };
  }, []); // 空の依存配列を渡して、コンポーネントのマウントとアンマウント時にのみ実行

  return (
    <div> {/* コンポーネントのルート要素 */}
      <div style={{ position: 'absolute', top: 15, left: 25, color: 'black', fontFamily: 'Helvetica', fontWeight: 'bold', backgroundColor: 'transparent' }}>
        {/* スタイルを適用したdiv要素 */}
      </div>
    </div>
  );
}