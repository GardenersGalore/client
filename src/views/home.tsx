import * as React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => (
  <div className='home-background'>
    <img className='home-image' src='../assets/home-logo.png'/>
    <h2 className='home-subtitle'>Welcome to Gardeners Galore, a website that helps you keep track of your gardens.</h2>
    <Link to='/login'>
      <Button className='inline' type='primary'>
        Log in
      </Button>
    </Link>
    <p className='inline or'>or</p>
    <Link to='/register'>
      <Button className='inline'>Register</Button>
    </Link>
  </div>
);
