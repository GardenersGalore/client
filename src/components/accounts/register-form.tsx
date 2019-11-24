import { Button, Checkbox, Form, Icon, Input, message, Select, Tooltip } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { postUser } from '../../api';
import { User } from '../../constants/types';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { setUsername } from '../../store/actions';

const { Option } = Select;

export interface RegisterFormProps extends FormComponentProps {
  confirmDirty: false;
  dispatch: any;
}

class NormalRegisterForm extends React.Component<RegisterFormProps & RouteComponentProps> {
  constructor(props: RegisterFormProps & RouteComponentProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const newUser: User = {
          name: values.username,
          username: values.username,
          email: values.email,
          password: values.password,
          phone_number: values.phone,
          experience: values.experience,
          pictureURL: values.pictureURL,
          blogs: [],
          gardens: [],
          favourite_plants: [],
        };
        postUser(newUser);
        message.success('User Added');
        this.props.dispatch(setUsername(values.username));
        this.props.history.push('/user/' + values.username);
      }
    });
  };

  handleConfirmBlur = (e: any) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.props.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Your passwords don\'t match!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule: any, value: any, callback: any) => {
    const { form } = this.props;
    if (value && this.props.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const prefixSelector = getFieldDecorator('prefix', {
      initialValue: '61',
    })(
      <Select style={{ width: 70 }}>
        <Option value='64'>+64</Option>
        <Option value='61'>+61</Option>
      </Select>
    );

    const experienceSelector = getFieldDecorator('experience', {
      initialValue: 'Novice',
    })(
      <Select>
        <Option value='Novice'>Novice</Option>
        <Option value='Intermediate'>Intermediate</Option>
        <Option value='Advanced'>Advanced</Option>
      </Select>
    );
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    return (
      <Form {...formItemLayout} onSubmit={this.handleSubmit}>
        <Form.Item label='Email'>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: 'The input is not valid email!',
              },
              {
                required: true,
                message: 'Please input your email!',
              },
            ],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Password' hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input.Password />)}
        </Form.Item>
        <Form.Item label='Confirm Password' hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: 'Please confirm your password!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input.Password onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item
          label={
            <span>
              Username&nbsp;
              <Tooltip title='What do you want others to call you?'>
                <Icon type='question-circle-o' />
              </Tooltip>
            </span>
          }>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: 'Please input your username!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Phone Number'>
          {getFieldDecorator('phone', {
            rules: [{ required: false, message: 'Please input your phone number!' }],
          })(<Input addonBefore={prefixSelector} style={{ width: '100%' }} />)}
        </Form.Item>
        <Form.Item label='Experience'>{experienceSelector}</Form.Item>
        <Form.Item label={<span>Profile Photo&nbsp;</span>}>
          {getFieldDecorator('pictureURL', {
            rules: [{ message: 'Please input your picture URL!', whitespace: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read and accept the terms of the <a href=''> user agreement</a>
            </Checkbox>
          )}
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type='primary' htmlType='submit'>
            Register
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const ConnectedRegisterForm = connect()(withRouter(NormalRegisterForm));
