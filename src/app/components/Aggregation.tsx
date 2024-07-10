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
        // マウスカーソルがオブジェクトに当たらない場合、カメラの前方に設定
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5).unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = -camera.position.z / dir.z;
        target.copy(camera.position).add(dir.multiplyScalar(distance));
      }
    };
    window.addEventListener('mousemove', onMouseMove);

    // ランダムな点を作成する関数
    const createRandomPoints = () => {
      const numPoints = 2000;
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

      // 5秒ごとに点の色を変更
      setInterval(() => {
        const newColors = [];
        for (let i = 0; i < numPoints; i++) {
          const newColor = new THREE.Color(Math.random() * 0xffffff);
          newColors.push(newColor.r, newColor.g, newColor.b);
        }
        geometry.setAttribute(
          'color',
          new THREE.Float32BufferAttribute(newColors, 3),
        );
      }, 5000);

      // マウスカーソルを追いかけるように点を移動
      const animatePoints = () => {
        for (let i = 0; i < numPoints; i++) {
          const point = geometry.attributes.position.array;
          const dx = target.x - point[i * 3];
          const dy = target.y - point[i * 3 + 1];
          const dz = target.z - point[i * 3 + 2];
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const speed = 0.03; // 追尾速度を速くする
          if (distance > 0.01) { // 追尾範囲を狭くする
            point[i * 3] += (dx / distance) * speed;
            point[i * 3 + 1] += (dy / distance) * speed;
            point[i * 3 + 2] += (dz / distance) * speed;
          }
        }
        geometry.attributes.position.needsUpdate = true;
      };

      return animatePoints;
    };

    // 初回にランダムな点を作成
    const animatePoints = createRandomPoints();

    // アニメーション関数を定義
    const animate = function () {
      requestAnimationFrame(animate);
      animatePoints();
      renderer.render(scene, camera);
    };

    // アニメーションを開��
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