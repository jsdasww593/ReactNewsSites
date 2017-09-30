import React from "react";
import PcHeader from "./pc_header";
import PcFooter from "./pc_footer";
import PcNewsContainer from "./pc_newscontainer";
export default class PcIndex extends React.Component {
  componentWillMount() {
    document.title = "首页 React News | React 驱动的新闻平台";
  }
  render() {
    return (
      <div>
        <PcHeader />
        <PcNewsContainer />
        <PcFooter />
      </div>
    );
  }
}
