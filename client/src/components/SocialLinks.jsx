import React from 'react';
import './SocialLinks.css';

// Social media icons
import githubIcon from '../assets/github.svg';
import linkedinIcon from '../assets/linkedin.svg';
import instagramIcon from '../assets/instagram.svg';
import portfolioIcon from '../assets/portfolio.svg';

const SocialLinks = ({ user }) => {
  if (!user) return null;
  
  const { github_url, linkedin_url, instagram_url, portfolio_url } = user;
  
  // Only show links that the user has provided
  const hasLinks = github_url || linkedin_url || instagram_url || portfolio_url;
  
  if (!hasLinks) return null;
  
  return (
    <div className="social-links">
      {github_url && (
        <a href={github_url} target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
          <img src={githubIcon} alt="GitHub" className="social-icon" />
        </a>
      )}
      
      {linkedin_url && (
        <a href={linkedin_url} target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
          <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
        </a>
      )}
      
      {instagram_url && (
        <a href={instagram_url} target="_blank" rel="noopener noreferrer" className="social-link" title="Instagram">
          <img src={instagramIcon} alt="Instagram" className="social-icon" />
        </a>
      )}
      
      {portfolio_url && (
        <a href={portfolio_url} target="_blank" rel="noopener noreferrer" className="social-link" title="Portfolio">
          <img src={portfolioIcon} alt="Portfolio" className="social-icon" />
        </a>
      )}
    </div>
  );
};

export default SocialLinks;
