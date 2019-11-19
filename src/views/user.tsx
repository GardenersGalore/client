import { Alert, Col, Row, Spin, Card, Form, Input, Button, Avatar, Divider, List, Icon, Timeline } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState, User } from '../constants/types';
import { getUserData } from '../store/actions';
import { Loading } from '../components/loading';
import { Error } from '../components/error';
import { GardenDisplay } from '../components/garden-display';
import Meta from 'antd/lib/card/Meta';
import { color } from 'd3';

type PathParamsType = {
  name: string;
};

// Your component own properties
type UserProps = RouteComponentProps<PathParamsType> & {};


export const UserView: React.FC<UserProps> = (props: UserProps) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.gg.user);
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        dispatch(getUserData(props.match.params.name));
      } else if (user.username != props.match.params.name) {
        dispatch(getUserData(props.match.params.name));
      }
    }
  });

  const createIcon = (svg_icon : any) => {
    let plantIcon;
    if (svg_icon === undefined){
      plantIcon = "../assets/unown_icon.svg";
    } else{
        const blob = new Blob([svg_icon], { type: 'image/svg+xml' });
        plantIcon = URL.createObjectURL(blob);
    }
    return plantIcon;
  }

  const capitaliseFirstLetter = (word : string) => {
    return word[0].toUpperCase() + word.slice(1);
  }

  const truncateText = (text : string, truncatedAmount : number) => {
      if (text.length >= truncatedAmount){
        return text.slice(0,truncatedAmount-1) + "...";
      } else{
        return text;
      }
  }

  const renderUser = () => {
    if (error) {
      return (
        <Error error={error}/>
      );
    } else if (user) {
      return (
        <div className="user-page">
            <Row type='flex' justify='center' className="user-row">
              <Card className="user-card">
                <Col span={5} >
                    <div className="userlogo-shadow">
                        <Avatar size={200} className="userlogo" src="https://www.myjobquote.co.uk/assets/img/cost-of-hiring-a-gardener-for-maintenance-1.jpg" />
                    </div>
                </Col>
                
                <Col span={19}>
                    <div >
                        <h1 style={{color: "white"}} className="username">
                        {capitaliseFirstLetter(user.username)}
                        </h1>
                    </div>
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
                    <GardenDisplay gardenName="Garden A">

                    </GardenDisplay>
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
                  dataSource={user.gardens}
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
                    dataSource={user.favourite_plants}
                    renderItem={item => (

                      <List.Item>
                        <List.Item.Meta
                          avatar={<Avatar src={createIcon(item.plant.svg_icon)} />}
                          title={<a href={`/plant/${item.plant.name}`}>{capitaliseFirstLetter(item.plant.name)}</a>}
                          description={truncateText(item.plant.description, 100)}
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
