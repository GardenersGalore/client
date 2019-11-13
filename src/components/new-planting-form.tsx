import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { getPlant, getGardens, getGarden, getPlantings, postPlanting } from '../api';
import { FormComponentProps } from 'antd/lib/form/Form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { addPlantingToGarden, setGarden, getGardenData } from '../store/actions';
import { Plant, Planting, RootState, Garden } from '../constants/types';
import { GardenView } from '../views/garden';

export interface NewPlantingProps extends FormComponentProps {
  garden: Garden;
  dispatch : any;
  xcoord : number;
  ycoord : number;
}


export class NewPlantingForm extends React.Component<NewPlantingProps> {
  
  constructor(props: NewPlantingProps) {
    super(props);

  }

  // useEffect = () => {
  //   this.dispatch = useDispatch();
  //   this.garden = useSelector((state: RootState) => state.gg.garden);
  // };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const p = await getPlant(values.name);
          
          let newPlanting: Planting = {
            "plant_name" : values.name,
            "garden_name" : this.props.garden.name,
            "x_coord" : this.props.xcoord,
            "y_coord" : this.props.ycoord,
            "planted_at" : new Date,
            "description": "new plant",
            "planted_from": "seed",
            "harvest_count": 1,
            "plant": p,
          };
          
          const new_garden = { ...this.props.garden };
          new_garden.plantings.push(newPlanting);
          console.log(new_garden.plantings);
          this.props.dispatch(setGarden(new_garden));
          const posted = postPlanting(newPlanting);

          console.log(posted);
          //this.props.dispatch(getGardenData(this.props.garden.name));
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

export default connect()(NewPlantingForm);