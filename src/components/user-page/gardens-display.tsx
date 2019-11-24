import { Card, Divider, Icon, List, message, Popconfirm } from 'antd/lib';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Garden, RootState, User } from '../../constants/types';
import { setSelectedGarden } from '../../store/actions';
import { GardenDisplay } from './garden-display';
import Meta from 'antd/lib/card/Meta';

export interface GardensDisplayProps {
  user: User; // which user do we want to display gardens for
  removeGarden: any; // function for removing a garden
  isLoggedInUser: boolean; // is the owner of this garden the currently logged-in user?
}

export const GardensDisplay: React.FC<GardensDisplayProps> = (props: GardensDisplayProps) => {
  const gardens = useSelector((state: RootState) => state.gg.user.gardens); // gardens of user
  const dispatch = useDispatch(); // function for retrieving state
  const selectedGarden = useSelector((state: RootState) => state.gg.selectedGarden); // currently selected garden

  // check if garden is currently selected
  const isSelected = (gardenName: string) => {
    return gardenName === selectedGarden;
  };

  // change currently selected garden
  const toggleGardenSelected = (gardenName: string) => {
    const gardenDivider = document.getElementById('garden-divider');
    gardenDivider.scrollIntoView({ behavior: 'smooth' });
    isSelected(gardenName) ? dispatch(setSelectedGarden('')) : dispatch(setSelectedGarden(gardenName));
  };

  // what to do when user deletes garden
  const confirm = (e: Garden) => {
    props.removeGarden(e);
    message.success('Garden Deleted');
  };

  // what to do when user cancels deletion of garden
  const cancel = (e: any) => {
    message.error('Garden not deleted');
  };

  // show garden card containing basic overview
  const renderGardenCard = (garden: Garden) => {
    const cover = garden.pictureURL
      ? garden.pictureURL
      : 'https://i.pinimg.com/originals/14/07/a7/1407a7cb25ba944f12ca3d24535adefc.png';
    const actions = props.isLoggedInUser
      ? [<Icon type='delete' key='delete' onClick={() => props.removeGarden(garden)} />]
      : [];

    return (
      <List.Item key={garden.name}>
        <Card
          hoverable
          cover={<img alt='example' src={cover} />}
          actions={[
            <Popconfirm
              title='Are you sure delete this garden?'
              onConfirm={() => {
                confirm(garden);
              }}
              onCancel={cancel}
              okText='Yes'
              cancelText='No'>
              <Icon type='delete' key='delete' />
            </Popconfirm>,
          ]}>
          <Meta
            title={<a onClick={() => toggleGardenSelected(garden.name)}>{garden.name}</a>}
            description={garden.city_name}
          />
          {garden.description}
        </Card>
      </List.Item>
    );
  };

  // show list of user's gardens
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
      return (
        <Card size='default'>
          <GardenDisplay garden={g} isLoggedInUser={props.isLoggedInUser}/>
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
        renderItem={garden => renderGardenCard(garden)}/>
      <div id='garden-divider'>
        <Divider />
      </div>
      {renderGardens()}
    </div>
  );
};
