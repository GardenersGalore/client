import { Avatar, Card, Col, Form, List, Row, Spin, Alert } from 'antd/lib';
import * as React from 'react';
import { QuestionForm, QuestionProps } from '../components/forum/question-form';
import { useDispatch, useSelector } from 'react-redux';
import { Question, RootState } from '../constants/types';
import { Loading } from '../components/loading';

const data = [
  {
    title: 'The community is here to help you with specific gardening questions.',
  },
  {
    title: 'Be specific and imagine you’re asking a question to another person.',
  },

  {
    title: 'Include all the information someone would need to answer your question.',
  },
  {
    title: 'Avoid asking opinion-based questions.',
  },
];



export const AskAQuestion: React.FC<QuestionProps> = (props: QuestionProps) => {
  const dispatch = useDispatch();

  const username: string = useSelector((state: RootState) => state.gg.username);
  const question: Question = useSelector((state: RootState) => state.gg.question);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);
  const questions = useSelector((state: RootState) => state.gg.questions);


  const renderQ = () => {
    if(username === ""){
      return(
        <div>
          <Alert message="You must be logged in to ask a question" type="error" />
        </div>
      )
    }
    const MyNewForm = Form.create<QuestionProps>()(QuestionForm);
    return(
      <
        MyNewForm
      dispatch={dispatch}
      question={question}
      username={username}
      questions={questions}
      history={props.history}
      location={props.location}
      match={props.match}
      />
    )
  }

  const renderQuestionForm = () => {
    

    return (
      <div className='user-page'>
        <Row type='flex' justify='center' className='user-row'>
          <Card className='forum-card'>
            <Col span={6}>
              <Avatar size={200} src='https://cdn0.iconfinder.com/data/icons/digital-marketing-102/66/16-512.png' />
            </Col>
            <Col span={18}/>
          </Card>
        </Row>
        <Row>
          <Col span={16} className='left-column'>
            <Row className='user-row'>
              <Card title='Ask a public question' size='default' className='card-shadow'>
              {renderQ()}
              </Card>
            </Row>
          </Col>
          <Col span={8} className='right-column'>
            <Row className='user-row'>
              <Card title='Information' size='default' className='card-shadow'>
                <List
                  itemLayout='horizontal'
                  dataSource={data}
                  renderItem={item => (
                    <List.Item>
                      <List.Item.Meta title={item.title} />
                    </List.Item>
                  )}
                />
              </Card>
            </Row>
          </Col>
        </Row>
      </div>
    );
  };

  return (
    <div>
      {isLoading ? (
        <Loading/>
      ) : (
        renderQuestionForm()
      )}
    </div>
  );
};
