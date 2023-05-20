import React from 'react';
import './HomePage.scss'
import VideoHomePage from '../../assets/video-homepage.mp4'
import { useTranslation } from 'react-i18next';

const HomePage = () => {
    const { t } = useTranslation();
    return (
        <div className='homepage-container'>
            <div>
                <video autoPlay muted loop
                    style={{ width: '100vw', position: 'fixed', bottom: '-50px' }}>
                    <source src={VideoHomePage} type='video/mp4' />
                </video>
            </div>
            <div className='homepage-content'>
                <div className='title-1'> {t('homepage.title1')}</div>
                <div className='title-2'>You don't want to make a boring form.
                    And your audience won't answer one. Create a typeform instead—and make everyone happy.</div>
                <div><button className='btn-started'>Get started - it's free</button></div>
            </div>
        </div>
    )
}

export default HomePage