import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { logEvent } from '../middleware/logger';

const RedirectHandler = ({ urls }) => {
  const { shortcode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const match = urls.find((u) => u.id === shortcode);
    if (match) {
      const now = new Date();
      const expiry = new Date(match.expiry);
      if (now > expiry) {
        alert('This link has expired.');
        navigate('/');
      } else {
        match.clicks.push({ time: new Date().toISOString(), source: 'local', geo: 'IN' });
        logEvent('URL_CLICKED', { id: shortcode });
        window.location.href = match.longUrl;
      }
    } else {
      alert('Invalid shortcode');
      navigate('/');
    }
  }, [shortcode, urls, navigate]);

  return <div>Redirecting...</div>;
};

export default RedirectHandler;
