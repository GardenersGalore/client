import { Alert, Col, Row, Spin, Card, Form, Input, Button, Avatar, Divider, List, Icon, Timeline } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../constants/types';
import { getUserData } from '../store/actions';
import { Loading } from '../components/loading';
import { Error } from '../components/error';
import { GardensDisplay } from '../components/garden/gardens-display';


type PathParamsType = {
  name: string;
};

// Your component own properties
type UserProps = RouteComponentProps<PathParamsType> & {};


export const UserView: React.FC<UserProps> = (props: UserProps) => {
  const dispatch = useDispatch();

  const user = useSelector((state: RootState) => state.gg.user);
  const error = useSelector((state: RootState) => state.gg.error);
  const isError = useSelector((state: RootState) => state.gg.isError);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log("NOT LOADING");
      if (!user) {
        console.log("NO USER", user);
        dispatch(getUserData(props.match.params.name));
      } else if (user.username !== props.match.params.name) {
        console.log(user.username, props.match.params.name)
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
    if (isError) {
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
                <GardensDisplay user={user}></GardensDisplay>
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
                    <Timeline.Item>I planted something!</Timeline.Item>
                    <Timeline.Item>I planted another thing!</Timeline.Item>
                    <Timeline.Item>Been planting more things</Timeline.Item>
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
