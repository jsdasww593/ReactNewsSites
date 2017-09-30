import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import ThLoader from "react-touch-loader";

export default class MobileList extends React.Component {
  constructor() {
    super();
    this.state = {
      news: "",
      count: 5,
      hasMore: 0,
      initializing: 1,
      refreshedAt: Date.now()
    };
  }
  componentWillMount() {
    var myFetchOptions = {
      method: "GET"
    };
    fetch(
      "http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" +
        this.props.type +
        "&count=" +
        this.state.count,
      myFetchOptions
    )
      .then(response => response.json())
      .then(json => this.setState({ news: json }));
  }
  loadMore(resolve) {
    setTimeout(() => {
      var count = this.state.count;
      this.setState({
        count: count + 5
      });
      var myFetchOptions = {
        method: "GET"
      };
      fetch(
        "http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" +
          this.props.type +
          "&count=" +
          this.state.count,
        myFetchOptions
      )
        .then(response => response.json())
        .then(json => {
          this.setState({ news: json });
        });
      this.setState({
        hasMore: count > 0 && count < 50
      });
      resolve();
    }, 2e3);
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        hasMore: 1,
        autoLoadMore: 1,
        initializing: 2
      });
    }, 2e3);
  }
  render() {
    var { hasMore, initializing, refreshedAt } = this.state;

    const { news } = this.state;
    const newsList = news.length
      ? news.map((newsItem, index) => (
          <section
            key={index}
            class="m_article list-item special_section clearfix"
          >
            <Link to={`/details/${newsItem.uniquekey}`}>
              <div class="m_article_img">
                <img src={newsItem.thumbnail_pic_s} />
              </div>
              <div class="m_article_info">
                <div class="m_article_title">
                  <span>{newsItem.title}</span>
                </div>
                <div class="m_article_desc clearfix">
                  <div class="m_article_desc_l">
                    <span class="m_article_channel">{newsItem.realtype}</span>
                    <span class="m_article_time">{newsItem.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </section>
        ))
      : "没有加载到任何新闻";
    return (
      <div>
        <Row>
          <Col span={24}>
            <ThLoader
              className="main"
              onLoadMore={this.loadMore.bind(this)}
              hasMore={hasMore}
              initializing={initializing}
            >
              {newsList}
            </ThLoader>
          </Col>
        </Row>
      </div>
    );
  }
}
