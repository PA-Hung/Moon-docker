import React from 'react'
import testimonial1 from '../../../assets/img/testimonial-1.jpg'
import testimonial2 from '../../../assets/img/testimonial-2.jpg'
import testimonial3 from '../../../assets/img/testimonial-3.jpg'

const Testimonial = () => {
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
                        <h1 className="mb-3">Our Clients Say!</h1>
                        <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                    </div>
                    <div className="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
                        <div className="testimonial-item bg-light rounded p-5">
                            <p className="fs-5">Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos</p>
                            <div className="d-flex align-items-center bg-white me-n5" style={{ borderRadius: "50px 0 0 50px" }}>
                                <img className="img-fluid flex-shrink-0 rounded-circle" src={testimonial1} style={{ width: "90px", height: "90px" }} alt='testimonial-1' />
                                <div className="ps-3">
                                    <h3 className="mb-1">Client Name</h3>
                                    <span>Profession</span>
                                </div>
                                <i className="fa fa-quote-right fa-3x text-primary ms-auto d-none d-sm-flex"></i>
                            </div>
                        </div>
                        <div className="testimonial-item bg-light rounded p-5">
                            <p className="fs-5">Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos</p>
                            <div className="d-flex align-items-center bg-white me-n5"
                                style={{ borderRadius: "50px 0 0 50px" }}
                            >
                                <img className="img-fluid flex-shrink-0 rounded-circle" src={testimonial2} alt='testimonial-2'
                                    style={{ width: "90px", height: "90px" }}
                                />
                                <div className="ps-3">
                                    <h3 className="mb-1">Client Name</h3>
                                    <span>Profession</span>
                                </div>
                                <i className="fa fa-quote-right fa-3x text-primary ms-auto d-none d-sm-flex"></i>
                            </div>
                        </div>
                        <div className="testimonial-item bg-light rounded p-5">
                            <p className="fs-5">Tempor stet labore dolor clita stet diam amet ipsum dolor duo ipsum rebum stet dolor amet diam stet. Est stet ea lorem amet est kasd kasd erat eos</p>
                            <div className="d-flex align-items-center bg-white me-n5"
                                style={{ borderRadius: "50px 0 0 50px" }}
                            >
                                <img className="img-fluid flex-shrink-0 rounded-circle" src={testimonial3} style={{ width: "90px", height: "90px" }} alt='testimonial-3' />
                                <div className="ps-3">
                                    <h3 className="mb-1">Client Name</h3>
                                    <span>Profession</span>
                                </div>
                                <i className="fa fa-quote-right fa-3x text-primary ms-auto d-none d-sm-flex"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Testimonial