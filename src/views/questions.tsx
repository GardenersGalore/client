import { Alert, Col, Row, Badge, Card, Avatar, List, Icon, Button, Tooltip } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter, Link } from 'react-router-dom';
import { RootState, Question } from '../constants/types';
import { getQuestionsData } from '../store/actions';
import { Loading } from '../components/loading';

type IconType = {
  type: string;
  text: string;
};

type PathParamsType = {
  url: string;
  description: string;
};

const data = [
  {
    title: 'Welcome to the Gardeners Galore Forum',
    description:
      'This is the place for like-minded Gardeners to help each other by sharing their experiences and expertise.',
  },
  {
    title: 'Have a gardening question?',
    description:
      'Do not wait. Click the button below to post your query. Someone will be able to help you with the answer.',
  },
];

type QuestionsProps = RouteComponentProps<PathParamsType> & {};

export const ToAskAQuestion = withRouter(({ history }) => (
  <Button
    htmlType='submit'
    type='primary'
    onClick={() => {
      history.push('/forum/ask-a-question');
    }}>
    Ask a question
  </Button>
));

export const HomeLink = withRouter(({ history, ...props }) => (
  <Link
    to={props.match.params.url}
    onClick={() => {
      history.push(props.match.params.url);
    }}>
    {props.match.params.description}
  </Link>
));

export const Questions: React.FC<QuestionsProps> = (props: QuestionsProps) => {
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
        <div className='user-page'>
          <Row type='flex' justify='center' className='user-row'>
            <Card className='forum-card'>
              <Col span={6}>
                <Avatar size={200} src='https://cdn0.iconfinder.com/data/icons/digital-marketing-102/66/16-512.png' />
              </Col>
              <Col span={18}>Johnny</Col>
            </Card>
          </Row>

          <Row>
            <Col span={16} className='left-column'>
              <Row className='user-row'>
                <Card title='Questions' size='default' className='card-shadow'>
                  <List
                    itemLayout='vertical'
                    size='large'
                    bordered={false}
                    dataSource={questions}
                    renderItem={question => (
                      <List.Item
                        key={question.question_title}
                        actions={[
                          <a href={`/forum/question/${question._id.$oid}`}>
                            <Tooltip title='Click to see answers'>
                              <Badge showZero count={question.answers.length} style={{ backgroundColor: '#52c41a' }}>
                                <Icon type='message'></Icon>
                              </Badge>
                            </Tooltip>
                          </a>,
                          <IconText type='user' text={question.author} key='list-vertical-like-o' />,
                        ]}>
                        <List.Item.Meta
                          title={<a href={`/forum/question/${question._id.$oid}`}>{question.question_title}</a>}
                          description={question.description}
                        />
                      </List.Item>
                    )}></List>
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
                        <List.Item.Meta title={item.title} description={item.description} />
                      </List.Item>
                    )}
                  />
                  <br></br>
                  <div>
                    <ToAskAQuestion />
                  </div>
                </Card>
              </Row>
            </Col>
          </Row>
        </div>
      );
    }
  };

  return <div>{isLoading ? <Loading /> : renderQuestions()}</div>;
};
