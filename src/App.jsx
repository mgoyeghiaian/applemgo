import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from "./components/Hero";
import Highlights from "./components/Highlights";
import Navbar from "./components/Navbar";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Footer from "./components/Footer";
import { Spinner } from './components/Loader';
import LazyMount from './components/LazyMount';

// three.js and react-player are heavy; load them off the critical path
const loadModel = () => import('./components/Model');
const Model = lazy(loadModel);
const VideoPage = lazy(() => import('./components/VideoPage'));

const Fallback = () => (
  <div className="flex-center w-full min-h-[50vh] bg-black">
    <Spinner />
  </div>
);

const ModelSkeleton = () => (
  <section className="common-padding">
    <div className="screen-max-width">
      <div className="skeleton h-10 w-2/3 md:w-1/3 rounded-xl" />
      <div className="skeleton mt-8 h-[75vh] md:h-[90vh] w-full rounded-3xl flex-center">
        <Spinner />
      </div>
    </div>
  </section>
);

const App = () => {
  // Start fetching the 3D chunk + GLB as soon as the browser is idle, so it is
  // ready by the time the user scrolls down to it.
  useEffect(() => {
    const start = () => loadModel();
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <Routes>
      <Route path="/" element={

        <main className="bg-black body">
          <Navbar />
          <Hero />
          <Highlights />
          <LazyMount fallback={<ModelSkeleton />}>
            <Suspense fallback={<ModelSkeleton />}>
              <Model />
            </Suspense>
          </LazyMount>
          <Features />
          <HowItWorks />
          <Footer />
        </main>
      } />
      <Route path="/watch-video" element={<Suspense fallback={<Fallback />}><VideoPage /></Suspense>} />
    </Routes>
  );
}

export default App;
