import { Alert, Col, Row, Spin, Card, Descriptions } from 'antd/lib';
import * as React from 'react';
import {WrappedRegisterForm} from '../components/register-form';

export const Register: React.FC = () => (

  <Row type='flex' justify='center'>

    <Card style={{ width: 450 }}>
        <WrappedRegisterForm/>
    </Card>
  </Row>

);
