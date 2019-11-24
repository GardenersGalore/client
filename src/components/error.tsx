import * as React from 'react';
import { Row } from 'antd';

export interface ErrorProps {
  error: string;
}

export class Error extends React.Component<ErrorProps> {
  render() {
    return <Row style={{ display: 'flex', justifyContent: 'center', height: '400px' }}>{this.props.error}</Row>;
  }
}
