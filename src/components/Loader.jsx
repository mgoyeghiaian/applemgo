import { Html } from '@react-three/drei';
import { appleImg } from '/src/utils/index.js'
const Loader = () => {

  return (
    <Html>
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-zinc flex items-center justify-center border-t-gray-300 rounded-full">
          <img src={appleImg} alt="Loading..." className="animate-ping" style={{ fill: 'currentColor', height: '1em', width: '1em' }} />
        </div>
      </div>
    </Html>
  );
};

export default Loader;
