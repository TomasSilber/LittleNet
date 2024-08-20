import React from 'react';
import '../styles/footer.css';
import { FaInstagram, FaWhatsapp, FaLinkedin } from 'react-icons/fa'; 

const Footer = () => {
    return (
        <footer className="footer">
            <div className="social-icons">
                <a href="https://www.instagram.com/littlenet_reparaciones/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram />
                </a>
                <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
                    <FaWhatsapp />
                </a>
                <a href="https://www.linkedin.com/in/martin-little-48138a190/" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
