import Layout from 'antd/lib/layout';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import { NavBar } from '../components/nav-bar';
import { SideBar } from '../components/side-bar';
import store from '../store';
import { Forum } from './forum';
import { Home } from './home';
import { Plant } from './plant';
import { GardenView } from './garden';
import { Gardens } from './gardens';
import { Login } from './login';
import { Register } from './register';
import { Questions } from './questions';

const { Header, Content, Footer } = Layout;

export const App: React.FC<any> = () => {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Layout className='layout'>
            <SideBar />
            <Content className='content'>
              <Switch>
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/gardens' component={Gardens} />
                <Route exact={true} path='/forum' component={Questions} />
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path='/register' component={Register} />
                <Route path='/plant/:name' component={Plant} />
                <Route path='/garden/:name' component={GardenView} />
                <Route path='/question/:question_title' component={Question} />
                <Route render={() => <div>Page not found!</div>} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Gardeners Galore ©2019</Footer>
          </Layout>
        </div>
      </Router>
    </Provider>
  );
};
