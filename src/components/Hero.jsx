import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '/src/utils';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
  const videoRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playbackFailed, setPlaybackFailed] = useState(false);

  const handleVideoSrcSet = () => {
    if (window.innerWidth < 760) {
      setVideoSrc(smallHeroVideo);
    } else {
      setVideoSrc(heroVideo);
    }
  };

  useEffect(() => {
    const handleResize = () => handleVideoSrcSet();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useGSAP(() => {
    gsap.to("#hero", {
      opacity: 1,
      delay: 2,
    });
    gsap.to("#cta", {
      opacity: 1,
      y: -50,
      delay: 2,
    });
  }, []);

  // autoPlay handles the normal case; only surface a button if the browser blocks it
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;
    const tryPlay = () => {
      videoElement.play().then(() => setPlaybackFailed(false)).catch(() => setPlaybackFailed(true));
    };
    if (videoElement.readyState >= 3) tryPlay();
    videoElement.addEventListener('canplay', tryPlay, { once: true });
    return () => videoElement.removeEventListener('canplay', tryPlay);
  }, [videoSrc]);

  const handleSmoothScroll = (event) => {
    event.preventDefault(); // Prevent default anchor click behavior
    const targetId = event.currentTarget.getAttribute("href").slice(1); // Remove the '#' from the href
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full nav-height bg-black relative">
      <div className="h-5/6 w-full flex-col flex-center">
        <h1 id="hero" className="hero-title">iPhone 15 Pro</h1>
        <div className="md:w-10/12 w-9/12 relative aspect-video">
          {!ready && <div className="skeleton absolute inset-0 rounded-3xl" aria-hidden="true" />}
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            preload="auto"
            key={videoSrc}
            onLoadedData={() => setReady(true)}
            className={`pointer-events-none w-full h-full media-fade ${ready ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {playbackFailed && (
            <button onClick={() => videoRef.current?.play()} className="btn">
              Play Video
            </button>
          )}
        </div>
      </div>
      <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
        <a href="#highlights" className="btn" onClick={handleSmoothScroll}>
          Buy
        </a>
        <p className="font-normal text-xl">
          From $999 or $41.62/mo. for 24 mo.
        </p>
      </div>
    </section>
  );
};

export default Hero;
