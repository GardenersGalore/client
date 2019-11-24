import { Layout, Menu, Row, Col } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
const { Header } = Layout;
import * as React from 'react';
import { GgSearch } from './gg-search';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../constants/types';
import { setUsername } from '../store/actions';

export const NavBar: React.FC<any> = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootState) => state.gg.username);

  const HomeLink = withRouter(({ history }) => (
    <Link
      to='/'
      onClick={() => {
        history.push('/');
      }}>
      <img className='gardeners-galore-icon' src='../assets/gardeners_galore_white.ico' alt='' />
    </Link>
  ));

  const GardenLink = withRouter(({ history }) => (
    <Link
      to={'/user/' + username}
      onClick={() => {
        history.push('/user/' + username);
      }}>
      My Gardens
    </Link>
  ));

  const ForumLink = withRouter(({ history }) => (
    <Link
      to='/forum/questions'
      onClick={() => {
        history.push('/forum/questions');
      }}>
      Forum
    </Link>
  ));

  const LoginLink = withRouter(({ history }) => (
    <Link
      to='/login'
      onClick={() => {
        history.push('/login');
      }}>
      Login
    </Link>
  ));

  const LogoutLink = withRouter(({ history }) => (
    <Link
      to='/'
      onClick={() => {
        history.push('/');
        // also need to log the user out!!
        dispatch(setUsername(''));
      }}>
      Logout
    </Link>
  ));

  const handleSearch = (location: string) => {
    // this needs to probs do something in terms of altering search state ..
    console.log(location);
  };

  const Search = withRouter(({ history }) => {
    return <GgSearch onSearch={handleSearch} history={history} />;
  });

  const myGardens = () => {
    if (username !== '') {
      return (
        <Menu.Item key='Garden'>
          <GardenLink />
        </Menu.Item>
      );
    }
  };

  const toLogout = () => {
    if (username !== '') {
      return (
        <Menu.Item key='Logout'>
          <LogoutLink />
        </Menu.Item>
      );
    }
  };

  const toLogin = () => {
    if (username === '') {
      return (
        <Menu.Item key='Login'>
          <LoginLink />
        </Menu.Item>
      );
    }
  };

  return (
    <Header className='nav-bar'>
      <Row>
        <Col span={2} />
        <Col span={4}>
          <HomeLink></HomeLink>
        </Col>
        <Col span={8}>
          <div className='weather-search-outer'>
            <Search />
          </div>
        </Col>
        <Col span={4}>
          <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }}>
            {myGardens()}
            <Menu.Item key='Forum'>
              <ForumLink />
            </Menu.Item>
          </Menu>
        </Col>
        <Col span={3}></Col>
        <Col span={3}>
          <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }}>
            {toLogin()}
            {toLogout()}
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};
