import { Alert, Col, Row, Spin, Card, Form, Input, Button } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState, Planting } from '../constants/types';
import { getGardenData, setSelectedGardenCell } from '../store/actions';

type PathParamsType = {
  name: string;
};

// Your component own properties
type GardenProps = RouteComponentProps<PathParamsType> & {};

type PlantingRetType = {
  res: Planting | null;
  found: boolean;
};

export const GardenView: React.FC<GardenProps> = (props: GardenProps) => {
  const dispatch = useDispatch();

  const garden = useSelector((state: RootState) => state.gg.garden);
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);
  const selectedCell = useSelector((state: RootState) => state.gg.selectedGardenCell);

  useEffect(() => {
    if (!garden) {
      dispatch(getGardenData(props.match.params.name));
    } else if (garden.name != props.match.params.name) {
      dispatch(getGardenData(props.match.params.name));
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

  const renderGardenInfo = () => {
    return (
      <div className='garden-info'>
        <h1>{garden.name}</h1>

        <p className='garden-info-p'>
          <b>About:</b> {garden.description}
          <br />
          <b>Location:</b> {garden.location_name}
          <br />
          <b>User: </b> {garden.username}
        </p>
      </div>
    );
  };

  const renderPlantInfo = () => {
    const planting: Planting = findPlanting(garden.plantings, 1, 1);

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
    return (
      <div className='garden-info'>
        <h1>Add new plant</h1>
        <Form>
          <Form.Item label='Plant type'>
            <Input />
          </Form.Item>
          <Form.Item label='Date planted'>
            <Input />
          </Form.Item>
          <Form.Item label='Details'>
            <Input />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Done
            </Button>
          </Form.Item>
        </Form>
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
          let z: any = null;

          if (p != null) {
            console.log('PLANT IS');
            console.log(p.plant);
            const blob = new Blob([p.plant.svg_icon], { type: 'image/svg+xml' });
            const plantIcon = URL.createObjectURL(blob);

            z = (
              <div className='garden-cell-occupied'>
                <img src={plantIcon} className='garden-plant-icon' alt={p.plant_name} />
              </div>
            );
          } else {
            z = <div className='garden-cell-unoccupied'>+</div>;
          }

          const cellSize = (window.innerHeight * 0.8) / garden.garden_height - 8;
          const cellSizePx = cellSize + 'px';

          gardenRow.push(
            <Col className='garden-col' onClick={() => toggleSelected(i, j)}>
              {isSelected(i, j) ? (
                <div
                  className='garden-cell garden-cell-selected'
                  style={{ width: cellSizePx, height: cellSizePx, lineHeight: cellSizePx }}>
                  {z}
                </div>
              ) : (
                <div className='garden-cell' style={{ width: cellSizePx, height: cellSizePx, lineHeight: cellSizePx }}>
                  {z}
                </div>
              )}
            </Col>
          );
        }

        patch.push(
          <Row type='flex' justify='center' className='garden-row'>
            {gardenRow}
          </Row>
        );
      }

      console.log(garden);

      let info;

      if (isSelected(-1, -1)) {
        info = renderGardenInfo();
      } else if (findPlanting(garden.plantings, selectedCell[0], selectedCell[1]) != null) {
        info = renderPlantInfo();
      } else {
        info = renderNewPlantForm();
      }

      return (
        <div>
          <Card className='garden-card'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '70%' }}>{patch}</div>
              {info}
            </div>
          </Card>
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
        renderGarden()
      )}
    </div>
  );
};
