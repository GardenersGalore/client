import { Form, Button } from 'antd';
import * as React from 'react';
import {FormComponentProps} from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Garden } from '../constants/types';
import { postGarden } from '../api';

export interface NewGardenFormProps extends FormComponentProps {
  username: string;
}

class NewGardenForm extends React.Component<NewGardenFormProps & RouteComponentProps> {
  constructor(props: NewGardenFormProps & RouteComponentProps) {
    super(props);
  }

  handleSubmit = (e : any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const garden: Garden = {
          description: '',
          garden_height: 5,
          garden_width: 5,
          location: undefined,
          location_name: '',
          name: values.name,
          plantings: [],
          username: this.props.username,
        };

        postGarden(garden);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input the name ofthe garden!' }],
          })}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Create
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const ConnectedNewGardenForm =  connect()(withRouter(NewGardenForm));
