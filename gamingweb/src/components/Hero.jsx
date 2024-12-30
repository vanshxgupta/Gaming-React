import { TiLocationArrow } from "react-icons/ti";
import React, { useEffect, useState, useRef } from 'react';
import Button from "./Button";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
    // Change karne ke liye track rkhna padega konsi video chl rahi hai 
    const [currentindex, setcurrentindex] = useState(1);
    const [hasclicked, sethasclicked] = useState(false);
    const [isloading, setisloading] = useState(true);
    const [loadedvideos, setloadedvideos] = useState(0);

    const totalvideos = 4;
    // useRef tabh use krte hai jab humne kisi specific DOM element ko target krna hota hai, idhr video frame ko target kr rahe hai 
    const nextvideoref = useRef([]);

    // Video change karne ke liye function
    const handleminivideoclick = () => {
        sethasclicked(true);
        setcurrentindex((previndex) => (previndex % totalvideos) + 1);
    };

    const upcomingVideoindex = (currentindex % totalvideos) + 1;

    const handleVideoLoaded = () => {
        setloadedvideos((prevloadedvideos) => prevloadedvideos + 1);
    };

    useEffect(() => {
        if (loadedvideos === totalvideos - 1) {
            setisloading(false);
        }
    }, [loadedvideos]);

    // BG change cool effect zoom-in animation hora hai change hote hote
    useGSAP(() => {
        if (hasclicked) {
            gsap.set('#next-video', { visibility: 'visible' });
            gsap.to('#next-video', {
                transformOrigin: 'center center',
                scale: 1,
                width: '100%',
                height: '100%',
                duration: 1,
                ease: 'power1.inOut',
                onStart: () => nextvideoref.current.play(),
            });

            gsap.from('#current-video', {
                transformOrigin: 'center center',
                scale: 0,
                duration: 1.5,
                ease: 'power1.inOut',
            });
        }
    }, { dependencies: [currentindex], revertOnUpdate: true });

    useGSAP(() => {
        gsap.set('#video-frame', {
            clipPath: 'polygon(20% 0%, 70% 0%, 95% 90%, 0% 100%)',
            borderRadius: '0% 0% 40% 10%',
        });

        gsap.from('#video-frame', {
            clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            borderRadius: '0% 0% 0% 0%',
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: "#video-frame",
                start: "center center",
                end: 'bottom center',
                scrub: true,
            },
        });
    });

    const getvideosrc = (index) => `videos/hero-${index}.mp4`;

    return (
        <div className='relative-h-dvh w-screen overflow-x-hidden'>
            {isloading && (
                <div className="flex-center absolute-z-[100] h-dvh w-screen overflow-hidden bg-violet-50">
                    {/* Three-body dot, loading animation hai jab tak video load nahi hoti vo dikhega screen pr */}
                    {/* https://uiverse.io/G4b413l/tidy-walrus-92 */}
                    <div className="three-body">
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                        <div className="three-body__dot" />
                    </div>
                </div>
            )}

            <div id="video-frame" className='relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75'>
                <div>
                    <div className='mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg'>
                        <div onClick={handleminivideoclick} className='origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100'>
                            <video
                                ref={nextvideoref}
                                src={getvideosrc(upcomingVideoindex)}
                                loop
                                muted
                                id="current-video"
                                className='size-64 origin-center scale-150 object-cover object-center'
                                onLoadedData={handleVideoLoaded}
                            />
                        </div>
                    </div>

                    {/* Background video player */}
                    <video
                        ref={nextvideoref}
                        src={getvideosrc(currentindex)}
                        loop
                        muted
                        id="next-video"
                        className='absolute-center invisible absolute z-20 size-64 object-cover object-center'
                        onLoadedData={handleVideoLoaded}
                    />

                    {/* Zoom in effect */}
                    <video
                        src={getvideosrc(currentindex)}
                        autoPlay
                        loop
                        muted
                        className='absolute left-0 top-0 size-full object-cover object-center'
                        onLoadedData={handleVideoLoaded}
                    />
                </div>

                <h1 className="special-font hero-heading absolute bottom-5 right-5 z-40 text-blue-75">
          G<b>A</b>MING
        </h1>

        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="special-font hero-heading text-blue-100">
              redefi<b>n</b>e
            </h1>

            <p className="mb-5 max-w-64 font-robert-regular text-blue-100">
              Enter the Metagame Layer <br /> Unleash the Play Economy
            </p>

            <Button
              id="watch-trailer"
              title="Watch trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="bg-yellow-300 flex-center gap-1"
            />
          </div>
        </div>
      </div>

      <h1 className="special-font hero-heading absolute bottom-5 right-5 text-black">
        G<b>A</b>MING
      </h1>
    </div>
  );
}

export default Hero;