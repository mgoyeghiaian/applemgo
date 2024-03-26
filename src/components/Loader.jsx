import { Html } from '@react-three/drei';

const Loader = () => {
  // Assuming '/public/assets/images/apple.svg' is accessible via a public URL path
  const logoUrl = '/public/assets/images/apple.svg'; // Adjust the path as needed based on how your app serves static files

  return (
    <Html>
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-zinc flex items-center justify-center border-t-gray-300 rounded-full">
          {/* Use img tag to load the SVG */}
          <img src={logoUrl} alt="Loading..." className="animate-ping" style={{ fill: 'currentColor', height: '1em', width: '1em' }} />
        </div>
      </div>
    </Html>
  );
};

export default Loader;
