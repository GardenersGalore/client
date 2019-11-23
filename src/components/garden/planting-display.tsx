import { Popover, Badge, Icon, Button, Popconfirm, message} from 'antd/lib';
import * as React from 'react';
import { Planting, RootState } from '../../constants/types';
import { useSelector } from 'react-redux';
import { waterIcon } from './water-icon';
import { frostIcon } from './frost-icon';

export interface PlantingDisplayProps {
    planting : Planting;
    isSelected : boolean;
    cellSizePx: string;
    renderNewPlantForm : any;
    deletePlanting : any;
    isLoggedInUser: boolean;
  }
  
export const PlantingDisplay: React.FC<PlantingDisplayProps> = (props: PlantingDisplayProps) => {

  const forecast = useSelector((state: RootState) => state.gg.forecast);


  const planting = props.planting;
  const createIcon = () => {
      let plantIcon;
      if (props.planting.plant.svg_icon === undefined){
        plantIcon = "../../assets/unown_icon.svg";
      } else{
          const blob = new Blob([props.planting.plant.svg_icon], { type: 'image/svg+xml' });
          plantIcon = URL.createObjectURL(blob);
      }
      return plantIcon;
  }

  const confirm = (e : any) => {
    props.deletePlanting(planting);
    message.success('Planting Deleted');
  }
  
  const cancel = (e : any) => {
    console.log(e);
    message.error('Planting not deleted');
  }


  const createPopover = (element : any) => {
    let popoverContent;
    let popoverTitle;
    if (props.planting != null){
      popoverContent = (
        <div>
          <b>About:</b> {planting.description}
          <br />
          <b>Date planted:</b> {planting.planted_at.toDateString}
          <br />
          <b>Harvest count: </b> {planting.harvest_count}
          <br />
          <b>Planted from:</b> {planting.planted_from}
          <br />
          {props.isLoggedInUser ? (
            <Popconfirm
              title="Are you sure delete this planting?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button>
                Delete
              </Button>
            </Popconfirm>
          ) : (<div />)}

        </div>
      );
      popoverTitle = props.planting.plant_name;
    }
    else {
      popoverContent = props.renderNewPlantForm();
    }
    return(
      <Popover content={popoverContent} title={popoverTitle} trigger="click">
        {element}
      </Popover>
    )
  }

  const createContent = () => {
    let plantingInformation;
    if (props.planting != null) {
      let plantIcon = createIcon();
      plantingInformation = (
        <div className='garden-cell-occupied'>
          <img src={plantIcon} className='garden-plant-icon' alt={props.planting .plant_name} />
        </div>
      );

    } else {
      plantingInformation = <div className='garden-cell-unoccupied'>+</div>;

    }
    return plantingInformation
  }

  const badgePlanting = (content : any) => {
    if(forecast && props.planting !== null){
      if (forecast.data[0].snow > 0.5){
        return(
          <Badge count={frostIcon()} offset={[-10,0]}>
              <div className='garden-cell' style={{width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx}}>
                  {content}
              </div>
          </Badge>
        );
      } 
      else if(forecast.data[0].rainfall_amount < 3 || forecast.data[0].rainfall_probability < 50){
        return(
          <Badge count={waterIcon()} offset={[-10,0]}>
              <div className='garden-cell' style={{width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx}}>
                  {content}
              </div>
          </Badge>
        );
      }    
      else {
        return(
          <div className='garden-cell' style={{width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx}}>
              {content}
          </div>
        )
      }


    } else {
      return(
        <div className='garden-cell' style={{width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx}}>
            {content}
        </div>
      )
    }


  }

  const renderPlanting = () => {
    let content = createContent();
    let cell;
    if (props.isSelected === true){
      cell = <div
                className='garden-cell garden-cell-selected' style={{width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx}}>
                {content}
            </div>
    } else {
      cell = badgePlanting(content);
    }

    let popover = createPopover(cell);

    return (
      popover
    );
  }

  return (
    <div>
      {renderPlanting()}
    </div>
  );

}
