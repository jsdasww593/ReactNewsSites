import React from 'react';
import Card from 'antd/lib/card';
import Pagination from 'antd/lib/pagination';
import {Link} from 'react-router-dom';

export default class PcNewsImageBlock extends React.Component {
  constructor() {
    super();
    this.state = {
      news: [],
      total: 0,
      pageSize: 20,
      current: 1
    };
  }
  componentWillMount(pageSize = 20, page = 0) {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=' + pageSize, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        let arr = [],
          pageSize = this.state.pageSize;
        arr.push(json);
        this.setState({
          news: arr[0].splice(pageSize * page)
        });
      });
  }
  componentDidMount() {
    var myFetchOptions = {
      method: 'GET'
    };
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=' + this.props.type + '&count=0', myFetchOptions)
      .then(response => response.json())
      .then(json => {
        const newsLen = json.length;
        this.setState({total: newsLen});
      });
  }
  pageChange(page) {
    this.setState({current: page});
    this.componentWillMount(page * this.state.pageSize, page - 1);
  }
  render() {
    const {news} = this.state;
    const styleImage = {
      display: 'block',
      width: this.props.imageWidth
    };
    const styeH3 = {
      width: this.props.imageWidth,
      fontSize: this.props.fontSize,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    };
    const newsList = news.length
      ? news.map((newsItem, index) => (
        <div key={index} class='imageblock'>
          <Link to={`/details/${newsItem.uniquekey}`} target='_blank'>
            <div class='custom-image'>
              <img src={newsItem.thumbnail_pic_s} style={styleImage}/>
            </div>
            <div class='custom-card'>
              <h3 style={styeH3}>{newsItem.title}</h3>
              <p>{newsItem.author_name}</p>
            </div>
          </Link>
        </div>
      ))
      : '没有加载到任何新闻';
    return (
      <div class='topNewsList'>
        <Card
          title={this.props.cartTitle}
          bordered={true}
          style={{
          width: this.props.width
        }}>
          {newsList}
        </Card>
        <Pagination
          style={{
          marginTop: '10px'
        }}
          total={this.state.total}
          showTotal={(total, range) => `一共${total}页,当前第${this.state.current}页`}
          pageSize={this.state.pageSize}
          onChange={this
          .pageChange
          .bind(this)}
          showQuickJumper={true}
          current={this.state.current}/>
      </div>
    );
  }
}
