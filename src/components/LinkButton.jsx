import React from 'react';
import './LinkButton.css';

const LinkButton = ({ text, subtext, href, icon, delay = 0, variant = 'primary' }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={`link-button link-button--${variant} animate-fade-in`}
            style={{ animationDelay: `${delay}s` }}
        >
            {icon && <span className="link-button-icon">{icon}</span>}
            <div className="link-button-content">
                <span className="link-button-text">{text}</span>
                {subtext && <span className="link-button-subtext">{subtext}</span>}
            </div>
        </a>
    );
};

export default LinkButton;
