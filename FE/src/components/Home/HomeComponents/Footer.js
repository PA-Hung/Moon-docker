import React from 'react'
import classes1 from '../../../assets/img/classes-1.jpg'
import classes2 from '../../../assets/img/classes-2.jpg'
import classes3 from '../../../assets/img/classes-3.jpg'
import classes4 from '../../../assets/img/classes-4.jpg'
import classes5 from '../../../assets/img/classes-5.jpg'
import classes6 from '../../../assets/img/classes-6.jpg'

const Footer = () => {
    return (
        <>
            <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-3 col-md-6">
                            <h3 className="text-white mb-4">Get In Touch</h3>
                            <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>123 Street, New York, USA</p>
                            <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+012 345 67890</p>
                            <p className="mb-2"><i className="fa fa-envelope me-3"></i>info@example.com</p>
                            <div className="d-flex pt-2">
                                <a className="btn btn-outline-light btn-social" href="/"><i className="fab fa-twitter"></i></a>
                                <a className="btn btn-outline-light btn-social" href="/"><i className="fab fa-facebook-f"></i></a>
                                <a className="btn btn-outline-light btn-social" href="/"><i className="fab fa-youtube"></i></a>
                                <a className="btn btn-outline-light btn-social" href="/"><i className="fab fa-linkedin-in"></i></a>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h3 className="text-white mb-4">Quick Links</h3>
                            <a className="btn btn-link text-white-50" href="/">About Us</a>
                            <a className="btn btn-link text-white-50" href="/">Contact Us</a>
                            <a className="btn btn-link text-white-50" href="/">Our Services</a>
                            <a className="btn btn-link text-white-50" href="/">Privacy Policy</a>
                            <a className="btn btn-link text-white-50" href="/">Terms & Condition</a>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h3 className="text-white mb-4">Photo Gallery</h3>
                            <div className="row g-2 pt-2">
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={classes1} alt="classes1" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={classes2} alt="classes2" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={classes3} alt="classes3" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={classes4} alt="classes4" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={classes5} alt="classes5" />
                                </div>
                                <div className="col-4">
                                    <img className="img-fluid rounded bg-light p-1" src={classes6} alt="classes6" />
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-6">
                            <h3 className="text-white mb-4">Newsletter</h3>
                            <p>Dolor amet sit justo amet elitr clita ipsum elitr est.</p>
                            <div className="position-relative mx-auto" style={{ maxWidth: "400px" }}>
                                <input className="form-control bg-transparent w-100 py-3 ps-4 pe-5" type="text" placeholder="Your email" />
                                <button type="button" className="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2">SignUp</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="copyright">
                        <div className="row">
                            <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                                &copy; <a href="/">Moon English</a>, All Right Reserved.
                                Designed By <a href="https://chauhomestay.com">Hero</a>
                            </div>
                            <div className="col-md-6 text-center text-md-end">
                                <div className="footer-menu">
                                    <a href="/">Home</a>
                                    <a href="/">Cookies</a>
                                    <a href="/">Help</a>
                                    <a href="/">FQAs</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer