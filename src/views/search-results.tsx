import { Alert, Col, Row, Spin, Card, Descriptions } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../constants/types';
import { getPlantData } from '../store/actions';

type PathParamsType = {
  name: string;
};

// Your component own properties
type PlantProps = RouteComponentProps<PathParamsType> & {};

export const SearchFor: React.FC<PlantProps> = (props: PlantProps) => {
  const dispatch = useDispatch();

  const plant = useSelector((state: RootState) => state.gg.plant);
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);

  useEffect(() => {
    if (!plant) {
      dispatch(getPlantData(props.match.params.name));
    } else if (plant.name != props.match.params.name) {
      dispatch(getPlantData(props.match.params.name));
    }
  });

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
    } else if (plant) {
      const blob = new Blob([plant.svg_icon], { type: 'image/svg+xml' });
      const plantIcon = URL.createObjectURL(blob);
      console.log(plant);
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 1400 }}>
              <img src={plantIcon} className='plantIcon'></img>
              <strong className='plantName'>
                <a href={plant.en_wikipedia_url}>{plant.name}</a>
              </strong>
              <small>{plant.binomial_name}</small>
              <br></br>
              <Descriptions layout='vertical' bordered>
                <Descriptions.Item label='Spread'>{plant.spread}</Descriptions.Item>
                <Descriptions.Item label='Sun Requirements'>{plant.sun_requirements}</Descriptions.Item>
                <Descriptions.Item label='Height (cm)'>{plant.height}</Descriptions.Item>
                <Descriptions.Item label='Row Spacing'>{plant.row_spacing}</Descriptions.Item>
                <Descriptions.Item label='Median Days to First Harvest'>
                  {plant.median_days_to_first_harvest}
                </Descriptions.Item>
                <Descriptions.Item label='Sowing Requirements'>{plant.sowing_method}</Descriptions.Item>
                <Descriptions.Item label='Plant Description' span={3}>
                  {plant.description}
                </Descriptions.Item>
              </Descriptions>
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
