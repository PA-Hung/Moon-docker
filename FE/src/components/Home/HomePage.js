import React from 'react';
import '../../styles/styles.scss'
//import { useTranslation } from 'react-i18next';
import Spinner from './HomeComponents/Spinner'
import HomeNavbar from './HomeComponents/HomeNavbar'
import Carousel from './HomeComponents/Carousel'
import Facilities from './HomeComponents/Facilities'
import About from './HomeComponents/About'
import CallToAction from './HomeComponents/CallToAction'
import Classes from './HomeComponents/Classes'
import Appointment from './HomeComponents/Appointment'
import Team from './HomeComponents/Team'
import Testimonial from './HomeComponents/Testimonial'
import Footer from './HomeComponents/Footer'

const HomePage = () => {
  //const { t } = useTranslation();
  return (
    <div className="container-xxl bg-white p-0">
      {/*  <!-- Spinner Start --> */}
      <Spinner />
      {/*  <!-- Spinner End --> */}


      {/*  <!-- Navbar Start --> */}
      <HomeNavbar />
      {/*  <!-- Navbar End --> */}


      {/*  <!-- Carousel Start --> */}
      <Carousel />
      {/*  <!-- Carousel End --> */}


      {/*  <!-- Facilities Start --> */}
      <Facilities />
      {/*  <!-- Facilities End --> */}


      {/*  <!-- About Start --> */}
      <About />
      {/*  <!-- About End --> */}


      {/*  <!-- Call To Action Start --> */}
      <CallToAction />
      {/*  <!-- Call To Action End --> */}


      {/*  <!-- Classes Start --> */}
      <Classes />
      {/*  <!-- Classes End --> */}


      {/*  <!-- Appointment Start --> */}
      <Appointment />
      {/*  <!-- Appointment End --> */}


      {/*  <!-- Team Start --> */}
      <Team />
      {/*  <!-- Team End --> */}


      {/*  <!-- Testimonial Start --> */}
      <Testimonial />
      {/*  <!-- Testimonial End --> */}


      {/*  <!-- Footer Start --> */}
      <Footer />
      {/*  <!-- Footer End --> */}


      {/*  <!-- Back to Top --> */}
      <a href="/" className="btn btn-lg btn-primary btn-lg-square back-to-top"><i className="bi bi-arrow-up"></i></a>
    </div>
  )
}

export default HomePage