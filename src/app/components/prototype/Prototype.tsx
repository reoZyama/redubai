'use client'; // クライアントサイドで実行することを示す

import { useEffect } from 'react'; // ReactのuseEffectフックをインポート
import * as THREE from 'three'; // Three.jsライブラリをインポート
import useCurrentWeather from '../../hooks/useCurrentWeather'; // カスタムフックuseCurrentWeatherをインポート
import PrototypeTitle from './PrototypeTitle';

export default function Prototype() {
  const { data } = useCurrentWeather(); // useCurrentWeatherフックからデータを取得
  // data.temp_c ==> 8.7

  /**
   * カメラを作成
   */
  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    return camera;
  };

  /**
   * レンダラーを作成
   */
  const createRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    return renderer;
  };

  /**
   * ウィンドウのリサイズに対応
   */
  const onWindowResize = (
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
  ) => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  };

  /**
   * ライトを作成
   */
  const createLight = () => {
    const light = new THREE.DirectionalLight(0xffffff, 2);
    light.position.set(5, 5, 5);
    light.castShadow = true;
    return light;
  };

  /**
   * 螺旋を作成
   */
  const createSpirals = (scene: THREE.Scene, turns: number) => {
    const numSpirals = 8; // 螺旋の数を定義
    const numPoints = 5000; // 螺旋の点の数
    const radius = 10; // 螺旋の半径

    for (let j = 0; j < numSpirals; j++) {
      const material = new THREE.PointsMaterial({
        color: Math.random() * 0xffffff,
        size: 0.1,
      }); // 点のマテリアルを作成し、色をランダムに設定
      const points = []; // 点の配列を作成
      const randomTurns = turns + Math.floor(Math.random() * 5) - 2; // 螺旋の回転数をランダムに増減
      for (let i = 0; i < numPoints; i++) {
        const angle = (i * (randomTurns * 6 * Math.PI)) / numPoints; // 螺旋の角度を計算
        const x = radius * Math.cos(angle + (j * 2 * Math.PI) / numSpirals); // x座標を計算
        const y = radius * Math.sin(angle + (j * 2 * Math.PI) / numSpirals); // y座標を計算
        const z = (i / numPoints) * 10 - 5; // z座標を計算
        points.push(new THREE.Vector3(x, y, z)); // 点を配列に追加
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points); // 点の配列からジオメトリを作成
      const pointCloud = new THREE.Points(geometry, material); // ジオメトリとマテリアルから点群を作成
      scene.add(pointCloud); // シーンに点群を追加
    }
  };

  /**
   * アニメーションを開始
   */
  const animate = (
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
  ) => {
    const animateFunction = function () {
      requestAnimationFrame(animateFunction); // 次のフレームで再度アニメーション関数を呼び出す

      const latitude = 25.2667 * (Math.PI / 180); // 北緯25度16分をラジアンに変換
      const longitude = 55.3333 * (Math.PI / 180); // 東経55度20分をラジアンに変換
      const radius = 20; // カメラの半径を設定

      camera.position.x =
        radius * Math.cos(Date.now() * 0.001) * Math.cos(latitude); // カメラのx座標を計算
      camera.position.y =
        radius * Math.sin(Date.now() * 0.001) * Math.cos(latitude); // カメラのy座標を計算
      camera.position.z = radius * Math.sin(latitude); // カメラのz座標を計算
      camera.lookAt(0, 0, 0); // カメラを原点に向ける

      renderer.render(scene, camera); // シーンとカメラをレンダリング
    };

    animateFunction(); // アニメーションを開始
  };

  useEffect(() => {
    // コンポーネントがマウントされたときに実行される副作用を定義
    const scene = new THREE.Scene(); // Three.jsのシーンを作成

    // カメラを作成
    const camera = createCamera();

    // レンダラーを作成
    const renderer = createRenderer();

    // レンダラーのDOM要素をドキュメントに追加
    document.body.appendChild(renderer.domElement);

    // 画面サイズ変更時にレンダラーとカメラのサイズを更新
    window.addEventListener('resize', () => onWindowResize(camera, renderer));

    // ライトを作成
    const light = createLight();
    scene.add(light); // シーンにライトを追加

    const ambientLight = new THREE.AmbientLight(0x404040); // 環境光を作成
    scene.add(ambientLight); // シーンに環境光を追加

    camera.position.z = 15; // カメラの位置を設定

    let turns = 5; // 螺旋の回転数を定義

    createSpirals(scene, turns); // 初回に螺旋を作成

    setInterval(() => {
      // シーンからすべてのオブジェクトを削除
      while (scene.children.length > 0) {
        scene.remove(scene.children[0]);
      }
      turns += Math.floor(Math.random() * 5) - 1; // 螺旋の回転数をランダムに増減
      createSpirals(scene, turns); // 新しい螺旋を作成
    }, 5000); // 5秒ごとに実行

    animate(scene, camera, renderer); // アニメーションを開始

    return () => {
      // クリーンアップ関数を定義
      document.body.removeChild(renderer.domElement); // レンダラーのDOM要素をドキュメントから削除
      window.removeEventListener('resize', () =>
        onWindowResize(camera, renderer),
      ); // リサイズイベントリスナーを削除
    };
  }, []);

  return (
    <div>
      <PrototypeTitle />
    </div>
  );
}
