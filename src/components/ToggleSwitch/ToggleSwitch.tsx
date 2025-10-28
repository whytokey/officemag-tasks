import { useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Sphere } from '@react-three/drei';
import { useSpring, a, SpringValue } from '@react-spring/three';
import * as THREE from 'three';

import styles from './ToggleSwitch.module.css';

const COLOR_RED = '#c94553';
const COLOR_GREEN = '#84dc51';
const COLOR_FRAME = '#fefffd';

// // --- Константы геометрии ---
const FRAME_WIDTH = 4.2;
const FRAME_HEIGHT = 2.1;
const FRAME_DEPTH = 0.8;
const FRAME_RADIUS = 1;

const INNER_TRACK_WIDTH = FRAME_WIDTH - 0.4;
const BALL_RADIUS = 0.97;
const BALL_OFFSET_X = (INNER_TRACK_WIDTH / 2) - BALL_RADIUS + 0.09;


// --- Хелпер для обновления Uniform  ---
interface TrackUpdaterProps {
  material: THREE.MeshStandardMaterial;
  xPosSpring: SpringValue<number>;
}

function TrackUpdater({ material, xPosSpring }: TrackUpdaterProps) {
  useFrame(() => {
    const shader = material.userData.shader;
    if (shader && shader.uniforms.rollerX) {
      shader.uniforms.rollerX.value = xPosSpring.get();
    }
  });
  return null;
}

const ToggleSwitch = () => {
  const [isOn, setIsOn] = useState(false);
  const ballSplitMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.5,
      metalness: 0.1,
    });
    mat.onBeforeCompile = (shader) => {
      shader.uniforms.colorLeft = { value: new THREE.Color(COLOR_GREEN) };
      shader.uniforms.colorRight = { value: new THREE.Color(COLOR_RED) };
      shader.vertexShader = `
        varying vec3 vLocalPosition;
        ${shader.vertexShader}
      `;
      shader.vertexShader = shader.vertexShader.replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
         vLocalPosition = position;
        `
      );
      shader.fragmentShader = `
        uniform vec3 colorLeft;
        uniform vec3 colorRight;
        varying vec3 vLocalPosition;
        ${shader.fragmentShader}
      `;
      shader.fragmentShader = shader.fragmentShader.replace(
        `#include <color_fragment>`,
        `#include <color_fragment>

         // --- Наша логика разделения цвета ---
         vec3 color;
         if (vLocalPosition.x < 0.0) {
           color = colorLeft;
         } else {
           color = colorRight;
         }

         // Перезаписываем стандартный цвет
         diffuseColor.rgb = color;
        `
      );
    };

    return mat;
  }, []);
  const trackPaintMaterial = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      roughness: 0.8,
      metalness: 0.1,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.colorOn = { value: new THREE.Color(COLOR_GREEN) };
      shader.uniforms.colorOff = { value: new THREE.Color(COLOR_RED) };
      shader.uniforms.rollerX = { value: -BALL_OFFSET_X };
      shader.vertexShader = `
        varying vec3 vLocalPosition;
        ${shader.vertexShader}
      `.replace(
        `#include <begin_vertex>`,
        `#include <begin_vertex>
         vLocalPosition = position;
        `
      );
      shader.fragmentShader = `
        uniform vec3 colorOn;
        uniform vec3 colorOff;
        uniform float rollerX;
        varying vec3 vLocalPosition;
        ${shader.fragmentShader}
      `.replace(
        `#include <color_fragment>`,
        `#include <color_fragment>

         // --- Наша логика "Валика" ---
         float blendWidth = 0.2;
         float mixAmount = smoothstep(rollerX - blendWidth, rollerX + blendWidth, vLocalPosition.x);
         vec3 finalColor = mix(colorOn, colorOff, mixAmount);

         // Перезаписываем стандартный цвет
         diffuseColor.rgb = finalColor;
        `
      );
      mat.userData.shader = shader;
    };

    return mat;
  }, []);


  // Анимация
  const { xPos, rotationY } = useSpring({
    xPos: isOn ? BALL_OFFSET_X : -BALL_OFFSET_X,
    rotationY: isOn ? (Math.PI / 2) : (-Math.PI / 2),
    config: {
      duration: 600,
    },
  });

  return (
    <div className={styles.canvasWrapper}>
      <Canvas
        shadows
        camera={{ fov: 25, position: [0, 0, 10], near: 0.1, far: 200 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[3, 5, 4]}
          intensity={1.0}
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.5} />
        <directionalLight position={[-2, -2, -2]} intensity={0.2} />

        <group position={[0, 0, 0]} onClick={() => setIsOn(!isOn)}>
          <RoundedBox
            args={[FRAME_WIDTH, FRAME_HEIGHT, FRAME_DEPTH]}
            radius={FRAME_RADIUS}
            smoothness={10}
            castShadow
            receiveShadow
          >
            <meshStandardMaterial
              color={COLOR_FRAME}
              roughness={0.9}
              metalness={0.1}
            />
          </RoundedBox>
          <RoundedBox
            args={[FRAME_WIDTH, FRAME_HEIGHT, FRAME_DEPTH + 1.61]}
            radius={1}
            smoothness={15}
            position={[0, 0, -FRAME_DEPTH]}
            receiveShadow
          >
            <primitive object={trackPaintMaterial} attach="material" />
            <TrackUpdater material={trackPaintMaterial} xPosSpring={xPos} />
          </RoundedBox>
          <a.mesh
            position-x={xPos}
            rotation-y={rotationY}
            position-z={-FRAME_DEPTH / 2 + BALL_RADIUS * 0.5 + 0.1}
            castShadow
          >
            <Sphere args={[BALL_RADIUS, 64, 64]}>
              <primitive object={ballSplitMaterial} attach="material" />
            </Sphere>
          </a.mesh>
        </group>
      </Canvas>
    </div>
  );
}

export default ToggleSwitch;
