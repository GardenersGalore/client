import { Alert, Col, Row, Spin, Card, Form, Input, Button, Popover, Descriptions, Badge, Icon } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { getPlant, getGardens, getGarden, getPlantings, postPlanting } from '../api';
import { FormComponentProps } from 'antd/lib/form/Form';
import { useDispatch, useSelector, connect } from 'react-redux';
import { Planting, RootState, Garden } from '../constants/types';
import { NewPlantingForm, NewPlantingProps } from '../components/new-planting-form';
import { addPlantingToGarden, setGarden, setSelectedGardenCell, getGardenData } from '../store/actions';

export interface GardenDisplayProps {
  gardenName : string;
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
          console.log('GETTING DATA AS NO GARDEN THIS WAY');
          dispatch(getGardenData(props.gardenName));
        } else if (garden.name != props.gardenName) {
          console.log('GETTING DATA THIS WAY');
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
        <div className='garden-info'>
          <h1>{garden.name}</h1>
  
          <p className='garden-info-p'>
            <b>About:</b> {garden.description}
            <br />
            <b>Location:</b> {garden.location_name}
            <br />
            <b>User:</b> {garden.username}
            <br />
            <b>Width:</b> {garden.garden_width}
            <b className='garden-size-button' onClick={() => setWidth(garden.garden_width - 1)}>
              {' '}
              -{' '}
            </b>
            <b className='garden-size-button' onClick={() => setWidth(garden.garden_width + 1)}>
              {' '}
              +{' '}
            </b>
            <br />
            <b>Height:</b> {garden.garden_height}
            <b className='garden-size-button' onClick={() => setHeight(garden.garden_height - 1)}>
              {' '}
              -{' '}
            </b>
            <b className='garden-size-button' onClick={() => setHeight(garden.garden_height + 1)}>
              {' '}
              +{' '}
            </b>
          </p>
        </div>
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
            let z: any = null;
            let content;
            let title;
            


            if (p != null) {
                let plantIcon;
                if (p.plant.svg_icon === undefined){
                    console.log("this plant does not have icon: ", p.plant);
                    plantIcon = "../assets/unown_icon.svg";
                } else{
                    const blob = new Blob([p.plant.svg_icon], { type: 'image/svg+xml' });
                    plantIcon = URL.createObjectURL(blob);
                }
  
              z = (
                <div className='garden-cell-occupied'>
                  <img src={plantIcon} className='garden-plant-icon' alt={p.plant_name} />
                </div>
              );

              content = (
                <div>
                <p>content</p>
                <p>Content</p>
                </div>
              );
              title = p.plant_name;
            } else {
              z = <div className='garden-cell-unoccupied'>+</div>;

              content = renderNewPlantForm();
              title = "NONE"
            }
   

            gardenRow.push(
              <Col className='garden-col' onClick={() => toggleSelected(i, j)}>
                {isSelected(i, j) ? (
                    <Popover content={content} title={title} trigger="click">
                        <div
                            className='garden-cell garden-cell-selected'
                            style={{ width: "100px", height: "100px", lineHeight: "100px" }}>
                            {z}
                        </div>
                    </Popover>
                ) : (
                  <Popover content={content} title={title} trigger="click">
                    <Badge count={109} style={{ backgroundColor: '#52c41a' }}>
                    <div className='garden-cell' style={{ width: "100px", height: "100px", lineHeight: "100px" }}>
                        {z}
                    </div>
                    </Badge>

                    
                  </Popover>
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

  
        return (
          <div>
            <Descriptions title="Garden Info" bordered size="small">
                <Descriptions.Item label="Garden Height">
                    <Button type="primary" icon="minus" size="small"/>
                    5
                    <Button type="primary" icon="plus" size="small"/> 
                </Descriptions.Item>
                <Descriptions.Item label="Garden Width">5</Descriptions.Item>
                <Descriptions.Item label="Automatic Renewal">YES</Descriptions.Item>
            </Descriptions>
            <Card className='garden-card'>
                {patch}
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
  