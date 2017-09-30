import React from "react";
import {
  Row,
  Col,
  Icon,
  Tabs,
  Card,
  message,
  Form,
  Input,
  Button,
  Checkbox,
  Upload,
  Modal
} from "antd";
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
import MobileHeader from "./Mobile_header";
import MobileFooter from "./Mobile_footer";
export default class PcUserCenter extends React.Component {
  constructor() {
    super();
    this.state = {
      usercomment: "",
      usercollection: "",
      previewImage: "",
      previewVisible: false
    };
  }
  componentDidMount() {
    var myOptons = {
      method: "GET"
    };
    fetch(
      "http://newsapi.gugujiankong.com/Handler.ashx?action=getuc&userid=" +
        localStorage.userid,
      myOptons
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ usercollection: json });
        document.title = "个人中心 - React News | React 驱动的新闻平台";
      });

    fetch(
      "http://newsapi.gugujiankong.com/Handler.ashx?action=getusercomments&userid=" +
        localStorage.userid,
      myOptons
    )
      .then(response => response.json())
      .then(json => {
        this.setState({ usercomment: json });
      });
  }
  handleCancel() {
    this.setState({ previewVisible: false });
  }
  render() {
    const props = {
      action: "http://newsapi.gugujiankong.com/handler.ashx",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      listType: "picture-card",
      defaultFileList: [
        {
          uid: -1,
          name: "xxx.png",
          sate: "done",
          url: "https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png",
          thumbUrl: "https://os.alipayobjects.com/rmsportal/NDbkJhpzmLxtPhB.png"
        }
      ],
      onPreview: file => {
        this.setState({ previewImage: file.url, previewVisible: true });
      }
    };
    const { usercollection, usercomment } = this.state;
    const usercollectionList = usercollection.length
      ? usercollection.map((uc, index) => (
          <Card
            key={index}
            title={uc.uniquekey}
            extra={<a href={`/#/details/${uc.uniquekey}`}>查看</a>}
          >
            <p> {uc.Title} </p>
          </Card>
        ))
      : "还没有发现收藏的文章,快去收藏吧~";

    const usercommentList = usercomment.length
      ? usercomment.map((comment, index) => (
          <Card
            key={index}
            title={`于${comment.datetime}发表的评论`}
            extra={<a href={`/#/details/${comment.uniquekey}`}>查看</a>}
          >
            <p> {comment.Comments} </p>
          </Card>
        ))
      : "您还没有发表过任何评论,快去发表吧~";
    return (
      <div>
        <MobileHeader />
        <Row>
          <Col span={24}>
            <Tabs>
              <TabPane tab="我的收藏列表" key="1">
                <Row>
                  <Col span={24}>{usercollectionList}</Col>
                </Row>
              </TabPane>
              <TabPane tab="我的评论列表" key="2">
                <Row>
                  <Col span={24}>{usercommentList}</Col>
                </Row>
              </TabPane>
              <TabPane tab="头像设置" key="3">
                <div class="clearfix">
                  <Upload {...props}>
                    <Icon type="plus" />
                    <div class="ant-upload-text">上传照片</div>
                  </Upload>
                  <Modal
                    visible={this.state.previewVisible}
                    footer={null}
                    onCancel={this.handleCancel.bind(this)}
                  >
                    <img src={this.state.previewImage} />
                  </Modal>
                </div>
              </TabPane>
            </Tabs>
          </Col>
        </Row>
        <MobileFooter />
      </div>
    );
  }
}
