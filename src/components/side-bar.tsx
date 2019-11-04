import { Layout, Menu, Breadcrumb, Icon, Row, Col } from 'antd';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;
import * as React from 'react';
import Search from 'antd/lib/input/Search';
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
          to='/garden'
          onClick={() => {
            history.push('/garden');
          }}>
          Garden
        </Link>
      ));

      const ForumLink = withRouter(({ history }) => (
        <Link
          to='/forum'
          onClick={() => {
            history.push('/forum');
          }}>
          Forum
        </Link>
      ));

      // const Search = withRouter(({ location }) => {
      //   const pathname = location.pathname;
      //   const urlPath = 
      //   const urlPath = pathname.substring(1) === '' ? 'weather' : pathname.substring(1);
    
      //   return (
      //     <WeatherSearch onSearch={handleSearch} />
      //   );
      // });

      return (
        <Header className='nav-bar'>
          <Row>
          <Col span={4}> 
            Logo          
          </Col>
          <Col span={4}>
            <Menu
              theme="dark"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="Home"><HomeLink /></Menu.Item>
              <Menu.Item key="Garden"><GardenLink/></Menu.Item>
              <Menu.Item key="Forum"><ForumLink/></Menu.Item>
            </Menu>
          </Col>

          <Col span={8}>
            <div className='weather-search-outer'>
              <Search />
            </div>
          </Col>

          </Row>
        </Header>
      );
}