import React from 'react';
import {Row,Col,Tabs,Carousel} from 'antd';
import PcNewsBlock from './pc_news_block';
import PcNewsImageBlock from './pc_news_image_block';

const TabPane = Tabs.TabPane;

export default class PcNewsContainer extends React.Component{
      render(){
        const settings = {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            autoplay:true
        };
           return (
            <div>
				<Row>
					<Col span={2}></Col>
                    <Col span={20} class="container">
                      <Row>
                        <Col span={8}>
                           <div class="leftContainer">
                            <div class="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/banner1.jpg"/></div>
                                    <div><img src="./src/images/banner2.jpg"/></div>
                                    <div><img src="./src/images/banner3.jpg"/></div>
                                    <div><img src="./src/images/banner4.jpg"/></div>
                                </Carousel>
                            </div>
                              <PcNewsImageBlock count = {6} type = "guoji" width = "400px" cartTitle = "国际头条" imageWidth = "112px" newsType = "guoji"/>
                            </div>
                          </Col>  
                          <Col span={9}>
                            <Tabs class="tabs_news">
                                    <TabPane tab="头条新闻" key="1">
                                        <PcNewsBlock count={21} type="top" width="100%" bordered="false" />
                                    </TabPane>
                                    <TabPane tab="国际" key="2">
                                        <PcNewsBlock count={21} type="guoji" width="100%" bordered="false" />
                                    </TabPane>
                                    <TabPane tab="科技" key="3">
                                        <PcNewsBlock count={21} type="keji" width="100%" bordered="false" />
                                    </TabPane>
                            </Tabs>
                          </Col>  
                          <Col span={7}>
                              <div class="rightContainer">
                                <PcNewsImageBlock count = {2} type = "guonei" width = "316px" cartTitle = "国内热点" imageWidth = "285px" newsType = "guonei"/>
                              </div>
                          </Col> 
                        </Row>    
                        <PcNewsImageBlock count = {8} type = "yule" width = "100%" cartTitle = "娱乐新闻" imageWidth = "132px" newsType = "yule"/>
                        <PcNewsImageBlock count = {16} type = "shehui" width = "100%" cartTitle = "社会新闻" imageWidth = "132px" newsType = "shehui"/> 
                     </Col>  
				   <Col span={2}></Col>
				</Row>
			</div>
           )
      }
}