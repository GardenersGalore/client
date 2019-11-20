import { Row, Card, Form } from 'antd/lib';
import * as React from 'react';
import { QuestionForm, QuestionProps } from '../components/question-form';
import { useDispatch, useSelector } from 'react-redux';

export const QuestionView: React.FC<QuestionProps> = (props: QuestionProps) => {
    const dispatch = useDispatch();

    const renderQuestionForm = () => {
        const MyNewForm = Form.create<QuestionProps>()(QuestionForm);
    
        return (

          <div className='garden-info'>
          <br></br>
            <Row type='flex' justify='center'>
            <Card style={{ width: 450 }}>
                <MyNewForm dispatch={dispatch} />
            </Card>
            </Row>
          </div>
        );
      };

  return (
    <div>
      { renderQuestionForm() }
    </div>
  );

};