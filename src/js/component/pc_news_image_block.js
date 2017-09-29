import React from 'react';
import Card from 'antd/lib/card'; 
import {Link} from 'react-router-dom';

export default class PcNewsImageBlock extends React.Component{
    constructor() {
		super();
		this.state = {
			news: ''
		};
	}
	componentWillMount() {
		var myFetchOptions = {
			method: 'GET'
		};
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" 
        + this.props.type + "&count=" 
        + this.props.count, myFetchOptions)
        .then(response => response.json())
        .then(json => this.setState({news: json}));
      };
      block(){
           
      };
	render() {
        const {news} = this.state;
        const styleImage = {
              display:"block",
              width:this.props.imageWidth
        };
        const styeH3 = {
              width:this.props.imageWidth,
              fontSize:this.props.fontSize,
              whiteSpace:"nowrap",
              overflow: "hidden",
              textOverflow:"ellipsis"
        };
		const newsList = news.length
			? news.map((newsItem, index) => (
				 <div key = {index} class = "imageblock">
                         <Link to = {`/details/${newsItem.uniquekey}`}  target = "_blank">
                                <div class = "custom-image">
                                      <img src = {newsItem.thumbnail_pic_s} style = {styleImage}/>
                                </div>
                                <div class = "custom-card">
                                      <h3 style = {styeH3}>{newsItem.title}</h3>
                                      <p>{newsItem.author_name}</p>   
                                </div>    
                         </Link>
                 </div>
			))
			: '没有加载到任何新闻';
		return (
			<div class="topNewsList">
				<Card 
                        title = {this.props.cartTitle} 
                        bordered = {true} 
                        style = {{width:this.props.width}}
                        extra={<a href={`/newslist/${this.props.newsType}`}>More</a>}
                        >
					{newsList}
				</Card>
			</div>
		);
	};
}