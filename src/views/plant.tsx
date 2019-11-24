import { Alert, Avatar, Card, Carousel, Col, Comment, Descriptions, Row, Spin, Tooltip } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState } from '../constants/types';
import { getPlantData } from '../store/actions';
import * as moment from 'moment';

const { Meta } = Card;
type PathParamsType = {
  name: string;
};

type PlantProps = RouteComponentProps<PathParamsType> & {};

export const Plant: React.FC<PlantProps> = (props: PlantProps) => {
  const dispatch = useDispatch();

  const plant = useSelector((state: RootState) => state.gg.plant);
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);
  const isError = useSelector((state: RootState) => state.gg.isError);

  useEffect(() => {
    if (!isLoading && !isError) {
      console.log('NOT LOADING');
      if (!plant) {
        dispatch(getPlantData(props.match.params.name));
      } else if (plant.name != props.match.params.name) {
        dispatch(getPlantData(props.match.params.name));
      }
    }
  });

  // show carousel of pictures users have uploaded
  const renderCarousel = () => {
    if (plant.plantings === undefined) {
      return <div>No pictures of {plant.name} in people's gardens!</div>;
    } else {
      const c: any[] = [];
      plant.plantings.forEach(p => {
        console.log(p);
        if (p.pictureURL !== undefined) {
          c.push(
            <div className='carosel-cl'>
              <Card
                hoverable
                bordered={false}
                style={{ width: 300 }}
                cover={<img alt='example' src={p.pictureURL} width={200} />}>
                <Meta
                  title={<a href={`/user/${p.garden.username}`}>{p.garden_name}</a>}
                  description={'Planted by: ' + p.garden.username}
                />
              </Card>
            </div>
          );
        }
      });

      return c;
    }
  };

  // show top tips from advanced gardeners
  const renderTopTips = () => {
    if (plant.blogs === undefined) {
      return (
        <div>
          <Card title='Top Tips'> There are currently no top tips!</Card>;
        </div>
      );
    }

    const b: any[] = [];
    plant.blogs.forEach(blog => {
      let d: any = null;
      if (blog.date !== undefined) {
        d = moment(blog.date);
        console.log(d);
      }
      b.push(
        <Comment
          author={<a>{blog.username}</a>}
          avatar={<Avatar src={blog.user.pictureURL} alt='' />}
          content={<p>{blog.content}</p>}
          datetime={
            <Tooltip title={d.format('YYYY-MM-DD HH:mm:ss')}>
              <span>{d.fromNow()}</span>
            </Tooltip>
          }
        />
      );
    });
    return <Card title='Top Tips'>{b}</Card>;
  };

  const renderPlant = () => {
    if (error) {
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-content'>
            <Col xs={24} sm={24} md={18} lg={16} xl={16}>
              <Alert message='Error' description={error} type='error' showIcon={true} />
            </Col>
          </Row>
        </div>
      );
    } else if (plant) {
      const blob = new Blob([plant.svg_icon], { type: 'image/svg+xml' });
      const plant_icon = URL.createObjectURL(blob);
      console.log(plant);
      return (
        <div className='user-page' style={{ paddingTop: '10px' }}>
          <Col span={16} className='left-column'>
            <Row type='flex' justify='center'>
              <Card style={{ width: 1400 }}>
                <img src={plant_icon} className='plantIcon' alt='plant icon'/>
                <strong className='plantName'>
                  <a href={plant.en_wikipedia_url}>{plant.name}</a>
                </strong>
                <small>{plant.binomial_name}</small>
                <br/>
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
          </Col>
          <Col span={8} className='right-column'>
            <Row>
              <Card title={'People Who Have Planted A ' + plant.name} size='default'>
                <Carousel autoplay>{renderCarousel()}</Carousel>
              </Card>
            </Row>
            <Row>{renderTopTips()}</Row>
          </Col>
        </div>
      );
    }
  };

  return (
    <div>
      {isLoading ? (
        <Row type='flex' justify='center' className='fetching-content'>
          <Spin size='large' />
          <h2>Loading...</h2>
        </Row>
      ) : (
        renderPlant()
      )}
    </div>
  );
};
