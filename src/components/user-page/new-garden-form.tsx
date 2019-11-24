import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Garden, User } from '../../constants/types';
import { postGarden } from '../../api';
import { setUser } from '../../store/actions';

export interface NewGardenFormProps extends FormComponentProps {
  user: User; // user who wants to add new garden
  dispatch: any; // function to retrieve state
}

interface IState {
  showForm: boolean; // whether form should be shown (false if button should be shown)
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
          pictureURL: values.picture,
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
        <Form.Item label='Garden name'>
          {getFieldDecorator('gname', {
            rules: [{ required: true, message: 'Please input the name of the garden!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Description'>{getFieldDecorator('description')(<Input />)}</Form.Item>
        <Form.Item label='City'>
          {getFieldDecorator('city', {
            rules: [{ required: true, message: 'Please input the name of the city!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Country'>
          {getFieldDecorator('country', {
            rules: [{ required: true, message: 'Please input the name of the country!' }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Picture'>{getFieldDecorator('picture')(<Input />)}</Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Create Garden
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
