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

    // 四角形のジオメトリを作成
    const geometry = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -1, -1, 0, // 左下
      1, -1, 0, // 右下
      1, 1, 0, // 右上
      -1, 1, 0, // 左上
    ]);
    geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
    const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
    geometry.setIndex(new THREE.BufferAttribute(indices, 1));

    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 }); // 緑色のマテリアルを作成
    const square = new THREE.Mesh(geometry, material); // ジオメトリとマテリアルからメッシュを作成
    scene.add(square); // シーンに四角形を追加

    // シーンとカメラをレンダリング
    renderer.render(scene, camera);

    return () => {
      // クリーンアップ関数を定義
      document.body.removeChild(renderer.domElement); // レンダラーのDOM要素をドキュメントから削除
    };
  }, []); // 空の依存配列を渡して、コンポーネントのマウントとアンマウント時にのみ実行

  return null; // 文字のコンポーネントを削除
} 