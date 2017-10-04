import React from 'react';
import {Link} from 'react-router-dom';
import {
  Row,
  Col,
  Menu,
  Icon,
  Tabs,
  message,
  Form,
  Input,
  Button,
  Checkbox,
  Modal
} from 'antd';
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class PCHeader extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      current: '',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userid: 0
    };
  };
  componentWillMount() {
    if (localStorage.userid != '') {
      this.setState({hasLogined: true});
      this.setState({userNickName: localStorage.userNickName, userid: localStorage.userid});
    }
  };
  setModalVisible(value) {
    this.setState({modalVisible: value});
  };
  handleClick(e) {
    if (e.key == 'register') {
      this.setState({current: 'register'});
      this.setModalVisible(true);
    } else {
      {
        this.setState({current: e.key});
      }
    }
  };
  getDate(e) {
    var myFetchOptions = {
      method: 'GET'
    };
    var formData = this
      .props
      .form
      .getFieldsValue();
    fetch('http://newsapi.gugujiankong.com/Handler.ashx?action=' + this.state.action + '&username=' + formData.userName + '&password=' + formData.password + '&r_userName=' + formData.r_userName + '&r_password=' + formData.r_password + '&r_confirmPassword=' + formData.r_confirmPassword, myFetchOptions)
      .then(response => response.json())
      .then(json => {
        this.setState({userNickName: json.NickUserName, userid: json.UserId});
        localStorage.userid = json.UserId;
        localStorage.userNickName = json.NickUserName;
      });
    if (this.state.action == 'login') {
      this.setState({hasLogined: true});
      console.log(this.state.hasLogined);
    }
    message.success('请求成功！');
    this.setModalVisible(false);
  };
  handleSubmitLogin(e) {
    e.preventDefault();
    this
      .props
      .form
      .validateFields([
        'userName', 'password'
      ], (err, values) => {
        if (err) {
          message.error('登录失败');
        } else {
          this.getDate(e);
        }
      });
  };
  handleSubmitReguster(e) {
    e.preventDefault();
    this
      .props
      .form
      .validateFields([
        'r_userName', 'r_password', 'r_confirmPassword'
      ], (err, values) => {
        console.log(err);
        if (err) {
          message.error('注册失败');
        } else {
          this.getDate(e);
        }
      });
  };
  callback(key) {
    if (key == 1) {
      this.setState({action: 'login'});
    } else if (key == 2) {
      this.setState({action: 'register'});
    }
  };
  logout() {
    localStorage.userid = '';
    localStorage.userNickName = '';
    this.setState({hasLogined: false, userNickName: '', userid: ''});
    window.location.href = '/';
  };
  handleConfirmBlur(e) {
    const value = e.target.value;
    this.setState({
      confirmDirty: this.state.confirmDirty || !!value
    });
  };
  checkPassword(rule, value, callback) {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('r_password')) {
      callback('两次输入不一致');
    } else if (!value) {
      callback('请填写值');
    } else {
      callback();
    }
  };
  checkConfirm(rule, value, callback) {
    const form = this.props.form;
    const re = /^\w{4,18}$/;
    if (!value || !re.test(value)) {
      callback('密码格式错误');
    } else if (value && this.state.confirmDirty) {
      form.validateFields(['r_confirmPassword'], {force: true});
    }
    callback();
  };
  render() {
    const {getFieldDecorator} = this.props.form;
    const userShow = this.state.hasLogined
      ? (
        <Menu.Item key='logout' class='register'>
          <Button type='primary' htmlType='button'>
            {this.state.userNickName}
          </Button>
          &nbsp;&nbsp;
          <Link target='_blank' to={`/usercenter`}>
            <Button type='dashed' htmlType='button'>
              个人中心
            </Button>
          </Link>
          &nbsp;&nbsp;
          <Button
            type='ghost'
            htmlType='button'
            onClick={this
            .logout
            .bind(this)}>
            退出
          </Button>
        </Menu.Item>
      )
      : (
        <Menu.Item key='register' class='register'>
          <Icon type='user'/>注册/登录
        </Menu.Item>
      );
    return (
      <header>
        <Row>
          <Col span={2}/>
          <Col span={4}>
            <a href='/' class='logo'>
              <img src='/src/images/news_logo.png'/>
              <span>ReactNews</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu
              mode='horizontal'
              onClick={this
              .handleClick
              .bind(this)}
              selectedKeys={[this.props.currentTitle]}>
              <Menu.Item key='top'>
                <Link to={`/newslist/top`} target='_blank'>
                  <Icon type='appstore'/>头条
                </Link>
              </Menu.Item>
              <Menu.Item key='shehui'>
                <Link to={`/newslist/shehui`} target='_blank'>
                  <Icon type='appstore'/>社会
                </Link>
              </Menu.Item>
              <Menu.Item key='guonei'>
                <Link to={`/newslist/guonei`} target='_blank'>
                  <Icon type='appstore'/>国内
                </Link>
              </Menu.Item>
              <Menu.Item key='guoji'>
                <Link to={`/newslist/guoji`} target='_blank'>
                  <Icon type='appstore'/>国际
                </Link>
              </Menu.Item>
              <Menu.Item key='yule'>
                <Link to={`/newslist/yule`} target='_blank'>
                  <Icon type='appstore'/>娱乐
                </Link>
              </Menu.Item>
              <Menu.Item key='tiyu'>
                <Link to={`/newslist/tiyu`} target='_blank'>
                  <Icon type='appstore'/>体育
                </Link>
              </Menu.Item>
              <Menu.Item key='keji'>
                <Link to={`/newslist/keji`} target='_blank'>
                  <Icon type='appstore'/>科技
                </Link>
              </Menu.Item>
              <Menu.Item key='shishang'>
                <Link to={`/newslist/shishang`} target='_blank'>
                  <Icon type='appstore'/>时尚
                </Link>
              </Menu.Item>
              {userShow}
            </Menu>
            <Modal
              title='用户中心'
              wrapClassName='vertical-center-modal'
              visible={this.state.modalVisible}
              onCancel={() => this.setModalVisible(false)}
              onOk={() => this.setModalVisible(false)}
              okText='关闭'>
              <Tabs
                type='line'
                onChange={this
                .callback
                .bind(this)}>
                <TabPane tab='登录' key='1'>
                  <Form
                    layout='horizontal'
                    onSubmit={this
                    .handleSubmitLogin
                    .bind(this)}>
                    <FormItem label='账户'>
                      {getFieldDecorator('userName', {
                        rules: [
                          {
                            required: true,
                            message: '请输入2-16位的合法用户名',
                            pattern: /^[a-zA-Z0-9_-]{2,16}$/
                          }
                        ]
                      })(
                        <Input
                          prefix={< Icon type = 'user' style = {{ fontSize: 14 }}/>}
                          placeholder='请输入您的用户名'/>
                      )}
                    </FormItem>
                    <FormItem label='密码'>
                      {getFieldDecorator('password', {
                        rules: [
                          {
                            required: true,
                            message: '请输入4-18位的合法密码',
                            pattern: /^\w{4,18}$/
                          }
                        ]
                      })(
                        <Input
                          type='password'
                          prefix={< Icon type = 'lock' style = {{ fontSize: 14 }}/>}
                          placeholder='请输入您的密码'/>
                      )}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>
                      登录
                    </Button>
                  </Form>
                </TabPane>
                <TabPane tab='注册' key='2'>
                  <Form
                    layout='horizontal'
                    onSubmit={this
                    .handleSubmitReguster
                    .bind(this)}>
                    <FormItem label='账户'>
                      {getFieldDecorator('r_userName', {
                        rules: [
                          {
                            required: true,
                            message: '用户名输入不合法',
                            pattern: /^[a-zA-Z0-9_-]{2,16}$/
                          }
                        ]
                      })(<Input placeholder='请输入2-16位用户名'/>)}
                    </FormItem>
                    <FormItem label='密码'>
                      {getFieldDecorator('r_password', {
                        rules: [
                          {
                            required: true,
                            message: '密码格式不合法',
                            validator: this
                              .checkConfirm
                              .bind(this)
                          }
                        ]
                      })(<Input type='password' placeholder='请输入4-18位的由数字或英文组成的密码'/>)}
                    </FormItem>
                    <FormItem label='确认密码'>
                      {getFieldDecorator('r_confirmPassword', {
                        rules: [
                          {
                            required: true,
                            message: '两次密码输入不一致',
                            validator: this
                              .checkPassword
                              .bind(this)
                          }
                        ]
                      })(<Input
                        type='password'
                        placeholder='请再次输入您的密码'
                        onBlur={this
                        .handleConfirmBlur
                        .bind(this)}/>)}
                    </FormItem>
                    <Button type='primary' htmlType='submit'>
                      注册
                    </Button>
                  </Form>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}/>
        </Row>
      </header>
    );
  }
}
export default(PCHeader = Form.create({})(PCHeader));
