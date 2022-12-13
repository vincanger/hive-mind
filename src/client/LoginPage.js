import React from 'react';
import { googleSignInUrl } from '@wasp/auth/buttons/Google';
import useAuth from '@wasp/auth/useAuth.js';
import logout from '@wasp/auth/logout.js';
import Layout from './Layout';

const LoginPage = () => {
  const { data: user, isLoading } = useAuth();

  if (!user) {
    return (
      <Layout>
        <a href={googleSignInUrl}>
          <button disabled={isLoading} className='button button-outline'>Sign in with Google</button>
        </a>
      </Layout>
    );
  } else {
    return (
      <Layout>
        <button className='button button-outline' style={{ padding: '1rem 4rem' }} onClick={() => logout()}>
          Sign Out
        </button>
        {user && (
          <p>
            You're signed in with <strong>username: {user.username}</strong>
          </p>
        )}
      </Layout>
    );
  }
};

export default LoginPage;
