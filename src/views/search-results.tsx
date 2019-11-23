import { Alert, Col, Row, Spin, Card, Descriptions, List } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState, Planting, Garden, Plant, User, Question } from '../constants/types';
import { getAllPlantData, getAllGardenData, getAllUserData, getAllQuestionData } from '../store/actions';

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

  const plants: Plant[] = useSelector((state: RootState) => state.gg.plantAll);
  const gardens: Garden[] = useSelector((state: RootState) => state.gg.gardens);
  const users: User[] = useSelector((state: RootState) => state.gg.userAll);
  const questions: Question[] = useSelector((state: RootState) => state.gg.question);
  const isError = useSelector((state: RootState) => state.gg.isError);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);

  useEffect(() => {
    if (a !== props.match.params.name) {
      a = props.match.params.name;
      dispatch(getAllPlantData(props.match.params.name));
      dispatch(getAllGardenData(props.match.params.name));
      dispatch(getAllUserData(props.match.params.name));
      dispatch(getAllQuestionData(props.match.params.name));
    }
  });

  console.log(gardens, plants, users);

  const renderPlant = () => {
    const plantPic = '../assets/4.jpg';
    const userPic = '../assets/user.jpg';
    const gardenPic = '../assets/garden.jpg';

    if (!isEmpty(plants) && gardens.length > 0 && users.length > 0) {
      console.log('PK');
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <h1>Fruits/Veges</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={plants}
                renderItem={plant => (
                  <List.Item key={plant.name}>
                    <img src={plantPic} style={{ width: 150, height: 100, marginLeft: 1170 }} />
                    <h1>{<a href={`/plant/${plant.name}`}>{plant.name}</a>}</h1>
                  </List.Item>
                )}></List>
            </Card>
            <h1>Garden</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={gardens}
                renderItem={garden => (
                  <List.Item key={garden.name}>
                    <img src={gardenPic} style={{ width: 150, height: 100, marginLeft: 1170 }} />
                    <h1>{<a href={`/garden/${garden.name}`}>{garden.name}</a>}</h1>
                  </List.Item>
                )}></List>
              <h1>Users</h1>
            </Card>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={users}
                renderItem={user => (
                  <List.Item key={user.name}>
                    <h1>{<a href={`/user/${user.name}`}>{user.name}</a>}</h1>
                  </List.Item>
                )}></List>
            </Card>
          </Row>
        </div>
      );
    } else if (!isEmpty(plants) && gardens.length) {
      console.log('In render plant', gardens.length);
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <h1>Fruits/Veges</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={plants}
                renderItem={plant => (
                  <List.Item key={plant.name}>
                    <img src={plantPic} style={{ width: 150, height: 100, marginLeft: 1170 }} />
                    <h1>{<a href={`/plant/${plant.name}`}>{plant.name}</a>}</h1>
                  </List.Item>
                )}></List>
            </Card>
            <h1>Garden</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={gardens}
                renderItem={garden => (
                  <List.Item key={garden.name}>
                    <img src={gardenPic} style={{ width: 150, height: 100, marginLeft: 1170 }} />
                    <h1>{<a href={`/garden/${garden.name}`}>{garden.name}</a>}</h1>
                  </List.Item>
                )}></List>
            </Card>
          </Row>
        </div>
      );
    } else if (!isEmpty(plants) && users.length > 0) {
      console.log('here', users[0].name);
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <h1>Fruits/Veges</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={plants}
                renderItem={plant => (
                  <List.Item key={plant.name}>
                    <img src={plantPic} style={{ width: 150, height: 100, marginLeft: 1170 }} />
                    <h1>{<a href={`/plant/${plant.name}`}>{plant.name}</a>}</h1>
                  </List.Item>
                )}></List>
            </Card>
            <h1>Users</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={users}
                renderItem={user => (
                  <List.Item key={user.name}>
                    <img src={userPic} style={{ width: 150, height: 100, marginLeft: 1170 }} />
                    <h1>{<a href={`/user/${user.name}`}>{user.name}</a>}</h1>
                  </List.Item>
                )}></List>
            </Card>
          </Row>
        </div>
      );
    } else if (!isEmpty(plants)) {
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <h1>Fruits/Veges</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={plants}
                renderItem={plant => (
                  <List.Item key={plant.name}>
                    <img src={plantPic} style={{ width: 150, height: 100, marginLeft: 1170 }} />
                    <h1>{<a href={`/plant/${plant.name}`}>{plant.name}</a>}</h1>
                  </List.Item>
                )}></List>
            </Card>
          </Row>
        </div>
      );
    } else if (users.length > 0) {
      console.log('IGI');
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <h1>User</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={users}
                renderItem={user => (
                  <List.Item key={user.name}>
                    <img src={userPic} style={{ width: 150, height: 100, marginLeft: 1170 }} />
                    <h1>{<a href={`/user/${user.name}`}>{user.name}</a>}</h1>
                  </List.Item>
                )}></List>
            </Card>
          </Row>
        </div>
      );
    } else if (gardens.length > 0) {
      console.log('ggg');
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <h1>User</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={gardens}
                renderItem={garden => (
                  <List.Item key={garden.name}>
                    <img src={garden.name} style={{ width: 150, height: 100, marginLeft: 1170 }} />
                    <h1>{<a href={`/user/${garden.name}`}>{garden.name}</a>}</h1>
                  </List.Item>
                )}></List>
            </Card>
          </Row>
        </div>
      );
    } else if (questions.length > 0) {
      console.log('ggg');
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <h1>Forum</h1>
            <Card style={{ width: 1400 }}>
              <List
                itemLayout='vertical'
                dataSource={questions}
                renderItem={question => (
                  <List.Item key={question.question_title}>
                    <h1>{<a href={`/question/${question.question_title}`}>{question.question_title}</a>}</h1>
                  </List.Item>
                )}></List>
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
