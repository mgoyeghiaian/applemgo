import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { watchImg, rightImg } from "/src/utils"
import VideoCarousel from "./VideoCarousel"
import { useNavigate } from 'react-router-dom';


const Highlights = () => {
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.to("#title", {
      opacity: 1,
      y: 0,
    })
    gsap.to(".link", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: true,
    })
  }, [])
  return (
    <section id="highlights" className="w-screen overflow-hidden h-full common-padding bg-zinc">
      <div className="screen-max-width">
        <div className="mb-12 w-full items-end justify-between md:flex">
          <h1 id="title" className="section-heading">
            Get the highlights.
          </h1>
          <div className="flex flex-wrap items-end gap-5">
            <a
              href="/watch-video"
              target="_blank" className="link"
            >
              Watch the film
              <img src={watchImg} alt="Watch" className="ml-2" />
            </a>
            <a href="https://www.apple.com/apple-events/" target="_blank" className="link">
              Watch the event
              <img src={rightImg} alt="Watch" className="ml-2" />
            </a>
          </div>
        </div>
        <VideoCarousel />
      </div>
    </section>
  )
}

export default Highlights