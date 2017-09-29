import React from "react";
import ReactDom from "react-dom";
import {Route,BrowserRouter,Switch} from 'react-router-dom';
import 'antd/dist/antd.css'; 
import PcIndex from './component/pc_index';
import MobileIndex from './component/mobile_index';
import MediaQuery from 'react-responsive';
import PcNewsDetails from './component/pc_news_details';
import MobileNewsDetails from './component/mobile_news_details'
import PcUserCenter from './component/pc_usercenter';
import MobileUserCenter from './component/mobile_usercenter';
import PcNewsList from './component/pc_newsList';

export default class Root extends React.Component{
	render(){
		return (
			<div>
				  <MediaQuery query = '(min-device-width:1224px)'>
					  <BrowserRouter>
					     <Switch>
							<Route exact path = "/" component = {PcIndex} />
							<Route path = "/newslist/:type" component = {PcNewsList} />
							<Route path = "/details/:uniquekey" component = {PcNewsDetails} />
							<Route path = "/usercenter" component = {PcUserCenter} />
						 </Switch>	
					  </BrowserRouter>
				  </MediaQuery>
				  <MediaQuery query = '(max-device-width:1224px)'>
					  <BrowserRouter>
					     <Switch>
							<Route exact path = "/" component = {MobileIndex} />
							<Route path = "/details/:uniquekey" component = {MobileNewsDetails} />
							<Route path = "/usercenter" component = {MobileUserCenter} />
						 </Switch>	
					  </BrowserRouter>
				  </MediaQuery>
			</div>
		)
	}
}

ReactDom.render(<Root />,document.getElementById('mainContainer'))