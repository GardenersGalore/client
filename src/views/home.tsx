import { Alert, Col, Row, Spin, Card, Descriptions, Icon } from 'antd/lib';
import * as React from 'react';

export const Home: React.FC = () => {

  const waterSVG = () => {
    return(
      <svg width="2em" height="2em" version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 508 508" >
   <circle fill="#324A5E" cx="254" cy="254" r="254"/>
   <path fill="#54C0EB" d="M252,414h4c62.8,0,115.2-50.4,114-113.2c0-8-1.2-15.6-2.8-22.8C360,246.4,324,210,298,170.8
     c-27.2-37.6-44-77.6-44-76.4c-0.4-0.8-17.2,39.2-44,76.4c-25.6,39.2-62,76-69.2,106.8c-2,7.2-2.8,14.8-2.8,22.8
     C136.8,363.2,189.2,414,252,414z"/>
   <g>
     <path fill="#84DBFF" d="M177.2,353.6c6-0.4,9.6-6,7.2-10.8c-3.2-7.2-6-14.8-7.2-22.8c-1.6-8-2-15.6-1.6-23.2
       c1.2-32,32-75.2,51.6-118.4c2-3.6,3.6-7.6,5.2-11.2c-0.8,1.2-1.6,2.4-2.4,3.2c-26.4,40.4-64,78.8-70.8,110
       c-1.6,7.2-2.4,15.2-2.4,23.2c0.4,16.8,4.8,32,12.4,46C171.2,352.4,174,354,177.2,353.6L177.2,353.6z"/>
     
       <ellipse transform="matrix(-0.042 -0.9991 0.9991 -0.042 -169.3631 569.6013)" fill="#84DBFF" cx="188.401" cy="365.998" rx="8.4" ry="9.2"/>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   <g>
   </g>
   </svg>)
    
  }

  const waterIcon = () => {
    return (
      <Icon component={waterSVG} style={{ color: '#1890ff' }} />
    )
  }

  return(
    <Row type='flex' justify='center'>
      <Card style={{ width: 1400 }}>
        {waterIcon()}
      </Card>
    </Row>
  )
  

};
