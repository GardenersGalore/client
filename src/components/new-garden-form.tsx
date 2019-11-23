import { Form, Button, Input, Icon } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Garden, User } from '../constants/types';
import { postGarden } from '../api';
import { setUser } from '../store/actions';

export interface NewGardenFormProps extends FormComponentProps {
  user: User;
  dispatch: any;
}

interface IState {
  showForm: boolean;
}

class NewGardenForm extends React.Component<NewGardenFormProps & RouteComponentProps, IState> {
  constructor(props: NewGardenFormProps & RouteComponentProps) {
    super(props);
    this.state = { showForm: false };
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const garden: Garden = {
          description: values.description,
          garden_height: 5,
          garden_width: 5,
          city_name: values.city,
          country_name: values.country,
          name: values.gname,
          plantings: [],
          username: this.props.user.username,
        };

        postGarden(garden);

        const updated_user = { ...this.props.user };
        updated_user.gardens.push(garden);
        this.props.dispatch(setUser(updated_user));
        this.setState({ showForm: false });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return this.state.showForm ? (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('gname', {
            rules: [{ required: true, message: 'Please input the name of the garden!' }],
          })(<Input placeholder='New garden name' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please input the description!' }],
          })(<Input placeholder='Description' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('city', {
            rules: [{ required: true, message: 'Please input the name of the city!' }],
          })(<Input placeholder='City' />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('country', {
            rules: [{ required: true, message: 'Please input the name of the country!' }],
          })(<Input placeholder='Country' />)}
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Done
          </Button>
        </Form.Item>
      </Form>
    ) : (
      <div className='gardens-add-button'>
        <Button
          type='primary'
          shape='round'
          icon='plus'
          size='default'
          onClick={() => {
            this.setState({ showForm: true });
          }}>
          Add Garden
        </Button>
      </div>
    );
  }
}

export const ConnectedNewGardenForm = connect()(withRouter(NewGardenForm));
