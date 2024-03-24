import { useState,useRef,useContext } from "react";
import { bannerContext } from "./App";
import Carousel from 'react-bootstrap/Carousel';
import "./Banner.css";


const Banner = () => {
    const bannerRef=useContext(bannerContext);
    return (
        <>
            <section ref={bannerRef} className="banner-section">
                <Carousel className="carousel" data-bs-theme="light">
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="images/carousel1.jpeg"
                            alt="First slide"
                        />
                        <Carousel.Caption>
                            <h5>First slide label</h5>
                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="images/carousel2.jpeg"
                            alt="Second slide"
                        />
                        <Carousel.Caption>
                            <h5>Second slide label</h5>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="images/carousel3.jpeg"
                            alt="Third slide"
                        />
                        <Carousel.Caption>
                            <h5>Third slide label</h5>
                            <p>
                                Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </section>
        </>
    )
}

export default Banner;