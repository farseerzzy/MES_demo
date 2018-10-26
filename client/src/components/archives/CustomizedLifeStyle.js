import React, { Component } from 'react';
import { Modal, Form,Row,Col, Checkbox,Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';
import address from './request/address';
import Server from "../../helpers/Server";


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class CustomizedLifeStyle extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);
    }
    updateData =()=>{
        //处理数据
        const {getFieldValue} = this.props.form;
        var data  = [{
            trainRate: getFieldValue("trainRate"),  //锻炼频率
            exerciseTimeByMin: getFieldValue("exerciseTimeByMin"),  //锻炼时间/分钟
            exerciseTimeByYear: getFieldValue("exerciseTimeByYear"),  //锻炼时间/年
            exerciseWay: getFieldValue("exerciseWay"),  //锻炼方式


            foodHabit:getFieldValue("foodHabit")?getFieldValue("foodHabit").join(','):'', //饮食习惯-荤素均衡

            smokingStatus:getFieldValue("smokingStatus"), //吸烟状况
            smokingNumsByDay:getFieldValue("smokingNumsByDay"), //日均几只烟
            startSmokingAge:getFieldValue("startSmokingAge"), //开始吸烟年龄
            stopSmokingAge:getFieldValue("stopSmokingAge"), //戒烟年龄

            drinkingStatus:getFieldValue("drinkingStatus"),//喝酒状况
            drinkingByDay:getFieldValue("drinkingByDay"),//日饮酒量
            isOutAlcohol:getFieldValue("isOutAlcohol"),//是否戒酒
            startDrinkingAge:getFieldValue("startDrinkingAge"),//开始饮酒年龄
            isDrinkingThisYear:getFieldValue("isDrinkingThisYear"),//近一年内是否曾醉酒


            odh:getFieldValue("odh"),//职业病危害因素接触史
            poisonType:getFieldValue("poisonType")?getFieldValue("poisonType").join(','):'',//毒物种类
        }]
        let userid = this.props.rowData._id;
        console.log(data)
        Server.postHealthInfo({lifeStyle: data},userid,function (res) {
            console.log(res)
        })

    }

    componentDidMount(){
        this.props.onRef(this)
        
        if(this.props.rowData.lifeStyle!=undefined){
            this.props.form.setFieldsValue({
                trainRate: this.props.rowData.lifeStyle[0]["trainRate"],  //锻炼频率
                exerciseTimeByMin: this.props.rowData.lifeStyle[0]["exerciseTimeByMin"],  //锻炼时间/分钟
                exerciseTimeByYear: this.props.rowData.lifeStyle[0]["exerciseTimeByYear"],  //锻炼时间/年
                exerciseWay: this.props.rowData.lifeStyle[0]["exerciseWay"],  //锻炼方式




                smokingStatus:this.props.rowData.lifeStyle[0]["smokingStatus"], //吸烟状况
                smokingNumsByDay:this.props.rowData.lifeStyle[0]["smokingNumsByDay"], //日均几只烟
                startSmokingAge:this.props.rowData.lifeStyle[0]["startSmokingAge"], //开始吸烟年龄
                stopSmokingAge:this.props.rowData.lifeStyle[0]["stopSmokingAge"], //戒烟年龄

                drinkingStatus:this.props.rowData.lifeStyle[0]["drinkingStatus"],//喝酒状况
                drinkingByDay:this.props.rowData.lifeStyle[0]["drinkingByDay"],//日饮酒量
                isOutAlcohol:this.props.rowData.lifeStyle[0]["isOutAlcohol"],//是否戒酒
                startDrinkingAge:this.props.rowData.lifeStyle[0]["startDrinkingAge"],//开始饮酒年龄
                isDrinkingThisYear:this.props.rowData.lifeStyle[0]["isDrinkingThisYear"],//近一年内是否曾醉酒


                odh:this.props.rowData.lifeStyle[0]["odh"],//职业病危害因素接触史

            });
            if(this.props.rowData.lifeStyle[0].foodHabit!=undefined){
                this.props.form.setFieldsValue({
                    foodHabit:this.props.rowData.lifeStyle[0]["foodHabit"].split(','), //饮食习惯-荤素均衡
                });

            }
            if(this.props.rowData.lifeStyle[0].poisonType!=undefined){
                this.props.form.setFieldsValue({
                    poisonType:this.props.rowData.lifeStyle[0]["poisonType"].split(','), //饮食习惯-荤素均衡
                });

            }

        }


    }
    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.cn', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };
    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;
        const FormItemLayout = {
            labelCol: { span: 10 },
            wrapperCol: { span: 10 },
        };
        const FormItemLayout7 = {
            labelCol: { span: 7 },
            wrapperCol: { span: 10 },
        };
        const FormItemLayoutW = {
            labelCol: { span: 10 },
            wrapperCol: { span: 10 },
        };
        const radioStyle = {

        };
        const layoutc = {span: 6, offset: 20}
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (

                <Form layout="horizontal">

                    <div className="cateTitle">体育锻炼</div>
                    <FormItem  {...FormItemLayoutW} hasFeedback>
                        <span>锻炼频率： </span>
                        {getFieldDecorator('trainRate', {

                        })(

                            <Radio.Group defaultValue="0" buttonStyle="solid">
                                <Radio.Button style={radioStyle} value="每天">每天</Radio.Button>
                                <Radio.Button style={radioStyle} value="每周一次以上">每周一次以上</Radio.Button>
                                <Radio.Button style={radioStyle} value="偶尔">偶尔</Radio.Button>
                                <Radio.Button style={radioStyle} value="不锻炼">不锻炼</Radio.Button>

                            </Radio.Group>
                        )}
                    </FormItem>
                    <Row gutter={0}>
                        <Col span={8}>
                            <FormItem label="每次锻炼时间" {...FormItemLayout7} hasFeedback>
                                {getFieldDecorator('exerciseTimeByMin', {

                                })(
                                    <Input addonAfter="分钟" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="坚持锻炼时间" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('exerciseTimeByYear', {
                                    
                                })(
                                    <Input addonAfter="年" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="锻炼方式" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('exerciseWay', {
                                   
                                })(
                                    <Input  />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <div className="cateTitle">饮食习惯</div>
                    <FormItem   hasFeedback>

                        {getFieldDecorator('foodHabit', {

                        })(
                        <Checkbox.Group style={{ width: '90%' }}>
                            <Row>
                                <Col span={4}><Checkbox value="荤素均衡">荤素均衡</Checkbox></Col>
                                <Col span={4}><Checkbox value="荤食为主">荤食为主</Checkbox></Col>
                                <Col span={4}><Checkbox value="素食为主">素食为主</Checkbox></Col>
                                <Col span={4}><Checkbox value="嗜盐">嗜盐</Checkbox></Col>
                                <Col span={4}><Checkbox value="嗜油">嗜油</Checkbox></Col>
                                <Col span={4}><Checkbox value="嗜糖">嗜糖</Checkbox></Col>
                            </Row>
                        </Checkbox.Group>
                        )}
                    </FormItem>
                    <div className="cateTitle">吸烟状况</div>
                    <Row gutter={0}>
                    <Col span={6}>
                        <FormItem   hasFeedback>

                            {getFieldDecorator('smokingStatus', {

                            })(
                            
                                <Radio.Group defaultValue="0" buttonStyle="solid">
                                    <Radio.Button style={radioStyle} value="从不吸烟">从不吸烟</Radio.Button>
                                    <Radio.Button style={radioStyle} value="已戒烟">已戒烟</Radio.Button>
                                    <Radio.Button style={radioStyle} value="吸烟">吸烟</Radio.Button>
                                </Radio.Group>
                            )}
                        </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem label="日吸烟量" {...FormItemLayout} hasFeedback>
                                    {getFieldDecorator('smokingNumsByDay', {

                                    })(
                                        <Input addonAfter="支" />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem label="开始吸烟年龄" {...FormItemLayout} hasFeedback>
                                    {getFieldDecorator('startSmokingAge', {

                                    })(
                                        <Input addonAfter="岁" />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem label="戒烟年龄" {...FormItemLayout} hasFeedback>
                                    {getFieldDecorator('stopSmokingAge', {

                                    })(
                                        <Input addonAfter="岁" />
                                    )}
                                </FormItem>
                        </Col>
                    </Row>
                    
                    <div className="cateTitle">饮酒情况</div>

                    <FormItem  {...FormItemLayout} hasFeedback>
                        <span>饮酒频率： </span>
                        {getFieldDecorator('drinkingStatus', {

                        })(

                            <Radio.Group defaultValue="0" buttonStyle="solid">
                                <Radio.Button style={radioStyle} value="1">从不</Radio.Button>
                                <Radio.Button style={radioStyle} value="2">偶尔</Radio.Button>
                                <Radio.Button style={radioStyle} value="3">经常</Radio.Button>
                            </Radio.Group>
                        )}
                    </FormItem>
                    
                    <Row gutter={0}>
                        <Col span={6}>
                                <FormItem label="日饮酒量"  {...FormItemLayout7} hasFeedback>
                                    {getFieldDecorator('drinkingByDay', {

                                    })(
                                        <Input addonAfter="两" />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem   hasFeedback>
                                    <span>是否戒酒： </span>
                                    {getFieldDecorator('isOutAlcohol', {

                                    })(

                                        <Radio.Group defaultValue="0" buttonStyle="solid">
                                            <Radio.Button style={radioStyle} value="1">未戒酒</Radio.Button>
                                            <Radio.Button style={radioStyle} value="2">已戒酒</Radio.Button>
                            
                                        </Radio.Group>
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem label="开始饮酒年龄：" {...FormItemLayoutW}  hasFeedback>
                                    {getFieldDecorator('startDrinkingAge', {

                                    })(
                                        <Input addonAfter="岁" />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem  hasFeedback >
                                    <span>近一年内是否曾醉酒：</span>
                                    {getFieldDecorator('isDrinkingThisYear', {

                                    })(

                                        <Radio.Group defaultValue="0" buttonStyle="solid">
                                            <Radio.Button style={radioStyle} value="1">是</Radio.Button>
                                            <Radio.Button style={radioStyle} value="2">否</Radio.Button>
                            
                                        </Radio.Group>
                                    )}
                                </FormItem>
                        </Col>
                    </Row>

                    <div className="cateTitle">职业病危害因素接触史</div>
                        <FormItem  {...FormItemLayout} hasFeedback>
                            {getFieldDecorator('odh', {

                            })(

                                <Radio.Group defaultValue="0" buttonStyle="solid">
                                    <Radio.Button style={radioStyle} value="1">有</Radio.Button>
                                    <Radio.Button style={radioStyle} value="2">无</Radio.Button>
                    
                                </Radio.Group>
                            )}
                        </FormItem>
                    <div className="cateTitle">毒物种类</div>
                    <FormItem  hasFeedback>
                        {getFieldDecorator('poisonType', {

                        })(
                            <Checkbox.Group style={{ width: '92%' }}>
                                <Row>
                                    <Col span={4}><Checkbox value="粉尘">粉尘</Checkbox></Col>
                                    <Col span={4}><Checkbox value="放射物质">放射物质</Checkbox></Col>
                                    <Col span={4}><Checkbox value="物理因素">物理因素</Checkbox></Col>
                                    <Col span={4}><Checkbox value="化学物质">化学物质</Checkbox></Col>
                                    <Col span={4}><Checkbox value="其他">其他</Checkbox></Col>
                                </Row>
                            </Checkbox.Group>
                        )}
                    </FormItem>


                </Form>

        );
    }
}

const CollectionCreateForm1 = Form.create()(CustomizedLifeStyle);
export default CollectionCreateForm1;