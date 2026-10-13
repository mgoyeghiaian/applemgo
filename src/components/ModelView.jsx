import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import Lights from "./Lights"
import { Suspense, useEffect, useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from 'three'
import IPhone from "./IPhone"
import Loader from "./Loader"

// Tilts the phone slightly toward the cursor (desktop only)
const Parallax = ({ children }) => {
  const ref = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.x += (mouse.current.y * 0.12 - ref.current.rotation.x) * 0.06;
    ref.current.rotation.z += (-mouse.current.x * 0.06 - ref.current.rotation.z) * 0.06;
  });
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return <group ref={ref}>{children}</group>;
};

const ModelView = ({ index, groupRef, gsapType, controlRef, size, item, setRotationState }) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full absolute h-full
       ${index === 2 ? 'right-[-100%]' : ''} `}
    >

      <ambientLight intensity={0.4} />

      <PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlRef}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlRef.current.getAzimuthalAngle())}
      />
      <group ref={groupRef} name={`${index === 1}?'small':'large'`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={
          <Loader />}>
          <Parallax>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
          </Parallax>
        </Suspense>
      </group>
    </View >
  )
}

export default ModelView