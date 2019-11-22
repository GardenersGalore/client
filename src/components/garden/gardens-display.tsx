import { Card, List, Divider, Icon } from 'antd/lib';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Garden, User } from '../../constants/types';
import { setSelectedGarden, setGarden } from '../../store/actions';
import { GardenDisplay } from './garden-display';
import Meta from 'antd/lib/card/Meta';

export interface GardensDisplayProps {
  user: User;
  removeGarden : any;
}

export const GardensDisplay: React.FC<GardensDisplayProps> = (props: GardensDisplayProps) => {
  // const gardens = props.user.gardens;
  const gardens = useSelector((state: RootState) => state.gg.user.gardens);
  const dispatch = useDispatch();
  const selectedGarden = useSelector((state: RootState) => state.gg.selectedGarden);

  const isSelected = (gardenName: string) => {
    return gardenName === selectedGarden;
  };

  const toggleGardenSelected = (gardenName: string) => {
    isSelected(gardenName) ? dispatch(setSelectedGarden('')) : dispatch(setSelectedGarden(gardenName));
  };

  const renderGardenCard = (garden: Garden) => {
    return (
      <List.Item key={garden.name}>
        <Card
          hoverable
          cover={
            <img alt='example' src='https://i.pinimg.com/originals/14/07/a7/1407a7cb25ba944f12ca3d24535adefc.png' />
          }
          actions={[
            <Icon type='delete' key='delete' onClick={() => props.removeGarden(garden)} />,
          ]}
          onClick={() => toggleGardenSelected(garden.name)}>
          <Meta title={<a href={`/garden/${garden.name}`}>{garden.name}</a>} description={garden.location_name} />
          {garden.description}
        </Card>
      </List.Item>
    );
  };

  const renderGardens = () => {
    let renderGarden = false;
    let g: Garden = null;
    gardens.forEach(garden => {
      if (garden.name == selectedGarden) {
        renderGarden = true;
        g = garden;
      }
    });
    if (renderGarden) {
      // console.log("RENDERING GARDEN");
      // dispatch(setGarden(g));
      return (
        <Card size='default'>
          <GardenDisplay garden={g}></GardenDisplay>
        </Card>
      );
    } else {
      return <div />;
    }
  };

  return (
    <div>
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
        renderItem={garden => renderGardenCard(garden)}></List>
      <Divider />
      {renderGardens()}
    </div>
  );
};
