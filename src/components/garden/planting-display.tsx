import { Alert, Col, Row, Spin, Card, Form, Input, Button, Popover, Descriptions, Badge, Icon } from 'antd/lib';
import * as React from 'react';
import { Planting } from '../../constants/types';

export interface PlantingDisplayProps {
    planting : Planting;
    isSelected : boolean;
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

  const renderPlanting = () => {
    let content = createContent();
    let cell;
    if (props.isSelected === true){
      cell = <div
                className='garden-cell garden-cell-selected'
                style={{ width: "100px", height: "100px", lineHeight: "100px" }}>
                {content}
            </div>
    } else {
      cell =<Badge count={109} style={{ backgroundColor: '#52c41a' }}>
              <div className='garden-cell' style={{ width: "100px", height: "100px", lineHeight: "100px" }}>
                  {content}
              </div>
            </Badge>
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