import { useEffect, useRef, useState } from 'react';

// Renders `fallback` until the placeholder is near the viewport, then mounts children.
// Keeps heavy things (three.js canvas, GLB, textures) from competing with first paint.
const LazyMount = ({ children, fallback, rootMargin = '1500px' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        io.disconnect();
      }
    }, { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [visible, rootMargin]);

  return visible ? children : <div ref={ref}>{fallback}</div>;
};

export default LazyMount;
