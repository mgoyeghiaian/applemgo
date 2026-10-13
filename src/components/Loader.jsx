import { Html } from '@react-three/drei';
import { appleImg } from '/src/utils/index.js'

export const Spinner = () => (
  <div className="relative w-20 h-20 flex items-center justify-center">
    <div className="absolute inset-0 rounded-full border-4 border-white/15 border-t-white animate-spin" />
    <img src={appleImg} alt="Loading..." className="w-7 h-7" />
  </div>
);

// Used as a Suspense fallback inside the three.js canvas
const Loader = () => (
  <Html center>
    <Spinner />
  </Html>
);

export default Loader;
