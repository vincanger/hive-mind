import React from 'react';
import Layout from './Layout';

const AboutPage = () => {
  return (
    <Layout>
      <span>🐢 🐝 🐢</span>
      <div style={{ maxWidth: '75%', marginTop: '1rem', textAlign: 'center' }}>
        Example app built with Wasp to highlight Wasp's easy-to-setup:
      </div>
        <ul>
          <li>auth,</li>
          <li>state management,</li>
          <li>and async cron jobs 💪</li>
        </ul>
      <div className='buttons'>
        <a className='button button-filled' href='https://wasp-lang.dev/docs' target='_blank' rel='noreferrer noopener'>
          Find More Tutorials
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
