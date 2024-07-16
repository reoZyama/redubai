'use client'; // クライアントサイドで実行することを示す
import { useEffect, useState } from 'react'; // ReactのuseEffectフックとuseStateフックをインポート
import * as THREE from 'three'; // Three.jsライブラリをインポート
import useCurrentWeather from '../hooks/useCurrentWeather'; // カスタムフックuseCurrentWeatherをインポート

export default function Otameshi() {
  // Otameshiコンポーネントを定義
  const { data } = useCurrentWeather(); // useCurrentWeatherフックからデータを取得
  // data.temp_c ==> 8.7

  const [isMouseNear, setIsMouseNear] = useState(false); // マウスが近くにあるかどうかを追跡するための状態

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
    renderer.setClearColor(0x000000, 0); // 背設定
    renderer.shadowMap.enabled = true; // 影を有効にする
    document.body.appendChild(renderer.domElement); // レンダラーのDOM要素ドキト

    // 画面サズ変更時にレンダラーとカメラのサイズを更新
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

    camera.position.z = 15; // カメラの置を設定

    // 水平線をシーンに追加
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff, linewidth: 10000 }); // 線のマテリアルを作成し、線幅を設定
    const lineGeometry = new THREE.BufferGeometry(); // ジオメを
    const vertices = []; // 頂点の配列を作成
    for (let j = -22; j <= 22; j++) {
      // Y座標を追加して線を水平に設定
      vertices.push(new THREE.Vector3(j, 0, 0));
    }
    lineGeometry.setFromPoints(vertices); // 頂点の配列からジオメトリを作成
    const line = new THREE.Line(lineGeometry, lineMaterial); // 線を作成
    line.geometry.computeVertexNormals(); // 立体線のための頂点法線を計算
    scene.add(line); // シーンに線を追加

    renderer.render(scene, camera); // シーンとカメラをレンダリング

    // マウスが近くにあるかどうかを監視
    const onMouseMove = (event: MouseEvent) => { // 'event' パラメーターの型を 'MouseEvent' に指定
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        setIsMouseNear(true); // マウスがシーン内のオブジェクトに近くにある場合はtrueを設定
      } else {
        setIsMouseNear(false); // そうでない場合はfalseを設定
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      // クリーンアップ関数を定義
      document.body.removeChild(renderer.domElement); // レンダラーのDOM要素をドキュメントから削除
      window.removeEventListener('resize', onWindowResize); // リサイズイベントリスナーを削除
      window.removeEventListener('mousemove', onMouseMove); // マウスムーブイベントリスナーを削除
      scene.clear(); // シーンからすべてのオブジェクトを削除
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