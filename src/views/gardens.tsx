import { Alert, Col, Row, Spin, Card, Descriptions, List, Icon, Avatar, Timeline, Button, Radio, Divider } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState, Garden } from '../constants/types';
import { getPlantData, getGardensData } from '../store/actions';
import { GardenDisplay } from '../components/garden-display';
import { Loading } from '../components/loading';
import { Error } from '../components/error';

type IconType = {
  type: string;
  text: string;
};

const { Meta } = Card;

const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

export const Gardens: React.FC<any> = () => {
  const dispatch = useDispatch();

  const username: string = useSelector((state: RootState) => state.gg.username);
  const gardens: Garden[] = useSelector((state: RootState) => state.gg.gardens);
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);

  useEffect(() => {
    if (gardens.length < 1) {
      dispatch(getGardensData(username));
    }
  });

  const renderUser = () => {
    if (error) {
      return (
        <Error error={error}/>
      );
    } else if (gardens) {
      return (
        <div className="user-page">
            <Row type='flex' justify='center' className="user-row">

              <Card className="user-card">
                <Col span={6}>
                  <Avatar size={200} src="https://www.myjobquote.co.uk/assets/img/cost-of-hiring-a-gardener-for-maintenance-1.jpg" />
                </Col>
                <Col span={18}>
                  Johnny
                </Col>               
              </Card>
            </Row>
            <Row>
            <Col span={16} className="left-column">
            <Row className="user-row">
              <Card title="Gardens" size="default" >
                <div className="gardens-add-button">
                  <Button type="primary" shape="round" icon="plus" size="default">
                    Add Garden
                  </Button>
                </div>

                <Divider />
                  <Card size="default" >
                    {/* <GardenDisplay gardenName="Garden A">

                    </GardenDisplay> */}
                  </Card>
                <Divider />
                <List
                  itemLayout='vertical'
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  size='small'
                  dataSource={gardens}
                  renderItem={garden => (
                    <List.Item>
                        <Card
                          hoverable
                          cover={<img alt="example" src="https://i.pinimg.com/originals/14/07/a7/1407a7cb25ba944f12ca3d24535adefc.png" />}
                          actions={[
                            <Icon type="setting" key="setting" />,
                            <Icon type="edit" key="edit" />,
                            <Icon type="ellipsis" key="ellipsis" />,
                          ]}
                        >
                          <Meta title={<a href={`/garden/${garden.name}`}>{garden.name}</a>} description={garden.location_name} />
                          {garden.description}
                        </Card>                     
                    </List.Item>
                  )}></List>
              </Card>
            </Row>
            </Col>

            <Col span={8} className="right-column">
              <Row className="user-row">
                <Card title="Favourite Plants">
                <List
                    itemLayout="horizontal"
                    dataSource={data}
                    renderItem={item => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                          title={<a href="https://ant.design">{item.title}</a>}
                          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </Row>
              <Row className="user-row">
                <Card title="Recent Blogs">
                  <Timeline>
                    <Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
                    <Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
                    <Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
                    <Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
                  </Timeline>
                </Card>
              </Row>
            </Col>
            </Row>



        </div>
      );
    }
  };

  return (
    <div>
      {isLoading ? (
        <Loading/>
      ) : (
        renderUser()
      )}
    </div>
  );
};
