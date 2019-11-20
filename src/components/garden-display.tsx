import { Alert, Col, Row, Spin, Card, Form, Input, Button, Popover, Descriptions, Badge, Icon } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { getPlant, getGardens, getGarden, getPlantings, postPlanting } from '../api';
import { FormComponentProps } from 'antd/lib/form/Form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Planting, RootState, Garden } from '../constants/types';
import { NewPlantingForm, NewPlantingProps } from '../components/new-planting-form';
import { addPlantingToGarden, setGarden, setSelectedGardenCell, getGardenData } from '../store/actions';
import { PlantingDisplay } from './garden/planting-display';
import { Loading } from './loading';

export interface GardenDisplayProps {
  gardenName: string;
}

export const GardenDisplay: React.FC<GardenDisplayProps> = (props: GardenDisplayProps) => {
  const dispatch = useDispatch();

  const garden = useSelector(
    (state: RootState) => state.gg.garden,
    (left: Garden, right: Garden) => {
      if (left === right) {
        console.log('IN THE SELECTOR :D');
        console.log(left, right);
        if (left.garden_height === right.garden_height && left.garden_width === right.garden_width) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  );
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);
  const selectedCell = useSelector((state: RootState) => state.gg.selectedGardenCell);

  useEffect(() => {
    if (!isLoading) {
      if (!garden) {
        dispatch(getGardenData(props.gardenName));
      } else if (garden.name != props.gardenName) {
        dispatch(getGardenData(props.gardenName));
      }
    }
  });

  const findPlanting = (plantings: Planting[], rowIndex: number, colIndex: number): Planting | null => {
    //console.log(plantings, rowIndex, colIndex);
    let r = null;
    plantings.forEach(planting => {
      if (planting.x_coord === rowIndex && planting.y_coord === colIndex) {
        r = planting;
      }
    });
    return r;
  };

  const isSelected = (x: number, y: number) => {
    return x == selectedCell[0] && y == selectedCell[1];
  };

  const toggleSelected = (x: number, y: number) => {
    isSelected(x, y) ? dispatch(setSelectedGardenCell(-1, -1)) : dispatch(setSelectedGardenCell(x, y));
  };

  const setHeight = (newHeight: number) => {
    const new_garden = { ...garden };
    new_garden.garden_height = newHeight;
    dispatch(setGarden(new_garden));
  };

  const setWidth = (newWidth: number) => {
    const new_garden = { ...garden };
    new_garden.garden_width = newWidth;
    dispatch(setGarden(new_garden));
  };

  const calculateCellSize = () => {
    const cellHeight = 100 / garden.garden_height;
    const cellWidth = 100 / garden.garden_width;
    const cellSize = Math.min(cellHeight, cellWidth);
    return cellSize + '%';
  };

  const renderGardenInfo = () => {
    return (
      <Descriptions title={garden.name} size='small'>
        <Descriptions.Item label='Garden Height'>
          <Button type='primary' icon='minus' size='small' onClick={() => setHeight(garden.garden_height - 1)} />
          <b style={{ padding: '6px' }}>{garden.garden_height}</b>
          <Button type='primary' icon='plus' size='small' onClick={() => setHeight(garden.garden_height + 1)} />
        </Descriptions.Item>
        <Descriptions.Item label='Garden Width'>
          <Button type='primary' icon='minus' size='small' onClick={() => setWidth(garden.garden_width - 1)} />
          <b style={{ padding: '6px' }}>{garden.garden_width}</b>
          <Button type='primary' icon='plus' size='small' onClick={() => setWidth(garden.garden_width + 1)} />
        </Descriptions.Item>
        {garden.description != null ? (
          <Descriptions.Item label='About'>{garden.description}</Descriptions.Item>
        ) : (
          <div />
        )}
        {garden.location_name != null ? (
          <Descriptions.Item label='Location'>{garden.location_name}</Descriptions.Item>
        ) : (
          <div />
        )}
      </Descriptions>
    );
  };

  const renderPlantInfo = () => {
    const planting: Planting = findPlanting(garden.plantings, selectedCell[0], selectedCell[1]);

    return (
      <div className='garden-info'>
        <h1>{planting.plant_name}</h1>

        <p className='garden-info-p'>
          <b>About:</b> {planting.description}
          <br />
          <b>Date planted:</b> {planting.planted_at.toDateString}
          <br />
          <b>Harvest count: </b> {planting.harvest_count}
          <br />
          <b>Planted from:</b> {planting.planted_from}
          {/*TODO: more*/}
        </p>
      </div>
    );
  };

  const renderNewPlantForm = () => {
    const MyNewForm = Form.create<NewPlantingProps>()(NewPlantingForm);

    return (
      <div className='garden-info'>
        <h1>Add new plant</h1>
        <MyNewForm garden={garden} dispatch={dispatch} xcoord={selectedCell[0]} ycoord={selectedCell[1]} />
      </div>
    );
  };

  const renderGarden = () => {
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
    } else if (garden) {
      const patch: any[] = [];

      for (let i = 0; i < garden.garden_height; i++) {
        const gardenRow: any[] = [];

        for (let j = 0; j < garden.garden_width; j++) {
          const p = findPlanting(garden.plantings, i, j);

          gardenRow.push(
            <Col className='garden-col' onClick={() => toggleSelected(i, j)}>
              <PlantingDisplay isSelected={isSelected(i, j)} planting={p} />
            </Col>
          );
        }

        patch.push(
          <Row type='flex' justify='center' className='garden-row'>
            {gardenRow}
          </Row>
        );
      }

      return (
        <div>
          {renderGardenInfo()}
          <Card className='garden-card'>{patch}</Card>
        </div>
      );
    }
  };

  return <div>{isLoading ? <Loading /> : renderGarden()}</div>;
};
