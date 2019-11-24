import { Alert, Col, Row, Spin, Card, Descriptions, Form } from 'antd/lib';
import * as React from 'react';
import { ConnectedRegisterForm, RegisterFormProps } from '../components/accounts/register-form';
import { useDispatch } from 'react-redux';

export const Register: React.FC = () => {
  const dispatch = useDispatch();

  const renderLoginForm = () => {
    const MyNewForm = Form.create<RegisterFormProps>()(ConnectedRegisterForm);

    return <MyNewForm dispatch={dispatch} confirmDirty={false} />;
  };

  return (
    <Row type='flex' justify='center' style={{ paddingTop: '100px' }}>
      <Card style={{ width: 450 }}>{renderLoginForm()}</Card>
    </Row>
  );
};
