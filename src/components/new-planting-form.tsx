import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';

class NewPlantingForm extends React.Component<FormComponentProps> {
  constructor(props: FormComponentProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item label='Plant type'>
          {getFieldDecorator('name', {
            rules: [{ required: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Done
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export const WrappedNewPlantingForm = Form.create({ name: 'new_planting' })(NewPlantingForm);
