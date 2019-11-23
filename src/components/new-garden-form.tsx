import { Form, Button, Input, Icon } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { Garden } from '../constants/types';
import { postGarden } from '../api';

export interface NewGardenFormProps extends FormComponentProps {
  username: string;
  addGarden: any;
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
        this.props.addGarden(values.gname);
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
