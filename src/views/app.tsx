import Layout from 'antd/lib/layout';
import * as React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { NavBar } from '../components/nav-bar';
import * as store from '../store/index';
import { Home } from './home';
import { Plant } from './plant';
import { Login } from './login';
import { Register } from './register';
import { Questions } from './questions';
import { PageNotFound } from './page-not-found';
import { UserView } from './user';
import { SearchFor } from './search-results';
import { AskAQuestion } from './ask-a-question';
import { QuestionView } from './question';
import { PersistGate } from 'redux-persist/integration/react'
import { Loading } from '../components/loading';

const { Header, Content, Footer } = Layout;

export const App: React.FC<any> = () => {
  return (
    <Provider store={store.default.store}>
      <PersistGate loading={<Loading />} persistor={store.default.persistor}>
      <Router>
        <div>
          <Layout className='layout'>
            <NavBar />
            <Content className='content' style={{minHeight : "100%"}}>
              <Switch>
                <Route exact={true} path='/' component={Home} />
                <Route exact={true} path='/forum/questions' component={Questions} />
                <Route exact={true} path='/forum/ask-a-question' component={AskAQuestion} />
                <Route exact={true} path='/login' component={Login} />
                <Route exact={true} path='/register' component={Register} />
                <Route path='/plant/:name' component={Plant} />
                <Route path='/user/:name' component={UserView} />
                <Route path='/search-result/:name' component={SearchFor} />
                <Route path='/forum/question/:_id' component={QuestionView} />
                <Route component={PageNotFound} />
              </Switch>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Gardeners Galore ©2019</Footer>
          </Layout>
        </div>
      </Router>
      </PersistGate>
    </Provider>
  );
};
