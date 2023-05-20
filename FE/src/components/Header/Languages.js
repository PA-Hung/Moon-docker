import React from 'react'
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';

const Languages = (props) => {
    // eslint-disable-next-line
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <>
            <NavDropdown title={i18n.language === 'vi' ? 'VI' : 'EN'} id="language-nav-dropdown">
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>EN</NavDropdown.Item>
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>VI</NavDropdown.Item>
            </NavDropdown>
        </>
    )
}

export default Languages