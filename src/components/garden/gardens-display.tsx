import { Card, List, Divider, Icon } from 'antd/lib';
import * as React from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { RootState, Garden, User } from '../../constants/types';
import { setSelectedGarden } from '../../store/actions';
import { GardenDisplay } from '../garden/garden-display'
import Meta from 'antd/lib/card/Meta';

export interface GardensDisplayProps {
  user : User;
}

export const GardensDisplay: React.FC<GardensDisplayProps> = (props: GardensDisplayProps) => {
    const user = props.user;
    const dispatch = useDispatch();
    const selectedGarden = useSelector((state : RootState) => state.gg.selectedGarden)
  
    const isSelected = (gardenName : string) => {
        return gardenName === selectedGarden;
      };
    
    const toggleGardenSelected = (gardenName : string) => {
        isSelected(gardenName) ? dispatch(setSelectedGarden("")) : dispatch(setSelectedGarden(gardenName));
    };

    const renderGardenCard = (garden : Garden) =>{
        return (<List.Item>
            <Card
              hoverable
              cover={<img alt="example" src="https://i.pinimg.com/originals/14/07/a7/1407a7cb25ba944f12ca3d24535adefc.png" />}
              actions={[
                <Icon type="setting" key="setting" />,
                <Icon type="edit" key="edit" />,
                <Icon type="ellipsis" key="ellipsis" />,
              ]}
              onClick={() => toggleGardenSelected(garden.name)}
            >
              <Meta title={<a href={`/garden/${garden.name}`}>{garden.name}</a>} description={garden.location_name} />
              {garden.description}
            </Card>                     
            </List.Item>);
  }

  const renderGardens = () => {
    let renderGarden : boolean = false;
    let g : Garden = null;
    user.gardens.forEach(garden => {
        if(garden.name == selectedGarden){
            renderGarden = true;
            g = garden;
        }
    });     
    if (renderGarden){
      return (
        <Card size="default" >
            <GardenDisplay garden={g}>
            </GardenDisplay>
        </Card>
      )
    }
    else {
        return (
            <div/>
        )
    }
  }

  
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
            dataSource={props.user.gardens}
            renderItem={garden => (
            renderGardenCard(garden)
            )}>
        </List>
        <Divider/>
        {renderGardens()}
        </div>
    );
  };
  
