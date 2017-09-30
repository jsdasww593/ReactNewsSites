import React from "react";
import { Row, Col, BackTop } from "antd";
import MobileHeader from "./mobile_header";
import MobileFooter from "./mobile_footer";
import CommpnComments from "./common_comments";

export default class MobileNewsDetails extends React.Component {
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
        document.title = "个人中心 - React News | React 驱动的新闻平台";
      });
  }
  createMakeUp() {
    return { __html: this.state.newsItem.pagecontent };
  }
  render() {
    return (
      <div id="mobileDetailesContainer">
        <MobileHeader />
        <Row>
          <Col span={24} class="container">
            <div
              class="articleContainer"
              dangerouslySetInnerHTML={this.createMakeUp()}
            />
            <hr />
            <CommpnComments uniquekey={this.props.match.params.uniquekey} />
          </Col>
        </Row>
        <MobileFooter />
        <BackTop />
      </div>
    );
  }
}
