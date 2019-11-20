import * as React from 'react';
import { Spin, Icon, Row } from 'antd';

export class Loading extends React.Component {
  render() {
    const antIcon = <Icon type='loading' style={{ fontSize: 48 }} spin />;
    return (
      <Row style={{ display: 'flex', justifyContent: 'center', height: '400px' }}>
        <div className='loading'>
          <Spin indicator={antIcon} />
        </div>
      </Row>
    );
  }
}
