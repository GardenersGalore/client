import { Form, Icon, Input, Button, Checkbox } from 'antd';
import * as React from 'react';
import { useEffect } from 'react';
import { getPlant,postPlanting, postNewQuestion } from '../api';
import { FormComponentProps } from 'antd/lib/form/Form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { addPlantingToGarden, setGarden, getGardenData, postNewQuestionData, getQuestionsData } from '../store/actions';
import { Plant, Planting, RootState, Garden, Question } from '../constants/types';

export interface QuestionProps extends FormComponentProps {
  dispatch: any;
}

export class QuestionForm extends React.Component<QuestionProps> {
  constructor(props: QuestionProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        
        const newQuestion: Question = {
          question_title: values.question_title,
          author: 'test',
          description: values.description,
          answers: []
          };

        this.props.dispatch(postNewQuestionData(newQuestion));
        const posted = postNewQuestion(newQuestion);

        console.log(posted);
        this.props.dispatch(getQuestionsData('test'))
        
        //this.props.dispatch(getGardenData(this.props.garden.name));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='login-form'>
        <Form.Item label='Title'>
          {getFieldDecorator('question_title', {
            rules: [{ required: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item label='Description'>
          {getFieldDecorator('description', {
            rules: [{ required: true }],
          })(<Input />)}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' className='login-form-button'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect()(QuestionForm);
