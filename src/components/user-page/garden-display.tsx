import { Alert, Button, Card, Col, Descriptions, Divider, Form, Row } from 'antd/lib';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Garden, Planting, RootState } from '../../constants/types';
import { NewPlantingForm, NewPlantingProps } from './new-planting-form';
import { setGarden, setSelectedGardenCell } from '../../store/actions';
import { PlantingDisplay } from './planting-display';
import { Loading } from '../loading';
import { deletePlanting } from '../../api';
import { WeatherDisplay } from './weather-display';

export interface GardenDisplayProps {
  garden: Garden;
  isLoggedInUser: boolean; // is the owner of this garden the currently logged-in user?
}

export const GardenDisplay: React.FC<GardenDisplayProps> = (props: GardenDisplayProps) => {
  const dispatch = useDispatch();

  // get the currently selected garden
  const garden = useSelector((state: RootState) => {
    let selected: Garden = null;
    state.gg.user.gardens.forEach(g => {
      if (props.garden.name == g.name) {
        selected = g;
      }
    });
    if (selected === null) {
      selected = props.garden;
    }
    return selected;
  });

  const isLoading = useSelector((state: RootState) => state.gg.isLoading); // true when loading, false when results loaded
  const selectedCell = useSelector((state: RootState) => state.gg.selectedGardenCell); // currently selected cell in garden
  const error = useSelector((state: RootState) => state.gg.error); // error message, if it exists

  // find planting in current garden
  const findPlanting = (plantings: Planting[], rowIndex: number, colIndex: number): Planting | null => {
    let r = null;
    plantings.forEach(planting => {
      if (planting.x_coord === rowIndex && planting.y_coord === colIndex) {
        r = planting;
      }
    });
    return r;
  };

  // is cell (x, y) currently selected?
  const isSelected = (x: number, y: number) => {
    return x == selectedCell[0] && y == selectedCell[1];
  };

  // select/deselect a cell
  const toggleSelected = (x: number, y: number) => {
    if (!isSelected(x, y)) {
      dispatch(setSelectedGardenCell(x, y));
    }
  };

  // change height of garden
  const setHeight = (newHeight: number) => {
    const new_garden = { ...garden };
    new_garden.garden_height = newHeight;
    dispatch(setGarden(new_garden));
  };

  // change width of garden
  const setWidth = (newWidth: number) => {
    const new_garden = { ...garden };
    new_garden.garden_width = newWidth;
    dispatch(setGarden(new_garden));
  };

  // remove a planting from the current garden
  const deleteAPlanting = (planting: Planting) => {
    const new_garden = { ...garden };
    new_garden.plantings = new_garden.plantings.filter(p => {
      return !(p.x_coord === planting.x_coord && p.y_coord === planting.y_coord);
    });
    dispatch(setGarden(new_garden)); // refresh garden
    deletePlanting(planting); // call API
  };

  // use to calculate displayed width and height of cells
  const calculateCellSize = () => {
    const cellSize = (window.innerWidth * 0.35) / garden.garden_width - 8;
    return cellSize + 'px';
  };

  // show info about current garden
  const renderGardenInfo = () => {
    return (
      <Descriptions title={garden.name} size='small'>
        <Descriptions.Item label='Garden Height'>
          <Button type='primary' icon='minus' size='small' onClick={() => setHeight(garden.garden_height - 1)}/>
          <b style={{ padding: '6px' }}>{garden.garden_height}</b>
          <Button type='primary' icon='plus' size='small' onClick={() => setHeight(garden.garden_height + 1)}/>
        </Descriptions.Item>
        <Descriptions.Item label='Garden Width'>
          <Button type='primary' icon='minus' size='small' onClick={() => setWidth(garden.garden_width - 1)}/>
          <b style={{ padding: '6px' }}>{garden.garden_width}</b>
          <Button type='primary' icon='plus' size='small' onClick={() => setWidth(garden.garden_width + 1)}/>
        </Descriptions.Item>
        {garden.description != null ? (
          <Descriptions.Item label='About'>{garden.description}</Descriptions.Item>
        ) : (
          <div/>
        )}
        {garden.city_name != null ? <Descriptions.Item label='City'>{garden.city_name}</Descriptions.Item> : <div/>}
        {garden.country_name != null ? (
          <Descriptions.Item label='Country'>{garden.country_name}</Descriptions.Item>
        ) : (
          <div/>
        )}
      </Descriptions>
    );
  };

  // form for adding a planting to a garden
  const renderNewPlantForm = () => {
    const MyNewForm = Form.create<NewPlantingProps>()(NewPlantingForm);

    return (
      <div>
        Add new plant
        <MyNewForm garden={garden} dispatch={dispatch} xcoord={selectedCell[0]} ycoord={selectedCell[1]}/>
      </div>
    );
  };

  // show garden
  const renderGarden = () => {
    if (error) {
      return (
        <div>
          <Row type='flex' justify='center' className='fetching-content'>
            <Col xs={24} sm={24} md={18} lg={16} xl={16}>
              <Alert message='Error' description={error} type='error' showIcon={true}/>
            </Col>
          </Row>
        </div>
      );
    } else if (garden) {
      const patch: any[] = [];
      const cellSizePx = calculateCellSize();

      for (let i = 0; i < garden.garden_height; i++) {
        const gardenRow: any[] = [];

        for (let j = 0; j < garden.garden_width; j++) {
          const p = findPlanting(garden.plantings, i, j);

          gardenRow.push(
            <Col className='garden-col' onClick={() => toggleSelected(i, j)}>
              <PlantingDisplay
                isSelected={isSelected(i, j)}
                planting={p}
                cellSizePx={cellSizePx}
                renderNewPlantForm={renderNewPlantForm}
                deletePlanting={deleteAPlanting}
                isLoggedInUser={props.isLoggedInUser}
              />
            </Col>,
          );
        }

        patch.push(
          <Row type='flex' justify='center' className='garden-row'>
            {gardenRow}
          </Row>,
        );
      }

      return (
        <div>
          {renderGardenInfo()}
          <Card className='garden-card'>{patch}</Card>
          <Divider/>
          <h3>Weather</h3>
          <WeatherDisplay city_name={garden.city_name} country_name={garden.country_name}/>
        </div>
      );
    }
  };

  return <div>{isLoading ? <Loading/> : renderGarden()}</div>;
};
