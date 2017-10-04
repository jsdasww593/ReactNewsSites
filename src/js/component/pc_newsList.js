import React from 'react';
import {Row, Col, Card} from 'antd';
// import PcNewsImage from './pc_news_image_block';
import PcNewsPageList from './pc_news_pageList.js';
import PcHeader from './pc_header';
import PcFooter from './pc_footer';

export default class PcNewsList extends React.Component {
  constructor() {
    super();
    this.state = {
      carTitle: ''
    };
  }
  componentWillMount() {
    switch (this.props.match.params.type) {
      case 'top':
        this.setState({carTitle: '头条'});
        break;
      case 'shehui':
        this.setState({carTitle: '社会'});
        break;
      case 'guonei':
        this.setState({carTitle: '国内'});
        break;
      case 'guoji':
        this.setState({carTitle: '国际'});
        break;
      case 'yule':
        this.setState({carTitle: '娱乐'});
        break;
      case 'tiyu':
        this.setState({carTitle: '体育'});
        break;
      case 'keji':
        this.setState({carTitle: '科技'});
        break;
      case 'shishang':
        this.setState({carTitle: '时尚'});
        break;
    }
  }
  componentDidMount() {
    document.title = this.state.carTitle + '- React News | React 驱动的新闻平台';
  }
  render() {
    return (
      <div>
        <PcHeader currentTitle={this.props.match.params.type}/>
        <Row>
          <Col span={2}/>
          <Col span={20}>
            <PcNewsPageList
              type={this.props.match.params.type}
              cartTitle={this.state.carTitle}
              width='100%'
              imageWidth='278px'
              fontSize='16px'/>
          </Col>
          <Col span={2}/>
        </Row>
        <PcFooter/>
      </div>
    );
  }
}
