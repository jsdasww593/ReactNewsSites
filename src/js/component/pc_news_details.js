import React from "react";
import { Row, Col, BackTop } from "antd";
import PcHeader from "./pc_header";
import PcFooter from "./pc_footer";
import PcNewsImage from "./pc_news_image_block";
import CommonComments from "./common_comments";

export default class PcNewsDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      newsItem: ""
    };
  }
  componentDidMount() {
    var getOptions = {
      method: "GET"
    };
    fetch(
      "http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=" +
        this.props.match.params.uniquekey,
      getOptions
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ newsItem: json });
        document.title =
          this.state.newsItem.title + " - React News | React 驱动的新闻平台";
      });
  }
  createMakeUp() {
    return { __html: this.state.newsItem.pagecontent };
  }
  render() {
    return (
      <div>
        <PcHeader />
        <Row>
          <Col span={2} />
          <Col span={14} class="container">
            <div
              class="articleContainer"
              dangerouslySetInnerHTML={this.createMakeUp()}
            />
            <hr />
            <CommonComments uniquekey={this.props.match.params.uniquekey} />
          </Col>
          <Col span={6}>
            <PcNewsImage
              count={40}
              type={"yule"}
              width="100%"
              cardTitle="相关新闻"
              imageWidth="150px"
            />
          </Col>
          <Col span={2} />
        </Row>
        <PcFooter />
        <BackTop />
      </div>
    );
  }
}
