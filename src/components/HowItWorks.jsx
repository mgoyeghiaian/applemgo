import { useGSAP } from "@gsap/react"
import { chipImg, frameImg, frameVideo } from "../utils"
import gsap from "gsap"
import { useRef } from "react";
import { animateWithGsap } from "../utils/animations";
import { ScrollTrigger } from "gsap/all"
gsap.registerPlugin(ScrollTrigger);
const HowItWorks = () => {
  const videoRef = useRef();

  useGSAP(() => {
    gsap.to("#hiwVideo2", {
      scrollTrigger: {
        trigger: '#hiwVideo2',
        start: '-10% bottom',
        end: "bottom top",
        onEnter: () => {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        },
        onLeave: () => {
          videoRef.current.pause();
        },
        onEnterBack: () => {
          videoRef.current.currentTime = 0;
          videoRef.current.play();
        },
        onLeaveBack: () => {
          videoRef.current.pause();
        },
        toggleActions: 'play pause resume reset',
      },
    });

    gsap.from("#chip", {
      scrollTrigger: {
        trigger: '#chip',
        start: "20% bottom",
      },
      opacity: 0,
      scale: 2,
      duration: 2,
      ease: "power2.inOut"
    });

    animateWithGsap('.g_fadeIn:not(:last-child)', { y: 0, opacity: 1, ease: "power2.inOut", duration: 1 });
    animateWithGsap('.g_fadeIn:last-child', { y: 0, opacity: 1, ease: "power2.inOut", duration: 1, delay: 0.2 });

  }, []);

  return (
    <section className="common-padding">
      <div className="screen-max-width flex justify-center items-center flex-col">
        <div id="chip" className="flex-center w-full my-20">
          <img src={chipImg} alt="chip" width={180} height={180} />
        </div>
        <div className="flex flex-col items-center">
          <h2 className="hiw-title ">
            A17 Pro chip.{''}
            <br />
            A monster win
            for gaming.

          </h2>
          <p className="hiw-subtitle ">
            It’s here. The biggest redesign in the history of Apple GPUs.
          </p>
        </div>
        <div className="mt-10 md:mt-20 mb-14">
          <div className="relative h-full flex-center">
            <div className=" overflow-hidden">
              <img src={frameImg}
                alt="frame"
                className="bg-transparent relative z-10"
              />

            </div>
            <div className="hiw-video">

              <video className=" pointer-events-none" playsInline preload="none" id='hiwVideo2' muted autoPlay ref={videoRef}>
                <source src={frameVideo} type="video/mp4" />
              </video>
            </div>
          </div>
          <p className=" text-gray text-[17px] font-semibold text-center mt-2">Honkai: Star Rail</p>
        </div>


        <div className='hiw-text-container'>
          <div className='flex-1  flex gap-5 justify-center flex-col'>
            <p className='hiw-text g_fadeIn'>
              A17 Pro is an entirely new class of iPhone chip that delivers our {` `}
              <span className=' text-white '>
                best graphics performance by far</span>.
            </p>
            <p className='hiw-text g_fadeIn '>
              Mobile  {` `}
              <span className=' text-white'>
                games will look and feel so immersive</span>
              , with incredibly detailed environments and more realistic characters. And with industry-leading speed and efficiency, A17 Pro takes fast and runs with it.
            </p>
          </div>



          <div className="flex-1 flex justify-center flex-col g_fadeIn">
            <p className="hiw-text">New</p>
            <p className="hiw-bigtext">Pro-class GPU
            </p>
            <p className="hiw-text">with 6 cores

            </p>
          </div>
        </div>
      </div>
    </section >
  )
}

export default HowItWorks