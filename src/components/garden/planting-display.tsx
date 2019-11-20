import { Alert, Col, Row, Spin, Card, Form, Input, Button, Popover, Descriptions, Badge, Icon, Popconfirm, message } from 'antd/lib';
import * as React from 'react';
import { Planting } from '../../constants/types';

export interface PlantingDisplayProps {
    planting : Planting;
    isSelected : boolean;
    cellSizePx: string;
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
        </div>
      );
      popoverTitle = props.planting.plant_name;
    }
    else {
      popoverContent = "NONE";  //renderNewPlantForm();
      popoverTitle = "NONE";
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

  // const confirm = (e) => {
  //   console.log(e);
  //   message.success('Click on Yes');
  // }
  
  // const cancel = (e) => {
  //   console.log(e);
  //   message.error('Click on No');
  // }


  const badgePlanting = (content : any) => {
    console.log(props.cellSizePx);
    const badgeOffset = +(props.cellSizePx.slice(0,-2)); 
    return(
      // <Popconfirm
      // title="Are you sure delete this task?"
      // onConfirm={confirm}
      // onCancel={cancel}
      // okText="Yes"
      // cancelText="No"
      // >
      <Badge offset={[-10,0]}  count={8} style={{ backgroundColor: '#52c41a' }}>
        <Badge offset={[-badgeOffset,0]} count={<Icon type="minus-circle" style={{ color: '#FFFFFF' }} />} >
          <div className='garden-cell' style={{width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx}}>
              {content}
          </div>
        </Badge>
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
