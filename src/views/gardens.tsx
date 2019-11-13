import { Alert, Col, Row, Spin, Card, Descriptions, List, Icon } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps} from 'react-router-dom';
import { RootState, Garden } from '../constants/types';
import { getPlantData, getGardensData} from '../store/actions';


type IconType = {
  type : string;
  text : string;
}

export const Gardens: React.FC<any> = () => {
  const dispatch = useDispatch();

  const username : string = useSelector((state: RootState) => state.gg.username);
  const gardens : Garden[] = useSelector((state: RootState) => state.gg.gardens);
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);


  useEffect(() => {
    if (gardens.length < 1){
      dispatch(getGardensData(username));
    }
  });

  const IconText = ( i : IconType ) => (
    <span>
      <Icon type={i.type} style={{ marginRight: 8 }} />
      {i.text}
    </span>
  );

  const renderPlant = () => {
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
    } else if (gardens) {
      console.log(gardens);
      return (
        
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <h1>My Gardens</h1>
            <Card style={{ width: 1400 }}>
                <List
                itemLayout="vertical"
                size="large"
                dataSource={gardens}
                renderItem={garden => (
                  <List.Item
                    key={garden.name}
                    actions={[
                      <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                      <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                      <IconText type="message" text="2" key="list-vertical-message" />,
                    ]}
                    extra={
                      <img
                        width={272}
                        alt="logo"
                        src="https://i.pinimg.com/originals/14/07/a7/1407a7cb25ba944f12ca3d24535adefc.png"
                      />
                    }
                  >
                    <List.Item.Meta
                      // avatar={<Avatar src={item.name} />}
                      title={<a href={`/garden/${garden.name}`}>{garden.name}</a>}
                      description={garden.location_name}
                    />
                    {garden.description}
                  </List.Item>
                )}
              >
              </List>
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
        renderPlant()
      )}
    </div>
  );
};
