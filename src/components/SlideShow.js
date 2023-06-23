import React, { useState, useEffect } from 'react'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

import "../styles/SliderShow.css"
import 'react-slideshow-image/dist/styles.css'
import img1 from "../images/pic1.jpeg"
import img2 from "../images/pic3.jpeg"
import img3 from "../images/pic4.jpg"



function SlideShow() {


    const SliderData = [
        {
            image: img1,
            heading: "WELCOME TO TURKEY",
            desc: "the best destination to spend the holiday and have a great memories",
            id:0
        },
        {
            image: img2,
            heading: "WELCOME TO TURKEY",
            desc: "have a look at some of the world's most important ancient monuments.  ",
            id:1
        },
        {
            image: img3,
            heading: "WELCOME TO TURKEY",
            desc: "don't forget to taste the different popular turkish foods from snacks to full meals",
            id:2
        },
    ];

    const [currentSlide, setCurrentSlide] = useState(0);
    const slideLength = SliderData.length;
    const autoScroll = true;
    let slideInterval;
    let intervalTime = 7000;

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
        console.log("next");
    };

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
        console.log("prev");
    };

    function auto() {
        slideInterval = setInterval(nextSlide, intervalTime);
    }
    useEffect(() => {
        setCurrentSlide(0);
    }, []);
    useEffect(() => {
        if (autoScroll) {
            auto();
        }
        return () => clearInterval(slideInterval);
    }, [currentSlide]);

    return (
        <div className="slider">
            <AiOutlineArrowLeft className="arrow prev" onClick={prevSlide} />
            <AiOutlineArrowRight className="arrow next" onClick={nextSlide} />
            {SliderData.map((slide, index) => {
                return (
                    <div
                        className={index === currentSlide ? "slide current" : "slide"}
                        key={slide.id}
                    >
                        {index === currentSlide && (
                            <div className='image ' style={{ backgroundImage: `url(${slide.image})` }}>
                           
                               
                                <div className="content">
                                    <h2>{slide.heading}</h2>
                                    <p>{slide.desc}</p>
                                    <hr />
                                  {/*<button className="--btn --btn-primary">Get Started</button>*/}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
export default SlideShow
