'use client'; // クライアントサイドで実行することを示す

import { useEffect } from 'react'; // ReactのuseEffectフックをインポート
import * as THREE from 'three'; // Three.jsライブラリをインポート
import useCurrentWeather from '../hooks/useCurrentWeather'; // カスタムフックuseCurrentWeatherをインポート

export default function Otameshi() {
  // Otameshiコンポーネントを定義
  const { data } = useCurrentWeather(); // useCurrentWeatherフックからデータを取得
  // data.temp_c ==> 8.7

  /**
   * 赤 = 1 ~ 5
   * 青 = 6 ~ 10
   *
   * data.temp_c を関数の引数に与え、色を取得する
   * 色を threejs のオブジェクトに当てる
   */

  useEffect(() => {
    // Three.jsのシーンを作成
    const scene = new THREE.Scene();

    // カメラを作成
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );

    // レンダラーを作成
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    // 画面サイズ変更時にレンダラーとカメラのサイズを更新
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // ライトを作成
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5 - 1, 5 - 1, 5 - 1);
    light.castShadow = true;
    scene.add(light);

    // 環境光を作成
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // カメラの位置を設定
    camera.position.z = 15;

    // ランダムな点を作成する関数
    const createRandomPoints = () => {
      const numPoints = 1000;
      const radius = 15;

      const points = [];
      const colors = [];
      for (let i = 0; i < numPoints; i++) {
        const x = (Math.random() - 0.5) * radius * 2;
        const y = (Math.random() - 0.5) * radius * 2;
        const z = (Math.random() - 0.5) * radius * 2;
        points.push(new THREE.Vector3(x, y, z));

        const color = new THREE.Color(Math.random() * 0xffffff);
        colors.push(color.r, color.g, color.b);
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors, 3),
      );
      const material = new THREE.PointsMaterial({
        size: 0.1,
        vertexColors: true,
      });
      const pointCloud = new THREE.Points(geometry, material);
      scene.add(pointCloud);
    };

    // 初回にランダムな点を作成
    createRandomPoints();

    // 5秒ごとにランダムな点を再作成
    setInterval(() => {
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
      createRandomPoints();
    }, 5000);

    // アニメーション関数を定義
    const animate = function () {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    // アニメーションを開始
    animate();

    // クリーンアップ関数を定義
    return () => {
      document.body.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize);
    };
  }, []); // 空の依存配列を渡して、コンポーネントのマウントとアンマウント時にのみ実行

  return (
    <div>
      {' '}
      {/* コンポーネントのルート要素 */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          color: 'black',
          fontFamily: 'Source Han Serif',
          fontWeight: 'bold',
        }}
      >
        {/* スタイルを適用したdiv要素 */}
      </div>
    </div>
  );
}
