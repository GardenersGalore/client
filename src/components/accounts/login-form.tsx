import { Button, Form, Icon, Input } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { setUsername } from '../../store/actions';
import { RouteComponentProps, withRouter } from 'react-router';

export interface NormalLoginFormProps extends FormComponentProps {
  dispatch: any;
}

class NormalLoginForm extends React.Component<NormalLoginFormProps & RouteComponentProps> {
  constructor(props: NormalLoginFormProps & RouteComponentProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.dispatch(setUsername(values.username));
        this.props.history.push('/user/' + values.username);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(<Input prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder='Username' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input
              prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Log in
          </Button>
          Or <a href='/register'>register now!</a>
        </Form.Item>
      </Form>
    );
  }
}

export const ConnectedLoginForm = connect()(withRouter(NormalLoginForm));
