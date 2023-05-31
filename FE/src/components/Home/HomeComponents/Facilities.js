import React from 'react'

const Facilities = () => {
    return (
        <>
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" style={{ maxWidth: "600px" }}>
                        <h1 className="mb-3">School Facilities</h1>
                        <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed rebum vero dolor duo.</p>
                    </div>
                    <div className="row g-4">
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="facility-item">
                                <div className="facility-icon bg-primary">
                                    <span className="bg-primary"></span>
                                    <i className="fa fa-bus-alt fa-3x text-primary"></i>
                                    <span className="bg-primary"></span>
                                </div>
                                <div className="facility-text bg-primary">
                                    <h3 className="text-primary mb-3">School Bus</h3>
                                    <p className="mb-0">Eirmod sed ipsum dolor sit rebum magna erat lorem kasd vero ipsum sit</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="facility-item">
                                <div className="facility-icon bg-success">
                                    <span className="bg-success"></span>
                                    <i className="fa fa-futbol fa-3x text-success"></i>
                                    <span className="bg-success"></span>
                                </div>
                                <div className="facility-text bg-success">
                                    <h3 className="text-success mb-3">Playground</h3>
                                    <p className="mb-0">Eirmod sed ipsum dolor sit rebum magna erat lorem kasd vero ipsum sit</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="facility-item">
                                <div className="facility-icon bg-warning">
                                    <span className="bg-warning"></span>
                                    <i className="fa fa-home fa-3x text-warning"></i>
                                    <span className="bg-warning"></span>
                                </div>
                                <div className="facility-text bg-warning">
                                    <h3 className="text-warning mb-3">Healthy Canteen</h3>
                                    <p className="mb-0">Eirmod sed ipsum dolor sit rebum magna erat lorem kasd vero ipsum sit</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-6 wow fadeInUp" data-wow-delay="0.7s">
                            <div className="facility-item">
                                <div className="facility-icon bg-info">
                                    <span className="bg-info"></span>
                                    <i className="fa fa-chalkboard-teacher fa-3x text-info"></i>
                                    <span className="bg-info"></span>
                                </div>
                                <div className="facility-text bg-info">
                                    <h3 className="text-info mb-3">Positive Learning</h3>
                                    <p className="mb-0">Eirmod sed ipsum dolor sit rebum magna erat lorem kasd vero ipsum sit</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Facilities