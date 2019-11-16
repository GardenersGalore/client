import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import * as React from 'react';
// import Search from 'antd/lib/input/Search';
import { WeatherSearch } from './weather-search';

export const SideBar: React.FC<any> = () => {
  const HomeLink = withRouter(({ history }) => (
    <Link
      to='/'
      onClick={() => {
        history.push('/');
      }}>
      Home
    </Link>
  ));

  const GardenLink = withRouter(({ history }) => (
    <Link
      to='/gardens'
      onClick={() => {
        history.push('/gardens');
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
      to='/logout'
      onClick={() => {
        history.push('/logout');
        // also need to log the user out!!
      }}>
      Logout
    </Link>
  ));

  const handleSearch = (location: string) => {
    // this needs to probs do something in terms of altering search state ..
    console.log(location);
  };

  const Search = withRouter(({ history }) => {
    return <WeatherSearch onSearch={handleSearch} history={history} />;
  });

  return (
    <Header className='nav-bar'>
      <Row>
        <Col span={4}>Logo</Col>
        <Col span={4}>
          <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }}>
            <Menu.Item key='Home'>
              <HomeLink />
            </Menu.Item>
            <Menu.Item key='Garden'>
              <GardenLink />
            </Menu.Item>
            <Menu.Item key='Forum'>
              <ForumLink />
            </Menu.Item>
          </Menu>
        </Col>

        <Col span={8}>
          <div className='weather-search-outer'>
            <Search />
          </div>
        </Col>
        <Col span={6}></Col>
        <Col span={2}>
          <Menu theme='dark' mode='horizontal' style={{ lineHeight: '64px' }}>
            <Menu.Item key='Login'>
              <LoginLink />
            </Menu.Item>
            <Menu.Item key='Logout'>
              <LogoutLink />
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </Header>
  );
};
