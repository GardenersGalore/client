import { Alert, Col, Row, Spin, Card, Descriptions } from 'antd/lib';
import * as React from 'react';
import {WrappedNormalLoginForm} from '../components/login-form';

export const Login: React.FC = () => (

  <Row type='flex' justify='center'>

    <Card style={{ width: 350 }}>
        <WrappedNormalLoginForm/>
    </Card>
  </Row>

);
