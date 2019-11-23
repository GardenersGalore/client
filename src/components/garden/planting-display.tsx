import { Popover, Badge, Icon, Button, Popconfirm, message} from 'antd/lib';
import * as React from 'react';
import { Planting } from '../../constants/types';

export interface PlantingDisplayProps {
    planting : Planting;
    isSelected : boolean;
    cellSizePx: string;
    renderNewPlantForm : any;
    deletePlanting : any;
    isLoggedInUser: boolean;
  }
  
export const PlantingDisplay: React.FC<PlantingDisplayProps> = (props: PlantingDisplayProps) => {


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
    if (!props.isLoggedInUser && props.planting == null) return element;

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
    return(

      <Badge offset={[-10,0]}  count={8} style={{ backgroundColor: '#52c41a' }}>
          <div className='garden-cell' style={{width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx}}>
              {content}
          </div>
      </Badge>
    // </Popconfirm>
    );
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
