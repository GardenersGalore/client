import { Card, Form, Row } from 'antd/lib';
import * as React from 'react';
import { ConnectedLoginForm, NormalLoginFormProps } from '../components/accounts/login-form';
import { useDispatch } from 'react-redux';

export const Login: React.FC = () => {
  const dispatch = useDispatch();

  const renderLoginForm = () => {
    const MyNewForm = Form.create<NormalLoginFormProps>()(ConnectedLoginForm);

    return <MyNewForm dispatch={dispatch}/>;
  };

  return (
    <Row type='flex' justify='center' style={{ paddingTop: '100px' }}>
      <Card style={{ width: 350 }}>{renderLoginForm()}</Card>
    </Row>
  );
};
