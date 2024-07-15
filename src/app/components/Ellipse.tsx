'use client'; // クライアントサイドで実行することを示す

import { useEffect, useRef } from 'react'; // ReactのuseEffectとuseRefフックをインポート
import * as THREE from 'three'; // Three.jsライブラリをインポート
import { Line2 } from 'three/examples/jsm/lines/Line2.js';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry.js';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial.js';

// 型宣言をインポート
import 'three/examples/jsm/lines/LineMaterial';

export default function Animation() {
  // Animationコンポーネントを定義
  const mountRef = useRef(null); // DOM要素を参照するためのrefを作成

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
    renderer.setClearColor(0xffffff, 1);
    return renderer;
  };

  /**
   * ウィンドウのリサイズに対応
   */
  const handleWindowResize = (
    camera: THREE.PerspectiveCamera,
    renderer: THREE.WebGLRenderer,
  ) => {
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  };

  /**
   * 楕円を作成
   */
  const createEllipse = () => {
    const ellipseGeometry = new THREE.EllipseCurve(
      0,
      0, // 中心の位置
      7,
      2, // x半径とy半径
      0,
      2 * Math.PI, // 開始角度と終了角度
      false, // 時計回りかどうか
      0, // 回転角度
    );
    const ellipsePoints = ellipseGeometry.getPoints(50);
    const ellipsePositions = new Float32Array(ellipsePoints.length * 3);
    for (let i = 0; i < ellipsePoints.length; i++) {
      ellipsePositions[i * 3] = ellipsePoints[i].x;
      ellipsePositions[i * 3 + 1] = ellipsePoints[i].y;
      ellipsePositions[i * 3 + 2] = 0;
    }
    const ellipseLineGeometry = new LineGeometry();
    ellipseLineGeometry.setPositions(ellipsePositions);
    const ellipseLineMaterial = new LineMaterial({
      color: 0x000000,
      linewidth: 40, // 線の太さを大きく調整
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // 解像度を設定
    });
    const ellipse = new Line2(ellipseLineGeometry, ellipseLineMaterial);
    ellipse.position.z = 0; // z軸の座標を追加
    ellipse.userData = { URL: '/next-page' }; // 代わりにイベントリスナーを追加
    return ellipse;
  };

  /**
   * 水平線を作成
   */
  const createHorizontalLine = () => {
    const horizontalPositions = new Float32Array([
      -7,
      0,
      0,
      7,
      0,
      0, // 水平線
    ]);
    const horizontalLineGeometry = new LineGeometry();
    horizontalLineGeometry.setPositions(horizontalPositions);
    const horizontalLineMaterial = new LineMaterial({
      color: 0x000000, // 黒色
      linewidth: 40, // 線の太さを楕円と揃える
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // 解像度を設定
    });
    const horizontalLine = new Line2(
      horizontalLineGeometry,
      horizontalLineMaterial,
    );
    horizontalLine.position.z = 0; // z軸の座標を追加
    return horizontalLine;
  };

  /**
   * 垂直線を作成
   */
  const createVerticalLine = () => {
    const verticalPositions = new Float32Array([
      0,
      -2,
      0,
      0,
      2,
      0, // 垂直線
    ]);
    const verticalLineGeometry = new LineGeometry();
    verticalLineGeometry.setPositions(verticalPositions);
    const verticalLineMaterial = new LineMaterial({
      color: 0x000000, // 黒色
      linewidth: 40, // 線の太さを楕円と揃える
      resolution: new THREE.Vector2(window.innerWidth, window.innerHeight), // 解像度を設定
    });
    const verticalLine = new Line2(verticalLineGeometry, verticalLineMaterial);
    verticalLine.position.z = 0; // z軸の座標を追加
    return verticalLine;
  };

  /**
   * カメラのポジションを指定
   */
  const setCameraPosition = (camera: THREE.PerspectiveCamera) => {
    camera.position.z = 10;
  };

  /**
   * アニメーション
   */
  const animate = (
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
  ) => {
    // 次のフレームで再度アニメーション関数を呼び出す
    requestAnimationFrame(() => animate(renderer, scene, camera));

    // シーンとカメラをレンダリング
    renderer.render(scene, camera);

    // シーン全体をz軸で回転させる
    // scene.rotation.z += 0.01; // 楕円の回転を止めるためにコメントアウト
  };

  /**
   * クリーンアップ関数
   */
  const cleanup = (renderer: THREE.WebGLRenderer) => {
    if (mountRef.current) {
      (mountRef.current as HTMLElement).removeChild(renderer.domElement); // レンダラーのDOM要素をrefから削除
    }
  };

  /**
   * メイン
   */
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = createCamera();
    const renderer = createRenderer();
    setCameraPosition(camera);
    handleWindowResize(camera, renderer);

    if (mountRef.current) {
      // レンダラーのDOM要素をrefに追加
      (mountRef.current as HTMLElement).appendChild(renderer.domElement);
    }

    const ellipse = createEllipse();
    scene.add(ellipse);

    const horizontalLine = createHorizontalLine();
    scene.add(horizontalLine);

    const verticalLine = createVerticalLine();
    scene.add(verticalLine);

    animate(renderer, scene, camera);

    return () => {
      cleanup(renderer);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        overflow: 'hidden',
      }}
    />
  );
}