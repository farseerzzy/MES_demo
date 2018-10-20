import React, { Component } from 'react';
import { Layout, Menu, Icon,Button } from 'antd';
import { Link } from 'react-router-dom';
import '../../style/common.less';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;
var newDate = new Date();
var myddy=newDate.getDay();//获取存储当前日期
var weekday=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
const date = (newDate.getMonth()+1)+"月" +newDate.getDate() +"日"+" "+weekday[myddy]

export default class SiderCustom extends Component{
    constructor(props){
        super(props);
        const { collapsed }= props;
        this.state = {
            collapsed: collapsed,
            firstHide: true, //第一次先隐藏暴露的子菜单
            selectedKey: '', //选择的路径
            openKey: '', //打开的路径（选择的上一层）
        }
    }
    componentDidMount() {
        this.setMenuOpen(this.props);
    }
    componentWillReceiveProps(nextProps) {
        this.onCollapse(nextProps.collapsed);
        this.setMenuOpen(nextProps);
    }
    setMenuOpen = props => {
        const {path} = props;
        this.setState({
            openKey: path.substr(0, path.lastIndexOf('/')),
            selectedKey: path
        });
    };
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
            firstHide: collapsed,
        });
    };
    menuClick = e => {
        this.setState({
            selectedKey: e.key
        });
    };
    openMenu = v => {
        this.setState({
            openKey: v[v.length - 1],
            firstHide: false,
        })
    };
    render(){
        const { collapsed, firstHide, openKey, selectedKey } = this.state;
        return(
            <Sider
            trigger={null}
            collapsed={collapsed}
            width={300}
            >
                <div className="time" >
                    <div className="year">2018</div>
                    <div className="date">{date}</div>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    inlineIndent={30}
                    selectedKeys={[selectedKey]}
                    onClick={this.menuClick}
                    onOpenChange={this.openMenu}
                    openKeys={firstHide ? null : [openKey]}
                >

                    <Menu.Item key={"/app"}>
                        <Link to={"/app"}><Icon type="home" /><span>首页</span><div></div></Link>
                    </Menu.Item>
                    <Menu.Item key={"/app/publicHealth"}>
                        <Link to={"/app/publicHealth"}><Icon type="lock" /><span>公共卫生</span></Link>
                    </Menu.Item>
                    <Menu.Item key={"/app/archives"}>
                        <Link to={"/app/archives"}><Icon type="folder" /><span>健康档案</span></Link>
                    </Menu.Item>
                    <SubMenu
                    key="/app/povertyAlleviation"
                    title={<span><Icon type="folder" /><span>健康扶贫</span></span>}
                    >
                        <Menu.Item key="/app/povertyAlleviation/problem">
                            <Link to={'/app/povertyAlleviation/problem'}><span>问题整改</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/app/povertyAlleviation/expert">
                            <Link to={'/app/povertyAlleviation/expert'}><span>专家绩效</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/app/povertyAlleviation/analysis">
                            <Link to={'/app/povertyAlleviation/analysis'}><span>疾病分析</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/app/povertyAlleviation/tFee">
                            <Link to={'/app/povertyAlleviation/tFee'}><span>费用总览</span></Link>
                        </Menu.Item>
                        <Menu.Item key="/app/povertyAlleviation/anaFee">
                            <Link to={'/app/povertyAlleviation/anaFee'}><span>费用分析</span></Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key="/app/basicMed">
                        <Link to={'/app/basicMed'}><Icon type="setting" /><span>基础医疗</span></Link>
                    </Menu.Item>
                    <Menu.Item key="/app/linkMed">
                        <Link to={'/app/linkMed'}><Icon type="folder" /><span>医联体</span></Link>
                    </Menu.Item>
                    <Menu.Item key="/app/remoteMed">
                        <Link to={'/app/remoteMed'}><Icon type="setting" /><span>远程医疗</span></Link>
                    </Menu.Item>
                    <Menu.Item key="/app/remoteMed/">
                        <Link to={'/app/remoteMed/'}><Icon type="lock" /><span>其他接口</span></Link>
                    </Menu.Item>

                </Menu>

                <div className="slide_bottom">
                    <Button icon="search" href={"/app/archives"}>数据检索</Button>
                    <Button type="primary" icon="search" href={"/app/archives"}>档案查询</Button>
                </div>
            </Sider>
        )
    }
}