"use client" // クライアントサイドで実行することを示す

import { useEffect } from 'react'; // ReactのuseEffectフックをインポート
import * as THREE from 'three'; // Three.jsライブラリをインポート
import useCurrentWeather from '../hooks/useCurrentWeather'; // カスタムフックuseCurrentWeatherをインポート

export default function Otameshi() { // Otameshiコンポーネントを定義
  const {data} = useCurrentWeather(); // useCurrentWeatherフックからデータを取得
  // data.temp_c ==> 8.7

  /**
   * 赤 = 1 ~ 5
   * 青 = 6 ~ 10
   * 
   * data.temp_c を関数の引数に与え、色を取得する
   * 色を threejs のオブジェクトに当てる
   */

  useEffect(() => { // コンポーネントがマウントされたときに実行される副作用を定義
    const scene = new THREE.Scene(); // Three.jsのシーンを作成
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000); // カメラを作成
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // レンダラーを作成
    renderer.setSize(window.innerWidth, window.innerHeight); // レンダラーのサイズを設定
    renderer.setClearColor(0x000000, 0); // 背景色を透明に設定
    renderer.shadowMap.enabled = true; // 影を有効にする
    document.body.appendChild(renderer.domElement); // レンダラーのDOM要素をドキュメントに追加

    // 画面サイズ変更時にレンダラーとカメラのサイズを更新
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    const light = new THREE.DirectionalLight(0xffffff, 2); // 指向性ライトを作成
    light.position.set(5-1, 5-1, 5-1); // ライトの位置を設定
    light.castShadow = true; // ライトの影を有効にする
    scene.add(light); // シーンにライトを追加

    const ambientLight = new THREE.AmbientLight(0x404040); // 環境光を作成
    scene.add(ambientLight); // シーンに環境光を追加

    camera.position.z = 15; // カメラの位置を設定

    const createRandomPoints = () => {
      const numPoints = 1000; // 点の数
      const radius = 15; // 点の分布半径

      const points = []; // 点の配列を作成
      const colors = []; // 色の配列を作成
      for (let i = 0; i < numPoints; i++) {
        const x = (Math.random() - 0.5) * radius * 2; // x座標をランダムに計算
        const y = (Math.random() - 0.5) * radius * 2; // y座標をランダムに計算
        const z = (Math.random() - 0.5) * radius * 2; // z座標をランダムに計算
        points.push(new THREE.Vector3(x, y, z)); // 点を配列に追加

        const color = new THREE.Color(Math.random() * 0xffffff); // ランダムな色を生成
        colors.push(color.r, color.g, color.b); // 色を配列に追加
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points); // 点の配列からジオメトリを作成
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); // 色の属性をジオメトリに追加
      const material = new THREE.PointsMaterial({ size: 0.1, vertexColors: true }); // 点のマテリアルを作成し、頂点ごとに色を設定
      const pointCloud = new THREE.Points(geometry, material); // ジオメトリとマテリアルから点群を作成
      scene.add(pointCloud); // シーンに点群を追加
    };

    createRandomPoints(); // 初回にランダムな点を作成

    setInterval(() => {
      // シーンからすべてのオブジェクトを削除
      while(scene.children.length > 0){ 
        scene.remove(scene.children[0]); 
      }
      createRandomPoints(); // 新しいランダムな点を作成
    }, 5000); // 5秒ごとに実行

    const animate = function () { // アニメーション関数を定義
      requestAnimationFrame(animate); // 次のフレームで再度アニメーション関数を呼び出す

      renderer.render(scene, camera); // シーンとカメラをレンダリング
    };

    animate(); // アニメーションを開始

    return () => { // クリーンアップ関数を定義
      document.body.removeChild(renderer.domElement); // レンダラーのDOM要素をドキュメントから削除
      window.removeEventListener('resize', onWindowResize); // リサイズイベントリスナーを削除
    };
  }, []); // 空の依存配列を渡して、コンポーネントのマウントとアンマウント時にのみ実行

  return (
    <div> {/* コンポーネントのルート要素 */}
      <div style={{ position: 'absolute', top: 0, left: 0, color: 'black', fontFamily: 'Source Han Serif', fontWeight: 'bold' }}>
        {/* スタイルを適用したdiv要素 */}
      </div>
    </div>
  );
}
