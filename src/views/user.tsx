import { Alert, Col, Row, Spin, Card, Form, Input, Button, Avatar, Divider, List, Icon, Timeline, Tag } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Garden, RootState } from '../constants/types';
import { getUserData, setUser } from '../store/actions';
import { Loading } from '../components/loading';
import { Error } from '../components/error';
import { GardensDisplay } from '../components/garden/gardens-display';
import { postGarden } from '../api';
import { deleteGarden } from '../api';

import { ConnectedNewGardenForm, NewGardenFormProps } from '../components/new-garden-form';
import { ConnectedNewBlogForm, NewBlogFormProps } from '../components/new-blog-form';

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
  const loggedInUsername = useSelector((state: RootState) => state.gg.username);

  const showAddGardenForm = false;

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log('NOT LOADING');
      if (!user) {
        console.log('NO USER', user);
        dispatch(getUserData(props.match.params.name));
      } else if (user.username !== props.match.params.name) {
        console.log(user.username, props.match.params.name);
        dispatch(getUserData(props.match.params.name));
      }
    }
  });

  const createIcon = (svg_icon: any) => {
    let plantIcon;
    if (svg_icon === undefined) {
      plantIcon = '../assets/unown_icon.svg';
    } else {
      const blob = new Blob([svg_icon], { type: 'image/svg+xml' });
      plantIcon = URL.createObjectURL(blob);
    }
    return plantIcon;
  };

  const capitaliseFirstLetter = (word: string) => {
    if (word.length === 0) {
      return '';
    }
    if (word.length === 1) {
      return word[0].toUpperCase();
    }
    return word[0].toUpperCase() + word.slice(1);
  };

  const truncateText = (text: string, truncatedAmount: number) => {
    if (text.length >= truncatedAmount) {
      return text.slice(0, truncatedAmount - 1) + '...';
    } else {
      return text;
    }
  };

  const renderAddGarden = () => {
    if (user.username != loggedInUsername) return;
    const MyNewForm = Form.create<NewGardenFormProps>()(ConnectedNewGardenForm);
    return <MyNewForm user={user} dispatch={dispatch} />;
  };

  const removeGarden = (garden: Garden) => {
    deleteGarden(garden);
    const updated_user = { ...user };
    updated_user.gardens = updated_user.gardens.filter(g => {
      if (g.name === garden.name) {
        return false;
      } else {
        return true;
      }
    });
    dispatch(setUser(updated_user));
  };

  const renderBlogForm = () => {
    if (user.username != loggedInUsername) return;
    const MyNewForm = Form.create<NewBlogFormProps>()(ConnectedNewBlogForm);
    return <MyNewForm user={user} dispatch={dispatch} />;
  }

  const renderBlogs = () => {
    if (user.blogs.length > 0) {
      const b: any[] = [];
      user.blogs.forEach(blog => {
        const tags: any[] = [];
        blog.tags.forEach(tag => {
          tags.push(<Tag color='green'>{tag}</Tag>);
        });
        console.log(tags);
        b.push(
          <Timeline.Item>
            {blog.name}
            <br />
            {tags}
            <br />
            {blog.content}
          </Timeline.Item>
        );
      });

      return (
        <Card title='Recent Blogs'>
          {renderBlogForm()}
          <Timeline>{b}</Timeline>
        </Card>
      );
    } else {
      return <Card title='Recent Blogs'>{renderBlogForm()}</Card>;
    }
  };

  const renderUser = () => {
    if (isError) {
      return <Error error={error} />;
    } else if (user) {
      return (
        <div className='user-page'>
          <Row type='flex' justify='center' className='user-row'>
            <Card className='user-card'>
              <Col span={5}>
                <div className='userlogo-shadow'>
                  <Avatar size={200} className='userlogo' src={user.pictureURL} />
                </div>
              </Col>
              <Col span={19}>
                <div>
                  <h1 style={{ color: 'white' }} className='username'>
                    {capitaliseFirstLetter(user.username)}
                  </h1>
                </div>
              </Col>
            </Card>
          </Row>
          <Row>
            <Col span={16} className='left-column'>
              <Row className='user-row'>
                <Card title='Gardens' size='default'>
                  {renderAddGarden()}
                  <Divider />
                  <GardensDisplay
                    user={user}
                    removeGarden={removeGarden}
                    isLoggedInUser={user.username == loggedInUsername}
                  />
                </Card>
              </Row>
            </Col>
            <Col span={8} className='right-column'>
              <Row className='user-row'>
                <Card title='Favourite Plants'>
                  <List
                    itemLayout='horizontal'
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
              <Row className='user-row'>{renderBlogs()}</Row>
            </Col>
          </Row>
        </div>
      );
    }
  };

  return <div>{isLoading ? <Loading /> : renderUser()}</div>;
};
