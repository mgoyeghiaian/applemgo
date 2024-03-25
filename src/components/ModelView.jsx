import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei"
import Lights from "./Lights"
import { Suspense } from "react"
import * as THREE from 'three'
import IPhone from "./IPhone"
import Loader from "./Loader"
const ModelView = ({ index, groupRef, gsapType, controlREf, size, item, setRotationState }) => {
  return (
    <View
      index={index}
      id={gsapType}
      className={`w-full absolute h-full
       ${index === 2 ? 'right-[-100%]' : ''} `}
    >
      {/*AMbient Light*/}

      <ambientLight intensity={0.3} />

      {/*Camera */}

      < PerspectiveCamera makeDefault position={[0, 0, 4]} />
      <Lights />
      <OrbitControls
        makeDefault
        ref={controlREf}
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        target={new THREE.Vector3(0, 0, 0)}
        onEnd={() => setRotationState(controlREf.current.getAzimuthalAngle())}
      />
      <group ref={groupRef} name={`${index === 1}?'small':'large'`}
        position={[0, 0, 0]}
      >
        <Suspense fallback={
          <Loader />}>
          <IPhone
            scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
            item={item}
            size={size}
          />
        </Suspense>
      </group>
    </View >)
}

export default ModelView