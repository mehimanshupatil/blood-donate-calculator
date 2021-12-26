import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { useLocation } from '@reach/router';

const SEO = ({ title, description, image }) => {
  const { pathname } = useLocation();

  const seo = {
    title: title || 'Blood Donation Calculator',
    description: description || 'A simple blood donation calculator',
    image: image || '/images/icon.png',
    url: pathname,
  };

  return (
    <Helmet title={seo.title} titleTemplate={'%s - Blood Donation Calculator'}>
      <meta name='description' content={seo.description} />
      <meta name='image' content={seo.image} />

      {seo.url && <meta property='og:url' content={seo.url} />}

      {seo.title && <meta property='og:title' content={seo.title} />}

      {seo.description && <meta property='og:description' content={seo.description} />}

      {seo.image && <meta property='og:image' content={seo.image} />}

      <meta name='twitter:card' content='summary_large_image' />

      <meta name='twitter:creator' content='@mehimanshupatil' />

      {seo.title && <meta name='twitter:title' content={seo.title} />}

      {seo.description && <meta name='twitter:description' content={seo.description} />}

      {seo.image && <meta name='twitter:image' content={seo.image} />}
    </Helmet>
  );
};

export default SEO;

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
};

SEO.defaultProps = {
  title: null,
  description: null,
  image: null,
};
