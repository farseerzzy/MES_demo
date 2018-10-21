import React, {Component} from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';
import {Layout} from 'antd';
import '../../style/index.less';

import SiderCustom from './SiderCustom';
import HeaderCustom from './HeaderCustom';
import MIndex from '../index/tindex';
import Calendars from '../header/Calendars';

import UForm from '../archives/Form';
import noMatch from './404';

import problem from '../povertyAlleviation/problem';
import expert from '../povertyAlleviation/expert';
import analysis from '../povertyAlleviation/analysis';
import tFee from '../povertyAlleviation/tFee';
import anaFee from '../povertyAlleviation/anaFee';

import remoteMed from '../remoteMed/index';
import basicMed from '../basicMed/index';
import connectMed from '../connectMed/index';
import other from '../other/index';

const {Content, Footer} = Layout;

export default class App extends Component {
    state = {
        collapsed: localStorage.getItem("mspa_SiderCollapsed") === "true",
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        }, function () {
            localStorage.setItem("mspa_SiderCollapsed", this.state.collapsed);
        });
    };

    componentDidMount() {
        //保存Sider收缩
        if (localStorage.getItem("mspa_SiderCollapsed") === null) {
            localStorage.setItem("mspa_SiderCollapsed", false);
        }
    }

    render() {
        const {collapsed} = this.state;
        const {location} = this.props;
        let name;
        if (localStorage.getItem("mspa_user") === null) {
            return <Redirect to="/login"/>
        } else {
            name = location.state === undefined ? JSON.parse(localStorage.getItem("mspa_user")).username : location.state.username;
        }

        return (
            <Layout className="ant-layout" style={{height: '100%'}}>
                 <HeaderCustom collapsed={collapsed} toggle={this.toggle} username={name}/>
                
                <Layout>
                   <SiderCustom collapsed={collapsed} path={location.pathname}/>
                    <Content style={{margin: '0 16px'}}>
                        <Switch>
                            <Route exact path={'/app'} component={MIndex} />
                            <Route exact path={'/app/archives'} component={UForm} />
                            <Route exact path={'/app/header/Calendars'} component={Calendars} />
                            <Route exact path={'/app/povertyAlleviation/problem'} component={problem} />
                            <Route exact path={'/app/povertyAlleviation/expert'} component={expert} />
                            <Route exact path={'/app/povertyAlleviation/analysis'} component={analysis} />
                            <Route exact path={'/app/povertyAlleviation/tFee'} component={tFee} />
                            <Route exact path={'/app/povertyAlleviation/anaFee'} component={anaFee} />
                            <Route exact path={'/app/publicHealth'} component={MIndex} />
                            <Route exact path={'/app/remoteMed'} component={remoteMed} />
                            <Route exact path={'/app/basicMed'} component={basicMed} />
                            <Route exact path={'/app/connectMed'} component={connectMed} />
                            <Route exact path={'/app/other'} component={other} />
                            <Route component={noMatch} />
                        </Switch>
                    </Content>

                </Layout>
            </Layout>
        );
    }
}
