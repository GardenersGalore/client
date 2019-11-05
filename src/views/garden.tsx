import { Alert, Col, Row, Spin, Card, Descriptions } from 'antd/lib';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps} from 'react-router-dom';
import { RootState, Planting } from '../constants/types';
import { getPlantData, getGardenData} from '../store/actions';


type PathParamsType = {
  name: string,
}

// Your component own properties
type GardenProps = RouteComponentProps<PathParamsType> & {
}

type PlantingRetType = {
  res : Planting | null;
  found : boolean;
}

export const GardenView: React.FC<GardenProps> = (props : GardenProps) => {
  const dispatch = useDispatch();

  const garden = useSelector((state: RootState) => state.gg.garden);
  const error = useSelector((state: RootState) => state.gg.error);
  const isLoading = useSelector((state: RootState) => state.gg.isLoading);



  useEffect(() => {
    if (!garden){
      dispatch(getGardenData(props.match.params.name));
    }
    else if (garden.name != props.match.params.name){
      dispatch(getGardenData(props.match.params.name));
    }
  });

  const findPlanting = (plantings : Planting[], row_index:number, col_index :number) : (Planting | null) =>{
    //console.log(plantings, row_index, col_index);
    let r = null;
    plantings.forEach((planting) => {
      if (planting.x_coord === (row_index) && planting.y_coord === col_index){
        r = planting;
      }
    })
    return r;
  }

  const renderPlant = () => {
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

      let patch : any[] = [];

      for(let i = 0; i < garden.garden_height; i ++){
        let gardenrow : any[] = [];
        for(let j = 0; j < garden.garden_width; j ++){
          const p = findPlanting(garden.plantings, i, j);
          let z : any = null;
          if(p != null){
            console.log("PLANT IS");
            console.log(p.plant);
            const blob = new Blob([p.plant.svg_icon], {type: 'image/svg+xml'});
            const plant_icon = URL.createObjectURL(blob);
            z = <div className='garden-cell-occupied'><img src={plant_icon} className="plantIcon"></img></div>
          } else{
            z = <div className='garden-cell-unoccupied'>{j}</div>
          }
          gardenrow.push(<Col><div className='garden-cell'>{z}</div></Col>)
        }
        patch.push(<Row type='flex' justify='center' className='garden-row'>{gardenrow}</Row>)
      }

      console.log(garden);
      return (
        
        <div>
          <Card style={{ width: 1600 }}>
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
        renderPlant()
      )}
    </div>
  );
};
