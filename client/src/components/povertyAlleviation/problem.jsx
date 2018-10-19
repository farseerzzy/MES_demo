import React, { Component } from 'react'; 
import BreadcrumbCustom from '../common/BreadcrumbCustom';
import Img from '../../style/img/bg02.jpg';
export default class Echarts extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: 1,
        }
    }

    
    render(){
        const { value } = this.state;
        return(
            <div>
                <BreadcrumbCustom paths={['首页','健康扶贫','问题整改']}/>
                <div className="imgbg">
                    <img src={Img}/>
                </div>
            </div>
        )
    }
}