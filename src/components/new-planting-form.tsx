import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { useDispatch, useSelector } from 'react-redux';
import { addPlantingToGarden, setGarden } from '../store/actions';
import { Plant, Planting, RootState } from '../constants/types';

class NewPlantingForm extends React.Component<FormComponentProps> {
  constructor(props: FormComponentProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const dispatch = useDispatch();
        const garden = useSelector((state: RootState) => state.gg.garden);
        let newPlant: Plant;
        newPlant.name = "strawberry";
        let newPlanting: Planting;
        newPlanting.plant = newPlant;
        newPlanting.x_coord = 0;
        newPlanting.y_coord = 0;
        garden.plantings.push(newPlanting);
        dispatch(setGarden(garden));
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
