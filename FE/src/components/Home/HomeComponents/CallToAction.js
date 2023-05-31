import React from 'react'
import calltoaction from '../../../assets/img/call-to-action.jpg'

const CallToAction = () => {
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="bg-light rounded">
                        <div className="row g-0">
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s" style={{ minHeight: "400px" }}>
                                <div className="position-relative h-100">
                                    <img className="position-absolute w-100 h-100 rounded"
                                        alt='call-to-action'
                                        src={calltoaction}
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                                <div className="h-100 d-flex flex-column justify-content-center p-5">
                                    <h1 className="mb-4">Become A Teacher</h1>
                                    <p className="mb-4">Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit. Aliqu diam amet diam et eos.
                                        Clita erat ipsum et lorem et sit, sed stet lorem sit clita duo justo magna dolore erat amet
                                    </p>
                                    <a className="btn btn-primary py-3 px-5" href="/">Get Started Now<i className="fa fa-arrow-right ms-2"></i></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CallToAction