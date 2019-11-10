import { Alert, Col, Row, Spin, Card } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { RootState, Planting } from '../constants/types';
import { getGardenData } from '../store/actions';

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

  let selectedCell: [number, number] = [0, 1];

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

  const setSelected = (x: number, y: number) => {
    selectedCell = [x, y];
    console.log(selectedCell[0]);
    this.for;
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
            <Col className='garden-col' onClick={() => setSelected(i, j)}>
              {selectedCell[0] == i && selectedCell[1] == j ? (
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

      return (
        <div>
          <Card className='garden-card'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '70%' }}>{patch}</div>
              <div className='garden-info'>
                <h2>{garden.name}</h2>
              </div>
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
