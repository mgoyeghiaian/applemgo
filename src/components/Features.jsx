import { useGSAP } from '@gsap/react'
import { useEffect, useRef } from 'react'
import { animateWithGsap } from '../utils/animations'
import { explore1Img, explore2Img, exploreVideo } from '../utils'
import gsap from 'gsap'
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);


const Features = () => {
  const videoRef = useRef();

  useEffect(() => {
    // Setting up ScrollTrigger for the video playback
    ScrollTrigger.create({
      trigger: '#exploreVideo',
      start: 'top 75%', // Triggers when the top of the video is 75% from the top of the viewport
      end: 'bottom top-=50',
      onEnter: () => videoRef.current && videoRef.current.play(),
      onLeave: () => videoRef.current && videoRef.current.pause(),
      onEnterBack: () => videoRef.current && videoRef.current.play(),
      onLeaveBack: () => videoRef.current && videoRef.current.pause(),
    });

    // Animate the title and elements to enter the viewport earlier
    gsap.fromTo('#features_title',
      { y: 30, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, ease: 'power2.out',
        scrollTrigger: {
          trigger: '#features_title',
          start: 'top 80%', // Adjust this to trigger the animation earlier
          toggleActions: 'play none none none'
        }
      });

    // General animations for growing elements
    gsap.fromTo('.g_grow',
      { scale: 0.95, opacity: 0 },
      {
        scale: 1, opacity: 1, duration: 1.5, ease: 'power1.out',
        scrollTrigger: {
          trigger: '.feature-video-container',
          start: 'top bottom-=150', // Start earlier for smaller screens
          toggleActions: 'play none none none',
          scrub: 1
        }
      });

    // Text animations for feature descriptions
    const textAnim = (element, delay = 0) => gsap.fromTo(element,
      { y: 50, opacity: 0 },
      {
        y: 0, opacity: 1, duration: 1, delay, ease: 'power2.inOut',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%', // Start the animation earlier as the element comes into view
          toggleActions: 'play none none none'
        }
      });

    textAnim('.g_text');
    textAnim('.g_text2', 0.2);  // Slightly delayed start for the second text block

  }, []);

  return (
    <section className='h-full common-padding bg-zinc relative overflow-hidden'>
      <div className='screen-max-width'>
        <div className='mb-12 w-full'>
          <h1 id='features_title' className='section-heading'>Explore the full story.</h1>
          <div className='flex flex-col justify-center items-center overflow-hidden'>
            <div className='mt-32 mb-24 lg:pl-24'>
              <h2 className='text-5xl lg:text-7xl font-semibold'>iPhone</h2>
              <h2 className='text-5xl lg:text-7xl font-semibold'>Forged in titanium.</h2>
            </div>
            <div className='flex-center flex-col sm:px-10'>
              <div className='relative h-[50vh] w-full flex items-center'>
                <video playsInline id='exploreVideo' className='w-full h-full object-cover object-center' preload='none' muted autoPlay ref={videoRef}>
                  <source src={exploreVideo} type='video/mp4' />
                </video>
              </div>
              <div className='flex flex-col w-full relative'>
                <div className='feature-video-container'>
                  <div className='overflow-hidden flex-1 h-[50vh]'>
                    <img src={explore1Img} alt='titanium' className='feature-video g_grow' />
                  </div>
                  <div className='overflow-hidden flex-1 h-[50vh]'>
                    <img src={explore2Img} alt='titanium2' className='feature-video g_grow' />
                  </div>
                </div>
                <div className='feature-text-container'>
                  <div className='flex-1 flex-center'>
                    <p className='feature-text g_text w-[60%]'>
                      iPhone 15pro is {` `}
                      <span className='text-white'>
                        the first iPhone to feature an aerospace‑grade titanium design
                      </span>
                      ,using the same alloy that spacecraft use for missions to Mars.
                    </p>
                  </div>
                  <div className='flex-1 flex-center'>
                    <p className='feature-text g_text2 w-[60%]'>
                      Titanium has one of the best strength‑to‑weight ratios of any metal, making these our {` `}
                      <span className='text-white'>
                        lightest Pro models ever
                      </span>
                      . You’ll notice the difference the moment you pick one up.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;