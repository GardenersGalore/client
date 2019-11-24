import { Avatar, Card, List, Row, Spin } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Garden, Plant, RootState, SearchQuestion, User } from '../constants/types';
import { getAllGardenData, getAllPlantData, getAllQuestionData, getAllUserData } from '../store/actions';

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
  const questions: SearchQuestion[] = useSelector((state: RootState) => state.gg.searchQuestion);
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

  console.log(gardens, plants, questions);

  const capitaliseFirstLetter = (word: string) => {
    return word[0].toUpperCase() + word.slice(1);
  };

  const truncateText = (text: string, truncatedAmount: number) => {
    if (text == undefined) {
      return '';
    } else {
      return text.slice(0, truncatedAmount - 1) + '...';
    }
  };

  const createIcon = (svgIcon: any) => {
    let plantIcon;
    if (svgIcon === undefined) {
      plantIcon = '../assets/unown_icon.svg';
    } else {
      const blob = new Blob([svgIcon], { type: 'image/svg+xml' });
      plantIcon = URL.createObjectURL(blob);
    }
    return plantIcon;
  };

  const scope = {
    splitterStyle: {
      height: 580,
    },
  };
  const renderPlant = () => {
    const userPic = '../assets/user.svg';
    const gardenPic = '../assets/garden.svg';
    const questionPic = '../assets/question.svg';

    if (!isEmpty(plants) && gardens.length > 0 && users.length > 0) {
      console.log('PK');
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={plants}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={createIcon(item.svg_icon)} />}
                      title={<a href={`/plant/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={
                        <div>
                          <a href={item.en_wikipedia_url}>{item.en_wikipedia_url}</a>
                          <p> {truncateText(item.description, 60)}</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={gardens}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={gardenPic} />}
                      title={<a href={`/garden/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={
                        <div>
                          <p>
                            Heigh: {item.garden_height} Width: {item.garden_width}
                          </p>
                        </div>
                      }
                    />
                    <p> User: {item.username}</p>
                  </List.Item>
                )}
              />
            </Card>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={users}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={userPic} />}
                      title={<a href={`/user/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={`Experience: ${item.experience}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Row>
        </div>
      );
    } else if (!isEmpty(plants) && gardens.length > 0) {
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={plants}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={createIcon(item.svg_icon)} />}
                      title={<a href={`/plant/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={
                        <div>
                          <a href={item.en_wikipedia_url}>{item.en_wikipedia_url}</a>
                          <p> {truncateText(item.description, 60)}</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={gardens}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={gardenPic} />}
                      title={<a href={`/garden/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={
                        <div>
                          <p>
                            Heigh: {item.garden_height} Width: {item.garden_width}
                          </p>
                        </div>
                      }
                    />
                    <p> User: {item.username}</p>
                  </List.Item>
                )}
              />
            </Card>
          </Row>
        </div>
      );
    } else if (!isEmpty(plants) && users.length > 0) {
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={plants}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={createIcon(item.svg_icon)} />}
                      title={<a href={`/plant/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={
                        <div>
                          <a href={item.en_wikipedia_url}>{item.en_wikipedia_url}</a>
                          <p> {truncateText(item.description, 60)}</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={users}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={userPic} />}
                      title={<a href={`/user/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={`Experience: ${item.experience}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Row>
        </div>
      );
    } else if (!isEmpty(plants) && questions.length > 0) {
      console.log('here', questions[0]._id['$oid']);
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={plants}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={createIcon(item.svg_icon)} />}
                      title={<a href={`/plant/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={
                        <div>
                          <a href={item.en_wikipedia_url}>{item.en_wikipedia_url}</a>
                          <p>{truncateText(item.description, 60)}</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={questions}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={questionPic} />}
                      title={
                        <a href={`/forum/question/${item._id['$oid']}`}>{capitaliseFirstLetter(item.question_title)}</a>
                      }
                      description={truncateText(item.description, 50) + `...`}
                    />
                    <p>Author: {item.author}</p>
                  </List.Item>
                )}
              />
            </Card>
          </Row>
        </div>
      );
    } else if (!isEmpty(plants)) {
      return (
        <div style={scope.splitterStyle}>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={plants}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      key={item.name}
                      avatar={<Avatar src={createIcon(item.svg_icon)} />}
                      title={<a href={`/plant/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={
                        <div>
                          <a href={item.en_wikipedia_url}>{item.en_wikipedia_url}</a>
                          <p>{truncateText(item.description, 60)}</p>
                        </div>
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Row>
        </div>
      );
    } else if (users.length > 0) {
      console.log('IGI');
      return (
        <div style={scope.splitterStyle}>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={users}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={userPic} />}
                      title={<a href={`/user/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={`Experience: ${item.experience}`}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </Row>
        </div>
      );
    } else if (gardens.length > 0) {
      console.log('ggg');
      return (
        <div style={scope.splitterStyle}>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={gardens}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar src={gardenPic} />}
                      title={<a href={`/garden/${item.name}`}>{capitaliseFirstLetter(item.name)}</a>}
                      description={
                        <div>
                          <p>
                            Heigh: {item.garden_height} Width: {item.garden_width}
                          </p>
                        </div>
                      }
                    />
                    <p> User: {item.username}</p>
                  </List.Item>
                )}
              />
            </Card>
          </Row>
        </div>
      );
    } else if (questions.length > 0) {
      console.log('quest');
      return (
        <div style={scope.splitterStyle}>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 800 }}>
              <List
                itemLayout='horizontal'
                dataSource={questions}
                renderItem={item => (
                  <List.Item>
                    <List.Item.Meta
                      key={item.question_title}
                      avatar={<Avatar src={questionPic} />}
                      title={
                        <a href={`/forum/question/${item._id['$oid']}`}>{capitaliseFirstLetter(item.question_title)}</a>
                      }
                      description={truncateText(item.description, 50) + `...`}
                    />
                    <p>Author: {item.author}</p>
                  </List.Item>
                )}
              />
            </Card>
          </Row>
        </div>
      );
    } else {
      return (
        <div style={scope.splitterStyle}>
          <Row type='flex' justify='center' className='fetching-weather-content'>
            <Card style={{ width: 800 }}>
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
