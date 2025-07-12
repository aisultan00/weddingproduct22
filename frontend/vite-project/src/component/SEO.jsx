import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  author = 'Your Name'
}) => {
  const siteName = 'Қазақтың тойы';
  const fullTitle = title ? `${title} - ${siteName}` : siteName;
  const defaultDescription = 'Қазақтың тойын онлайн ұйымдастырыңыз, қонақтарыңызды оңай шақырыңыз, жауап алыңыз және естеліктерді сақтаңыз.';
  const defaultImage = '/og-image.jpg'; // Добавьте изображение в public папку

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || 'Қазақтың тойы, онлайн шақыру, қонақтар, естеліктер, QR-код, WhatsApp'} />
      <meta name="author" content={author} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url || window.location.href} />
      <meta property="og:image" content={image || defaultImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="kk_KZ" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
      
      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url || window.location.href} />
      
      {/* Language and Region */}
      <meta httpEquiv="Content-Language" content="kk" />
      <meta name="geo.region" content="KZ" />
      
      {/* Mobile App Meta Tags */}
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#7C4DFF" />
      <meta name="msapplication-TileColor" content="#7C4DFF" />
    </Helmet>
  );
};

export default SEO; 