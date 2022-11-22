import React from 'react';
import Layout from './Layout';

const AboutPage = () => {
  return (
    <Layout>
      <span>🐢🐢🐢🐢🐢🐢🐢</span>
      <div className='buttons'>
        <a className='button button-filled' href='https://wasp-lang.dev/docs' target='_blank' rel='noreferrer noopener'>
          Take the Tutorial
        </a>
        <a
          className='button button-outline'
          href='https://discord.com/invite/rzdnErX'
          target='_blank'
          rel='noreferrer noopener'
        >
          Chat on Discord
        </a>
      </div>
    </Layout>
  );
};
export default AboutPage;
