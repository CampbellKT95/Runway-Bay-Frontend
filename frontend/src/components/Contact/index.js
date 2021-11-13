import React from 'react'
import EmailIcon from '@mui/icons-material/Email';
import GitHubIcon from '@mui/icons-material/GitHub';

const Contact = () => {
    return (
    <div className="contact">
        <h4>Kadin Campbell</h4>
        <a href="mailto:ktcampbelldevelopment@gmail.com" className="mail">
            <EmailIcon className="mail-icon" />
        </a>
        <a href="https://github.com/CampbellKT95" className="github">
            <GitHubIcon className="github-icon" />
        </a>
    </div>
    )
}

export default Contact;


