import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { getPlant, postPlanting } from '../../api';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { setGarden } from '../../store/actions';
import { Garden, Planting } from '../../constants/types';

export interface NewPlantingProps extends FormComponentProps {
  garden: Garden;
  dispatch: any;
  xcoord: number;
  ycoord: number;
}

export class NewPlantingForm extends React.Component<NewPlantingProps> {
  constructor(props: NewPlantingProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const p = await getPlant(values.name);

        const newPlanting: Planting = {
          plant_name: values.name,
          garden_name: this.props.garden.name,
          x_coord: this.props.xcoord,
          y_coord: this.props.ycoord,
          planted_at: new Date(),
          description: 'new plant',
          planted_from: 'seed',
          harvest_count: 1,
          pictureURL: values.pictureURL,
          plant: p,
        };

        const new_garden = { ...this.props.garden };
        new_garden.plantings.push(newPlanting);
        this.props.dispatch(setGarden(new_garden));
        const posted = postPlanting(newPlanting);
        console.log('POSTED', posted);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='planting-form'>
        <Form.Item label='Plant type'>
          {getFieldDecorator('name', {
            rules: [{ required: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Picture URL'>
          {getFieldDecorator('pictureURL', {
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

export default connect()(NewPlantingForm);
