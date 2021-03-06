import { Alert, Avatar, Card, Col, Divider, Form, Icon, List, Row } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Question, RootState } from '../constants/types';
import { getQuestionData } from '../store/actions';
import { AnswerForm, AnswerProps } from '../components/forum/answer-form';
import { Loading } from '../components/loading';

type PathParamsType = {
  _id: string;
};

type QuestionProps = RouteComponentProps<PathParamsType> & {};

export const QuestionView: React.FC<QuestionProps> = (props: QuestionProps) => {
  const dispatch = useDispatch();

  const username: string = useSelector((state: RootState) => state.gg.username); // username of user who asked question
  const question: Question = useSelector((state: RootState) => state.gg.question);
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);

  const MyNewForm = Form.create<AnswerProps>()(AnswerForm);

  useEffect(() => {
    if (!question) {
      dispatch(getQuestionData(props.match.params._id));
    } else if (question._id.$oid !== props.match.params._id) {
      dispatch(getQuestionData(props.match.params._id));
    }
  });

  const renderAnswerQuestion = () => {
    if (username === '') {
      return (
        <div>
          <Alert message='You must be logged in to answer a question' type='error'/>
        </div>
      );
    }
    return <MyNewForm dispatch={dispatch} question={question} username={username}/>;
  };

  const renderQuestion = () => {
    if (error) {
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-content'>
            <Col xs={24} sm={24} md={18} lg={16} xl={16}>
              <Alert message='Error' description={error} type='error' showIcon={true}/>
            </Col>
          </Row>
        </div>
      );
    } else if (question && question.answers.length > 0) {
      return (
        <div className='user-page'>
          <Row type='flex' justify='center' className='user-row'>
            <Card className='forum-card'>
              <Col span={6}>
                <Avatar size={200} src='https://cdn0.iconfinder.com/data/icons/digital-marketing-102/66/16-512.png'/>
              </Col>
              <Col span={18}/>
            </Card>
          </Row>

          <Row>
            <Col span={24}>
              <Row className='user-row'>
                <Card title='Question' size='default' className='card-shadow'>
                  <span>
                    {question.question_title}
                    <Icon type='user' style={{ marginLeft: 850, marginRight: 8 }}/>
                    {question.author}
                  </span>
                  <p>{question.description}</p>
                </Card>
                <Divider/>

                <Card size='default' style={{ marginBottom: 8 }} className='card-shadow'>
                  <p>Answers</p>
                  <p>{`${question.answers.length} ${question.answers.length > 1 ? 'replies' : 'reply'}`}</p>
                </Card>
                <List
                  itemLayout='horizontal'
                  size='large'
                  bordered={false}
                  dataSource={question.answers}
                  renderItem={answer => (
                    <Card style={{ marginBottom: 8 }} className='card-shadow'>
                      <p>{answer.answer}</p>
                      <span>
                        <Icon type='user' style={{ marginRight: 8 }}/>
                        {answer.author}
                      </span>
                    </Card>
                  )}
                />

                <Divider/>
                <Card title='Submit your answer' className='card-shadow'>
                  {renderAnswerQuestion()}
                </Card>
              </Row>
            </Col>
          </Row>
        </div>
      );
    } else if (question) {
      return (
        <div className='user-page'>
          <Row type='flex' justify='center' className='user-row'>
            <Card className='user-card'>
              <Col span={6}>
                <Avatar size={200} src='https://cdn0.iconfinder.com/data/icons/digital-marketing-102/66/16-512.png'/>
              </Col>
              <Col span={18}/>
            </Card>
          </Row>

          <Row>
            <Col span={24} className='left-column'>
              <Row className='user-row'>
                <Card title='Question'>
                  {question.question_title}
                  <br/>
                  {question.description}
                </Card>
                <Divider/>
                <Card title='Submit your answer'>{renderAnswerQuestion()}</Card>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }
  };

  return <div>{isLoading ? <Loading/> : renderQuestion()}</div>;
};
