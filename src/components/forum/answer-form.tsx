import { Form, Input, Button } from 'antd';
import * as React from 'react';
import { postNewAnswer } from '../../api';
import { FormComponentProps } from 'antd/lib/form/Form';
import { connect } from 'react-redux';
import { setQuestion } from '../../store/actions';
import { Question, Answer } from '../../constants/types';

const { TextArea } = Input;

export interface AnswerProps extends FormComponentProps {
  dispatch: any;
  question: Question;
  username: string;
}

export class AnswerForm extends React.Component<AnswerProps> {
  constructor(props: AnswerProps) {
    super(props);
  }

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        const newAnswer: Answer = {
          question_title: this.props.question.question_title,
          author: this.props.username,
          answer: values.answer,
        };

        const question = { ...this.props.question };
        question.answers.push(newAnswer);
        //this.props.dispatch(postNewQuestionData(newQuestion));
        this.props.dispatch(setQuestion(question));
        //this.props.dispatch(setQuestions(questions_list));
        const posted = postNewAnswer(newAnswer);

        console.log(posted);

        //this.props.dispatch(getGardenData(this.props.garden.name));
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='my-form'>
        <Form.Item label='Answer'>
          {getFieldDecorator('answer', {
            rules: [{ required: true }],
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Post your answer
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect()(AnswerForm);
