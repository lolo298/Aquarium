import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ArToolkitProfile,
  ArToolkitSource,
  ArToolkitContext,
  ArMarkerControls
} from "@ar-js-org/ar.js/three.js/build/ar-threex";

export default () => {
  const mount = useRef(null);
  const [renderer, setRenderer] = useState(null);
  useEffect(() => {
    ArToolkitContext.baseURL = "./";

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setClearColor(new THREE.Color("lightgrey"), 0);
    // renderer.setPixelRatio( 2 );
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0px";
    renderer.domElement.style.left = "0px";
    setRenderer(renderer);

    // array of functions for the rendering loop
    const onRenderFcts = [];

    // init scene and camera
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.Camera();
    scene.add(camera);

    const artoolkitProfile = new ArToolkitProfile();
    artoolkitProfile.sourceWebcam();

    // add existing parameters, this is not well documented
    let additionalParameters = {
      // Device id of the camera to use (optional)
      deviceId: null,
      // resolution of at which we initialize in the source image
      sourceWidth: 640,
      sourceHeight: 480,
      // resolution displayed for the source
      displayWidth: 640,
      displayHeight: 480
    };
    Object.assign(artoolkitProfile.sourceParameters, additionalParameters);
    console.log(artoolkitProfile.sourceParameters); // now includes the additionalParameters

    const arToolkitSource = new ArToolkitSource(artoolkitProfile.sourceParameters);

    arToolkitSource.init(() => {
      onResize();
    });

    // handle resize
    window.addEventListener("resize", () => {
      onResize();
    });

    function onResize() {
      arToolkitSource.onResizeElement();
      arToolkitSource.copyElementSizeTo(renderer.domElement);
      if (arToolkitContext.arController !== null) {
        arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
      }
    }

    // create atToolkitContext
    const arToolkitContext = new ArToolkitContext({
      debug: false,
      cameraParametersUrl: ArToolkitContext.baseURL + "data/camera_para.dat",
      detectionMode: "mono",
      canvasWidth: 640,
      canvasHeight: 490,
      imageSmoothingEnabled: true // There is still a warning about mozImageSmoothingEnabled when using Firefox
    });

    // initialize it
    arToolkitContext.init(() => {
      // copy projection matrix to camera
      camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    // update artoolkit on every frame
    onRenderFcts.push(() => {
      if (arToolkitSource.ready === false) return;

      arToolkitContext.update(arToolkitSource.domElement);
    });

    var markerGroup = new THREE.Group();
    scene.add(markerGroup);

    var markerControls = new ArMarkerControls(arToolkitContext, markerGroup, {
      type: "pattern",
      patternUrl: ArToolkitContext.baseURL + "data/patt.patt",
      smooth: true,
      smoothCount: 5,
      smoothTolerance: 0.01,
      smoothThreshold: 2
    });

    var markerScene = new THREE.Scene();
    markerGroup.add(markerScene);

    var mesh = new THREE.AxesHelper();
    markerScene.add(mesh);

    // add a torus knot
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshNormalMaterial({
      transparent: true,
      opacity: 0.5,
      side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = geometry.parameters.height / 2;
    markerScene.add(mesh);

    var geometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
    var material = new THREE.MeshNormalMaterial();
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = 0.5;
    markerScene.add(mesh);

    onRenderFcts.push(function(delta) {
      mesh.rotation.x += delta * Math.PI;
    });

    onRenderFcts.push(function() {
      renderer.render(scene, camera);
    });

    // run the rendering loop
    var lastTimeMsec = null;
    requestAnimationFrame(function animate(nowMsec) {
      // keep looping
      requestAnimationFrame(animate);
      // measure time
      lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
      var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
      lastTimeMsec = nowMsec;
      // call each update function
      onRenderFcts.forEach(function(onRenderFct) {
        onRenderFct(deltaMsec / 1000, nowMsec / 1000);
      });
    });
  }, []);

  if (!renderer) {
    return null;
  }

  console.log(renderer.domElement);

  return (
    <div
      style={{ width: "800px", height: "800px" }}
      dangerouslySetInnerHTML={{ __html: renderer.domElement.outerHTML }}
    />
  );
};
