'use client'; // クライアントサイドで実行することを示す
import { useEffect, useState } from 'react'; // ReactのuseEffectフックとuseStateフックをインポート
import * as THREE from 'three'; // Three.jsライブラリをインポート
import FlowsTitle from './FlowsTitle';

export default function Flows() {
  const [isMouseNear, setIsMouseNear] = useState(false); // マウスが近くにあるかどうかを追跡するための状態

  const createCamera = () => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    ); // カメラを作成
    camera.position.z = 15; // カメラの位置を設定
    return camera;
  };

  const addLight = (scene: THREE.Scene) => {
    const light = new THREE.DirectionalLight(0xffffff, 2); // 指向性ライトを作成
    light.position.set(5, 5, 5); // ライトの位置を設定
    light.castShadow = true; // ライトの影を有効にする
    scene.add(light); // シーンにライトを追加

    const ambientLight = new THREE.AmbientLight(0x404040); // 環境光を作成
    scene.add(ambientLight); // シーンに環境光を追加
  };


  const animate = function (scene: THREE.Scene, camera: THREE.Camera, renderer: THREE.Renderer) {
    // アニメーション関数を定義
    requestAnimationFrame(() => animate(scene, camera, renderer)); // 次のフレームで再度アニメーション関数を呼び出す
    renderer.render(scene, camera); // シーンとカメラをレンダリング
  };

  const cleanup = (renderer: THREE.Renderer, onWindowResize: () => void, onMouseMove: (event: MouseEvent) => void, scene: THREE.Scene) => {
    document.body.removeChild(renderer.domElement); // レンダラーのDOM要素をドキュメントから削除
    window.removeEventListener('resize', onWindowResize); // リサイズイベントリスナーを削除
    window.removeEventListener('mousemove', onMouseMove); // マウスムーブイベントリスナーを削除
    scene.clear(); // シーンからすべてのオブジェクトを削除
  };

  useEffect(() => {
    // コンポーネントがマウントされたときに実行される副作用を定義
    const scene = new THREE.Scene();
    const camera = createCamera();

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

    addLight(scene);

    // 水平線をシーンに追加
    let lines = [];
    for (let i = 1; i < 9; i++) {
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0x0000ff,
        linewidth: 10000,
      }); // 線のマテリアルを作成し、線幅を設定
      const lineGeometry = new THREE.BufferGeometry(); // ジオメを
      const vertices = []; // 頂点の配列を作成
      for (let j = -22; j <= 22; j++) {
        // Y座標を追加して線を水平に設定

        vertices.push(new THREE.Vector3(j, i * 2 - 10, 0));
      }
      lineGeometry.setFromPoints(vertices); // 頂点の配列からジオメトリを作成
      const line = new THREE.Line(lineGeometry, lineMaterial); // 線を作成
      line.geometry.computeVertexNormals(); // 立体線のための頂点法線を計算
      scene.add(line); // シーンに線を追加
      lines.push(line); // 線を配列に追加
    }

    animate(scene, camera, renderer);

    // マウスが近くにあるかどうかを監視
    const onMouseMove = (event: MouseEvent) => {
      // 'event' パラメーターの型を 'MouseEvent' に指定
      const mouse = new THREE.Vector2();
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);
      if (intersects.length > 0) {
        setIsMouseNear(true); // マウスがシーン内のオブジェクトに近くにある場合はtrueを設定
        // マウスカーソルが触れた時に、ランダムに波打つようにする
        lines.forEach((line) => {
          line.geometry.attributes.position.needsUpdate = true; // 'verticesNeedUpdate' を 'needsUpdate' に変更
          // カーソルが触れた時に線にランダムな波打つアニメーションを追加
          const vertices = line.geometry.attributes.position.array;
          for (let i = 0; i < vertices.length; i += 3) {
            // ランダムな値をY座標に追加して線に波打つアニメーションを追加
            vertices[i + 1] += Math.random() * 0.1 - 0.05; // Y座標にランダムな値を追加
          }
          line.geometry.attributes.position.needsUpdate = true; // 頂点の更新を通知
        });
        return;
      }

      setIsMouseNear(false); // そうでない場合はfalseを設定
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      cleanup(renderer, onWindowResize, onMouseMove, scene);
    };
  }, []);

  return (
    <div>
      <FlowsTitle />
    </div>
  );
}
