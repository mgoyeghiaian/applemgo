import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { heroVideo, smallHeroVideo } from '/src/utils';

const Hero = () => {
  const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo);
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

  useEffect(() => {
    const videoElement = document.querySelector('video');
    const playVideo = async () => {
      try {
        await videoElement.play();
        setPlaybackFailed(false);
      } catch (error) {
        setPlaybackFailed(true);
      }
    };
    videoElement.oncanplaythrough = playVideo;
    videoElement.load();
    return () => {
      videoElement.oncanplaythrough = null;
    };
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
        <p id="hero" className="hero-title">iPhone 15 Pro</p>
        <div className="md:w-10/12 w-9/12">
          <video
            autoPlay
            muted
            playsInline
            preload="auto"
            key={videoSrc}
            className="pointer-events-none"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
          {playbackFailed && (
            <button onClick={() => document.querySelector('video').play()} className="btn">
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
