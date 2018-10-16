import React, { Component } from 'react';
import { Layout, Icon, Menu, Badge ,Input,Button} from 'antd';
import { Link } from 'react-router-dom';
import history from './history';
import LogoImg from '../../style/img/logo.jpg';
import Head1Img from '../../style/img/head1.jpg';
import Head2Img from '../../style/img/head2.png';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;

export default class HeaderCustom extends Component{
    constructor(props){
        super(props);
        this.state = {
            collapsed: props.collapsed,
        }
        this.logout = this.logout.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        //console.log(nextProps);
        this.onCollapse(nextProps.collapsed);
    }
    onCollapse = (collapsed) => {
        this.setState({
            collapsed,
        });
    };
    logout(){
        localStorage.removeItem("mspa_user");
        history.push('/login');
    }
    render(){
        return(
            <Header style={{ background: '#33383c', padding: 0 }} className="header">
                <img class="logo" src = {LogoImg}/>
                <img class="head1" src = {Head1Img}/>

                <Menu
                    mode="horizontal"
                    style={{ lineHeight: '64px', float: 'right' }}
                >
                    <Menu.Item>
                    <Input placeholder ="请请输入要搜索的内容..." class="head_input" />
                    </Menu.Item>
                    <Menu.Item>
                     <Button type="primary" icon="search" >搜索</Button>
                    </Menu.Item>
                    <Menu.Item>
                        <div>
                            <img class="head2" src = {Head2Img}/>
                            <a class="logout" onClick={this.logout}/>
                        </div>
                    </Menu.Item>

                </Menu>
            </Header>
        )
    }
} 