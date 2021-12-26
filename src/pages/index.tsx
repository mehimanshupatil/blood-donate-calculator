import * as React from 'react';
import { Homepage } from '../components/Homepage';
import SEO from '../components/seo';

const IndexPage = () => {
  return (
    <>
      <SEO title='home' />
      <Homepage />
    </>
  );
};

export default IndexPage;
