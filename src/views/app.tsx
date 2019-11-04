import Layout from 'antd/lib/layout';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { NavBar } from '../components/nav-bar';
import {SideBar} from '../components/side-bar';
import store from '../store';
import { Forum } from './forum';
import { Home } from './home';
import { Plant } from './plant';
import { Gardens } from './gardens';

const { Header, Content, Footer } = Layout;

export const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
        <Layout className="layout">
          <SideBar />
          <Content className='content'>
            <Switch>
              <Route exact={true} path='/' component={Home} />
              <Route exact={true} path='/garden' component={Gardens} />
              <Route exact={true} path='/forum' component={Forum} />
              <Route path="/plant/:name" component={Plant}/>
              <Route render={() => <div>Page not found!</div>} />
            </Switch>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
        </div>
      </Router>
    </Provider>
  );
};
