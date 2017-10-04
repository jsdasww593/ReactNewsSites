import React from 'react';
import { Row, Col } from 'antd';

export default class MobileFooter extends React.Component {
  render() {
    return (
      <footer style={{ paddingBottom: '10px' }}>
        <Row>
          <Col span={2} />
          <Col span={20} class='footer'>
            &copy;&nbsp;2016 ReactNews. All Rights Reserved.
          </Col>
          <Col span={2} />
        </Row>
      </footer>
    );
  }
}
