import { Alert, Col, Row, Spin, Card, Descriptions, List } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState, Planting, Garden } from '../constants/types';
import { getPlantData, getGardenData, getGardenPlantData } from '../store/actions';

type PathParamsType = {
  name: string;
};

let a = '';

function isEmpty(obj: any) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
}

// Your component own properties
type PlantProps = RouteComponentProps<PathParamsType> & {};

export const SearchFor: React.FC<PlantProps> = (props: PlantProps) => {
  const dispatch = useDispatch();

  const plant = useSelector((state: RootState) => state.gg.plant);
  const gardens: Garden[] = useSelector((state: RootState) => state.gg.gardens);
  const garden: Garden = useSelector((state: RootState) => state.gg.garden);
  // const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);

  useEffect(() => {
    if (a !== props.match.params.name) {
      a = props.match.params.name;
      dispatch(getPlantData(props.match.params.name));
      dispatch(getGardenPlantData(props.match.params.name));
      dispatch(getGardenData(props.match.params.name));
    }
  });

  console.log(gardens, plant, garden);

  const renderPlant = () => {
    if (!isEmpty(plant)) {
      console.log('PK');
      if (gardens.length > 0) {
        if (garden && garden.plantings.length > 0) {
          return (
            <div>
              <Row type='flex' justify='center' className='fetching-weather-content'>
                <h1>Fruit/Plant</h1>
                <Card style={{ width: 1400 }}>
                  <h1>{<a href={`/plant/${plant.name}`}>{plant.name}</a>}</h1>
                  {<a href={plant.en_wikipedia_url}>{plant.en_wikipedia_url}</a>}
                </Card>
                <h1>Garden</h1>
                <Card style={{ width: 1400 }}>
                  <List
                    itemLayout='vertical'
                    dataSource={gardens}
                    renderItem={garden => (
                      <List.Item key={garden.name}>
                        <h1>{<a href={`/garden/${garden.name}`}>{garden.name}</a>}</h1>
                      </List.Item>
                    )}></List>
                </Card>
                <Card style={{ width: 1400 }}>
                  <h2>{<a href={`/garden/${garden.name}`}>{garden.name}</a>}</h2>
                </Card>
              </Row>
            </div>
          );
        } else {
          return (
            <div>
              <Row type='flex' justify='center' className='fetching-weather-content'>
                <h1>Fruit/Plant</h1>
                <Card style={{ width: 1400 }}>
                  <h1>{<a href={`/plant/${plant.name}`}>{plant.name}</a>}</h1>
                  {<a href={plant.en_wikipedia_url}>{plant.en_wikipedia_url}</a>}
                </Card>
                <h1>Garden</h1>
                <Card style={{ width: 1400 }}>
                  <List
                    itemLayout='vertical'
                    dataSource={gardens}
                    renderItem={garden => (
                      <List.Item key={garden.name}>
                        <List.Item.Meta
                          title={<a href={`/garden/${garden.name}`}>{garden.name}</a>}
                          description={garden.location_name}
                        />
                      </List.Item>
                    )}></List>
                </Card>
              </Row>
            </div>
          );
        }
      } else {
        return (
          <div>
            <Row type='flex' justify='center' className='fetching-weather-content'>
              <h1>Fruit/Plant</h1>

              <Card style={{ width: 1400 }}>
                <h1>{<a href={`/plant/${plant.name}`}>{plant.name}</a>}</h1>
                {<a href={plant.en_wikipedia_url}>{plant.en_wikipedia_url}</a>}
              </Card>
            </Row>
          </div>
        );
      }
    } else if (garden && garden.plantings.length > 0) {
      console.log('IGI');
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <h1>Garden</h1>
            <Card style={{ width: 1400 }}>
              <h2>{<a href={`/garden/${garden.name}`}>{garden.name}</a>}</h2>
            </Card>
          </Row>
        </div>
      );
    } else {
      console.log('gegeg');
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 1400 }}>
              <h1>No data found</h1>
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
