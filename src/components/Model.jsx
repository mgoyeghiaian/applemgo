import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ModelView from "./ModelView"
import { useEffect, useRef, useState } from "react";
import { yellowImg } from '/src/utils'
import * as THREE from 'three';
import { Canvas } from "@react-three/fiber";
import { View } from "@react-three/drei";
import { models, sizes } from '/src/constants'
import { animateWithGsapTimeline } from "../utils/animations";
const Model = () => {
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'style') {
          const targetElement = mutation.target;
          if (targetElement.style.touchAction === 'none') {
            targetElement.style.touchAction = 'unset';
          }
        }
      });
    });

    const rootElement = document.getElementById('root');
    if (rootElement) {
      observer.observe(rootElement, { attributes: true });
    }

    return () => observer.disconnect();
  }, []);
  const [size, setSize] = useState('small');
  const [model, setModel] = useState({
    title: "iPhone 15 Pro in Natural titanium",
    color: ['#8F8A81', '#FFE789', '#6F6C64'],
    img: yellowImg,
  });

  const cameraControlSmall = useRef();
  const cameraControlLarge = useRef();

  const small = useRef(new THREE.Group());
  const large = useRef(new THREE.Group());

  // rotation
  const [smallRotation, setSmallRotation] = useState(0);
  const [largeRotation, setLargeRotation] = useState(0);

  const timeline = gsap.timeline();

  useEffect(() => {

    if (size === 'large') {
      animateWithGsapTimeline(timeline, small, smallRotation, "#view1", "#view2", {
        transform: 'translateX(-100%)',
        duration: 2
      })
    }
    if (size === 'small') {
      animateWithGsapTimeline(timeline, large, largeRotation, "#view2", "#view1", {
        transform: 'translateX(0)',
        duration: 2
      })
    }

  }, [size])

  useGSAP(() => {
    gsap.to('#heading', { y: 0, opacity: 1, duration: 1.5 })
  }, [])

  return (
    <section className="common-padding">
      <div className=" screen-max-width">
        <h1 id="heading" className="section-heading">
          Take a closer look
        </h1>
        <div className=" felx flex-col items-center mt-5">
          <div className="w-full h-[75vh] md:h-[90vh] lg:overflow-hidden relative">

            <ModelView
              index={1}
              groupRef={small}
              gsapType="view1"
              controlRef={cameraControlSmall}
              setRotationState={setSmallRotation}
              item={model}
              size={size}
            />

            <ModelView
              index={2}
              groupRef={large}
              gsapType="view2"
              controlRef={cameraControlLarge}
              setRotationState={setLargeRotation}
              item={model}
              size={size}
            />
            <Canvas
              className="w-full h-full"
              style={{
                position: 'fixed',
                top: '0',
                bottom: '0',
                left: '0',
                right: '0',
                overflow: 'hidden',
              }}
              eventSource={document.getElementById('root')}
            >
              <View.Port />
            </Canvas>
          </div>
          <div className="mx-auto w-full">
            <p className=" text-sm font-light text-center mb-5">{model.title}</p>
            <div className=" flex-center">
              <ul className="color-container">
                {models.map((item, index) => (
                  <li key={index} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{
                    backgroundColor: item.color[0]
                  }}
                    onClick={() => setModel(item)}
                  />
                ))}
              </ul>
              <button className=" size-btn-container">
                {sizes.map(({ label, value }) => (
                  <span key={label} className="size-btn font-semibold"
                    style={
                      {
                        backgroundColor: size === value ? '#fff' : 'transparent',

                        color: size === value ? '#000' : '#fff',
                      }
                    }
                    onClick={() => setSize(value)}
                  >
                    {label}
                  </span>
                ))}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Model