import { Badge, Button, message, Popconfirm, Popover } from 'antd/lib';
import * as React from 'react';
import { Planting, RootState } from '../../constants/types';
import { useSelector } from 'react-redux';
import { waterIcon } from '../icons/water-icon';
import { frostIcon } from '../icons/frost-icon';

export interface PlantingDisplayProps {
  planting: Planting; // current planting
  isSelected: boolean; // is current planting selected
  cellSizePx: string;
  renderNewPlantForm: any; // function for showing new plant form
  deletePlanting: any; // function to delete planting from garden
  isLoggedInUser: boolean; // is the owner of this planting the currently logged-in user?
}

export const PlantingDisplay: React.FC<PlantingDisplayProps> = (props: PlantingDisplayProps) => {
  const forecast = useSelector((state: RootState) => state.gg.forecast);
  const planting = props.planting;
  const createIcon = () => {
    let plantIcon;
    if (props.planting.plant.svg_icon === undefined) {
      plantIcon = '../../assets/unown_icon.svg';
    } else {
      const blob = new Blob([props.planting.plant.svg_icon], { type: 'image/svg+xml' });
      plantIcon = URL.createObjectURL(blob);
    }
    return plantIcon;
  };

  // what to do when user confirms deleting planting
  const confirm = (e: any) => {
    props.deletePlanting(planting);
    message.success('Planting Deleted');
  };

  // what to do when user cancels deleting planting
  const cancel = (e: any) => {
    message.error('Planting not deleted');
  };

  // create information "popover" above planting to show info
  const createPopover = (element: any) => {
    // user shouldn't be allowed to edit others' plants
    if (!props.isLoggedInUser && props.planting == null) return element;

    let popoverContent;
    let popoverTitle;
    if (props.planting != null) {
      popoverContent = (
        <div>
          <b>About:</b> {planting.description}
          <br/>
          <b>Date planted:</b> {planting.planted_at.toDateString}
          <br/>
          <b>Harvest count: </b> {planting.harvest_count}
          <br/>
          <b>Planted from:</b> {planting.planted_from}
          <br/>
          {props.isLoggedInUser ? (
            <Popconfirm
              title='Are you sure delete this planting?'
              onConfirm={confirm}
              onCancel={cancel}
              okText='Yes'
              cancelText='No'>
              <Button>Delete</Button>
            </Popconfirm>
          ) : (
            <div/>
          )}
        </div>
      );
      popoverTitle = props.planting.plant_name;
    } else {
      popoverContent = props.renderNewPlantForm();
    }
    return (
      <Popover content={popoverContent} title={popoverTitle} trigger='click'>
        {element}
      </Popover>
    );
  };

  const createContent = () => {
    let plantingInformation;
    if (props.planting != null) {
      const plantIcon = createIcon();
      plantingInformation = (
        <div className='garden-cell-occupied'>
          <img src={plantIcon} className='garden-plant-icon' alt={props.planting.plant_name}/>
        </div>
      );
    } else {
      plantingInformation = <div className='garden-cell-unoccupied'>+</div>;
    }
    return plantingInformation;
  };

  // which badge to display on planting (eg frost, water)
  const badgePlanting = (content: any) => {
    if (forecast && props.planting !== null) {
      if (forecast.data[0].snow > 0.5) {
        return (
          <Badge count={frostIcon()} offset={[-10, 0]}>
            <div
              className='garden-cell'
              style={{ width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx }}>
              {content}
            </div>
          </Badge>
        );
      } else if (forecast.data[0].rainfall_amount < 3 || forecast.data[0].rainfall_probability < 50) {
        return (
          <Badge count={waterIcon()} offset={[-10, 0]}>
            <div
              className='garden-cell'
              style={{ width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx }}>
              {content}
            </div>
          </Badge>
        );
      } else {
        return (
          <div
            className='garden-cell'
            style={{ width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx }}>
            {content}
          </div>
        );
      }
    } else {
      return (
        <div
          className='garden-cell'
          style={{ width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx }}>
          {content}
        </div>
      );
    }
  };

  const renderPlanting = () => {
    const content = createContent();
    let cell;
    if (props.isSelected === true) {
      cell = (
        <div
          className='garden-cell garden-cell-selected'
          style={{ width: props.cellSizePx, height: props.cellSizePx, lineHeight: props.cellSizePx }}>
          {content}
        </div>
      );
    } else {
      cell = badgePlanting(content);
    }

    return createPopover(cell);
  };

  return <div>{renderPlanting()}</div>;
};
