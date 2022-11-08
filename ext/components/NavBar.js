import waspLogo from '../waspLogo.png';
import { Link } from 'react-router-dom';
import { CgHome, CgBee } from 'react-icons/cg';

const NavBar = () => {
  return (
    <nav className='nav'>
      <div className='logo'>
        <img src={waspLogo} alt='wasp' />
        <span style={{ fontWeight: '600', margin: '0 0.5rem' }}>HiveMind</span>
        <span style={{ fontSize: '0.75rem', fontStyle: 'italic' }}>
          The Task Reminder App built with {''}
          <a
            href='https://wasp-lang.dev'
            target='_blank'
            rel='noreferrer'
            style={{ color: '#fc0', textDecoration: 'none' }}
          >
            Wasp
          </a>
        </span>
      </div>
      <div style={{ marginLeft: 'auto', marginRight: 'auto', alignItems: 'center' }}>
        <Link className='nav-link' to='/'>
          <CgHome />
          Home
        </Link>
        <Link className='nav-link' to='/about'>
          <CgBee />
          About
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
