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

    // 画面イズ変更時にレンダラーとカメラのサイズを更新
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onWindowResize);

    // // ライトを作成
    // const light = new THREE.DirectionalLight(0xffffff, 2);
    // light.position.set(5 - 1, 5 - 1, 5 - 1);
    // light.castShadow = true;
    // scene.add(light);

    // // 環境光を作成
    // const ambientLight = new THREE.AmbientLight(0x404040);
    // scene.add(ambientLight);

    // カメラの位置を設定
    camera.position.z = 15;

    // マウスの位置を追跡する変数
    const mouse = new THREE.Vector2();
    const target = new THREE.Vector3();

    // マウスムーブイベントリスナーを追加
    const onMouseMove = (event: MouseEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // マウスカーソルの座標を正確に取得するためにRaycasterを使用
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        target.copy(intersects[0].point);
      } else {
      
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // ランダムな四角形を作成する関数
    const createRandomSquares = () => {
      const numSquares = 1000;
      const radius = 20;
      const squares = [];
      const colors = [];
      for (let i = 0; i < numSquares; i++) {
        // ランダムなx、y座標を設定
        const x = (Math.random() - 0.5) * radius * 2;
        const y = (Math.random() - 0.5) * radius * 2;
        squares.push(new THREE.Vector3(x, y, 0)); // z軸座標を0に設定

        const color = new THREE.Color(Math.random() * 0xffffff);
        colors.push(color.r, color.g, color.b);
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(squares);
      geometry.setAttribute(
        'color',
        new THREE.Float32BufferAttribute(colors, 3),
      );
      // 四角形のサイズを5倍に変更
      const material = new THREE.PointsMaterial({
        size: 2.0, // 0.1から0.5に変更
        vertexColors: true,
      });
      const squareCloud = new THREE.Points(geometry, material);
      scene.add(squareCloud);

      // マウスカーソルを追いかけるように四角形を移動
      const animateSquares = () => {
        for (let i = 0; i < numSquares; i++) {
          const square = geometry.attributes.position.array;
          const dx = target.x - square[i * 3];
          const dy = target.y - square[i * 3 + 1];
          const distance = Math.sqrt(dx * dx + dy * dy);
          const speed = 0.3; // 追尾速度を速くする
          if (distance > 0.1 && distance < 0.8) { // 50pxの範囲内に制限
            // 追尾範囲を狭くする
            square[i * 3] += (dx / distance) * speed;
            square[i * 3 + 1] += (dy / distance) * speed;
          }
        }
        geometry.attributes.position.needsUpdate = true;
      };

      return animateSquares;
    };

    // 初回にランダムな四角形を作成
    const animateSquares = createRandomSquares();

    // アニメーション関数を定義
    const animate = function () {
      requestAnimationFrame(animate);
      animateSquares();
      renderer.render(scene, camera);
    };
    animate();

    // クリーンアップ関数を定義
    return () => {
      document.body.removeChild(renderer.domElement);
      window.removeEventListener('resize', onWindowResize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []); // 空の依存配列を渡して、コポーネントのマウントとアンマウント時にのみ実行

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
