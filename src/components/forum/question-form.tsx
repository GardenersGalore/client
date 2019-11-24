import { Button, Form, Input } from 'antd';
import * as React from 'react';
import { postNewQuestion } from '../../api';
import { FormComponentProps } from 'antd/lib/form/Form';
import { setQuestion, setQuestions } from '../../store/actions';
import { Question } from '../../constants/types';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const { TextArea } = Input;

export interface QuestionProps extends FormComponentProps, RouteComponentProps {
  dispatch: any;
  question: Question;
  username: string;
  questions: Question[];
}

export class QuestionForm extends React.Component<QuestionProps> {
  constructor(props: QuestionProps) {
    super(props);
  }

  goToForum = () => {
    this.props.history.push('/forum/questions');
  };

  handleSubmit = (e: any) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const newQuestion: Question = {
          question_title: values.question_title,
          author: this.props.username,
          description: values.description,
          answers: [],
          _id: { $oid: '' },
        };

        const questions_list = [...this.props.questions];

        const posted = postNewQuestion(newQuestion);
        posted
          .then(function(question: Question) {
            newQuestion._id = question._id;
            questions_list.push(newQuestion);
          })
          .then(this.props.dispatch(setQuestions(questions_list)))
          .then(this.props.dispatch(setQuestion(newQuestion)))
          .then(this.goToForum);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className='my-form'>
        <Form.Item label='Title'>
          {getFieldDecorator('question_title', {
            rules: [{ required: true }],
          })(<Input/>)}
        </Form.Item>
        <Form.Item label='Description'>
          {getFieldDecorator('description', {
            rules: [{ required: true }],
          })(<TextArea rows={4}/>)}
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(QuestionForm);
