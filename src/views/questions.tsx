import { Alert, Col, Row, Spin, Card, Descriptions, List, Icon, Button, Input, Form } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState, Question } from '../constants/types';
import { getQuestionsData } from '../store/actions';

type IconType = {
  type: string;
  text: string;
};

const { TextArea } = Input;

export const Questions: React.FC<any> = () => {
  const dispatch = useDispatch();

  const username: string = useSelector((state: RootState) => state.gg.username);
  const questions: Question[] = useSelector((state: RootState) => state.gg.questions);
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);

  useEffect(() => {
    if (questions.length < 1) {
      dispatch(getQuestionsData(username));
    }
  });

  const IconText = (i: IconType) => (
    <span>
      <Icon type={i.type} style={{ marginRight: 8 }} />
      {i.text}
    </span>
  );

  const renderQuestions = () => {
    if (error) {
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Col xs={24} sm={24} md={18} lg={16} xl={16}>
              <Alert message='Error' description={error} type='error' showIcon={true} />
            </Col>
          </Row>
        </div>
      );
    } else if (questions) {
      console.log(questions);
      return (
        <div>
          <br></br>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 1000 }} title='Questions'>
              <List
                itemLayout='vertical'
                size='large'
                bordered={true}
                dataSource={questions}
                renderItem={question => (
                  <List.Item
                    key={question.question_title}
                    actions={[
                      <IconText type='star-o' text='156' key='list-vertical-star-o' />,
                      <IconText type='like-o' text='156' key='list-vertical-like-o' />,
                      <IconText type='message' text='2' key='list-vertical-message' />,
                    ]}>
                    <List.Item.Meta
                      // avatar={<Avatar src={item.name} />}
                      title={<a href={`/forum/question/${question.question_title}`}>{question.question_title}</a>}
                      description={question.description}
                    />
                  </List.Item>
                )}></List>
              <br></br>
              <div>
                <Form.Item>
                  <Button htmlType='submit' type='primary' href='/forum/question'>
                    Ask a question
                  </Button>
                </Form.Item>
              </div>
            </Card>
          </Row>
        </div>
      );
    }
  };

  return (
    <div>
      {isLoading ? (
        <Row type='flex' justify='center' className='fetching-weather-content'>
          <Spin className='fetching-weather-spinner' size='large' />
          <h2>Loading...</h2>
        </Row>
      ) : (
        renderQuestions()
      )}
    </div>
  );
};
