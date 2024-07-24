'use client'; // クライアントサイドで実行することを示す

import { useEffect, useRef } from 'react'; // ReactのuseEffectとuseRefフックをインポート
import * as THREE from 'three'; // Three.jsライブラリをインポート

export default function Marble() {
  const mountRef = useRef(null); // DOM要素を参照するためのrefを作成

  /**
   * createCamera
   */
  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5; // カメラの位置を近づける

    return camera;
  };

  /**
   * createRenderer
   */
  const createRenderer = () => {
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);

    return renderer;
  };

  /**
   * appendRendererToDOM
   */
  const appendRendererToDOM = (
    renderer: THREE.WebGLRenderer,
    mountRef: React.RefObject<HTMLElement>,
  ) => {
    if (mountRef.current) {
      (mountRef.current as HTMLElement).appendChild(renderer.domElement);
    }
  };

  /**
   * randomShape
   */
  const randomShape = () => {
    const shape = new THREE.Shape();
    const maxSize = 2; // オブジェクトの最大サイズを制限
    for (let i = 0; i < 7; i++) {
      shape.lineTo(
        Math.random() * maxSize - maxSize / 2,
        Math.random() * maxSize - maxSize / 2
      );
    }
    return shape;
  };

  /**
   * createAmoeba
   */
  const createAmoeba = (
    scene: THREE.Scene,
    geometry: THREE.ShapeGeometry,
    material: THREE.MeshBasicMaterial,
  ) => {
    const amoeba = new THREE.Mesh(geometry, material); // ジオメトリとマテリアルからメッシュを作成
    amoeba.position.set(0, 0, 0); // アメーバを中心に配置
    scene.add(amoeba); // シーンにアメーバを追加

    return amoeba;
  };

  /**
   * changeAmoeba
   */
  const changeAmoeba = (
    amoeba: THREE.Mesh<
      THREE.ShapeGeometry,
      THREE.MeshBasicMaterial,
      THREE.Object3DEventMap
    >,
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
  ) => {
    amoeba.geometry = new THREE.ShapeGeometry(randomShape()); // 新しいランダムな形に更新
    amoeba.material.color.set(Math.random() * 0xffffff); // 新しいランダムな色に更新
    renderer.render(scene, camera); // レンダングを更新
  };

  /**
   * changeBackgroundColor
   */
  const changeBackgroundColor = (
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
  ) => {
    renderer.setClearColor(Math.random() * 0xffffff, 1); // 背景色をランダムに更新
    renderer.render(scene, camera); // レンダリングを更新
  };

  /**
   * animate
   */
  const animate = (
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.Camera,
  ) => {
    requestAnimationFrame(() => animate(renderer, scene, camera));
    renderer.render(scene, camera);
  };

  /**
   * メインのロジック
   */
  const process = () => {
    // シーンの作成
    const scene = new THREE.Scene();

    // カメラの作成
    const camera = createCamera();

    // レンダラーの作成
    const renderer = createRenderer();

    // レンダラーをDOMに追加
    appendRendererToDOM(renderer, mountRef);

    // ジオメトリとマテリアルの作成
    const geometry = new THREE.ShapeGeometry(randomShape()); // ランダムな形を作成
    const material = new THREE.MeshBasicMaterial({
      color: Math.random() * 0xffffff,
    }); // ランダムな色のマテリアルを作成

    // createAmoeba
    const amoeba = createAmoeba(scene, geometry, material);

    setInterval(() => {
      // 5秒ごとにchangeAmoebaを呼び出す
      changeAmoeba(amoeba, renderer, scene, camera);

      // 5秒ごとにchangeBackgroundColorを呼び出す
      changeBackgroundColor(renderer, scene, camera);
    }, 5000);

    animate(renderer, scene, camera);

    // クリーンアップ関数
    return () => {
      if (mountRef.current) {
        (mountRef.current as HTMLElement).removeChild(renderer.domElement);
      }
    };
  };

  /**
   * useEffect
   */
  useEffect(() => {
    process();
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