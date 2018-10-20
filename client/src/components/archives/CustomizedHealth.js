import React, { Component } from 'react';
import { Modal, Form,Row,Col, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';
import address from './request/address';
import Server from "../../helpers/Server";

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];
const configData = {
    agedLiveStatus:['满意','基本满意','说不清楚','不太满意','不满意'],
    agedSelfCareStatus:['可自理（0~3分）','轻度依赖（4~8分）','中度依赖（9~18分）','不能自理（≥19分）'],
    agedCognitive:['粗筛阴性','粗筛阳性'],
    agedEmotionStatus:['粗筛阴性','粗筛阳性']
}

class CustomizedHealth extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);


    }

    componentDidMount(){
        this.props.onRef(this);
        if(this.props.rowData.GeneralSymptoms!=undefined){
            this.props.form.setFieldsValue({


                Temp:this.props.rowData.GeneralSymptoms[0].Temp,//体温
                PR:this.props.rowData.GeneralSymptoms[0].PR,//脉率
                Resp:this.props.rowData.GeneralSymptoms[0].Resp, //呼吸频率
                NibpAver:this.props.rowData.GeneralSymptoms[0].NibpAver,//血压（平均压）
                HeightM:this.props.rowData.GeneralSymptoms[0].Height,//身高
                Weight:this.props.rowData.GeneralSymptoms[0].Weight,//体重
                waistline: this.props.rowData.GeneralSymptoms[0].waistline,//腰围
                bmi: this.props.rowData.GeneralSymptoms[0].bmi,//体质指数
                agedLiveStatus: this.props.rowData.GeneralSymptoms[0].agedLiveStatus,//老年人生活状态自我评估
                agedSelfCareStatus: this.props.rowData.GeneralSymptoms[0].agedSelfCareStatus, //老年人生活自理能力自我评估
                agedCognitive: this.props.rowData.GeneralSymptoms[0].agedCognitive, //老年人认知功能
                agedEmotionStatus: this.props.rowData.GeneralSymptoms[0].agedEmotionStatus, //老年人情感状态]
                intelligenceScore: this.props.rowData.GeneralSymptoms[0].intelligenceScore,
                emotionScore: this.props.rowData.GeneralSymptoms[0].emotionScore,

            });
        }

    }
    updateData =()=>{
            //处理数据
        const {getFieldValue} = this.props.form;
        var data  = [{
            Temp:getFieldValue('Temp'),//体温
            PR:getFieldValue('PR'),//脉率
            Resp:getFieldValue('Resp'),//呼吸频率
            NibpAver:getFieldValue('NibpAver'),//血压（平均压）
            HeightM:getFieldValue('Height'),//身高
            Weight:getFieldValue('Weight'),//体重
            waistline: getFieldValue('waistline'),//腰围
            bmi: getFieldValue('bmi'),//体质指数
            agedLiveStatus: getFieldValue('agedLiveStatus'),//老年人生活状态自我评估
            agedSelfCareStatus: getFieldValue('agedSelfCareStatus'),//老年人生活自理能力自我评估
            agedCognitive: getFieldValue('agedCognitive'),//老年人认知功能
            agedEmotionStatus: getFieldValue('agedEmotionStatus'),//老年人情感状态]
            intelligenceScore: getFieldValue('intelligenceScore'),//老年人认知功能
            emotionScore: getFieldValue('emotionScore')//老年人情感状态]
        }]
        let userid = this.props.rowData._id;
        console.log(data)
        Server.postHealthInfo({GeneralSymptoms: data},userid,function (res) {
            console.log(res)
        })
            
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
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };
        const layoutc = {span: 6, offset: 20}

        return (

                <Form layout="horizontal">

                    <Row gutter={8}>
                        <Col span={8}>
                            <FormItem label="体温" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('Temp', {
                                    rules: [{ required: true, message: '请输入体温！' }],
                                })(
                                    <Input addonAfter="℃" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="脉搏" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('PR', {
                                    
                                })(
                                    <Input addonAfter="次/分钟" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="呼吸频率" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('Resp', {
                                   
                                })(
                                    <Input addonAfter="次/分钟" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <FormItem label="血压" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('NibpAver', {
                                    
                                })(
                                    <Input addonAfter="mmHg" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="身高" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('Height', {
                                    
                                })(
                                    <Input   addonAfter="CM"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="体重" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('Weight', {

                                })(
                                    <Input addonAfter="kg" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <FormItem label="腰围" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('waistline', {
                                    
                                })(
                                    <Input addonAfter="CM" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="体质指数" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('bmi', {
                                    
                                })(
                                    <Input   addonAfter="Kg/m2"/>
                                )}
                            </FormItem>
                        </Col>

                    </Row>



                    <Row gutter={8}>
                        <Col span={6}>
                            <FormItem  {...FormItemLayout} >
                                <div>老年人健康状态自我评估*</div>
                                {getFieldDecorator('agedLiveStatus', {
                                    
                                })(

                                    <Radio.Group defaultValue="0" buttonStyle="solid">
                                        <Radio.Button style={radioStyle} value="满意">满意</Radio.Button>
                                        <Radio.Button style={radioStyle} value="基本满意">基本满意</Radio.Button>
                                        <Radio.Button style={radioStyle} value="说不清楚">说不清楚</Radio.Button>
                                        <Radio.Button style={radioStyle} value="不太满意">不太满意</Radio.Button>
                                        <Radio.Button style={radioStyle} value="不满意">不满意</Radio.Button>
                                      </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...FormItemLayout} >
                                <div>老年人生活自理能力自我评估*</div>
                                {getFieldDecorator('agedSelfCareStatus', {
                                    
                                })(
                                    <Radio.Group defaultValue="0" buttonStyle="solid">
                                        <Radio.Button style={radioStyle} value="可自理（0~3分）">可自理（0~3分）</Radio.Button>
                                        <Radio.Button style={radioStyle} value="轻度依赖（4~8分">轻度依赖（4~8分</Radio.Button>
                                        <Radio.Button style={radioStyle} value="中度依赖（9~18分)">中度依赖（9~18分)</Radio.Button>
                                        <Radio.Button style={radioStyle} value="不能自理（≥19分）">不能自理（≥19分）</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...FormItemLayout} >
                                <div>老年人认知功能*</div>
                                {getFieldDecorator('agedCognitive', {

                                })(
                                    <Radio.Group defaultValue="0" buttonStyle="solid">
                                        <Radio.Button style={radioStyle} value="粗筛阴性">粗筛阴性</Radio.Button>
                                        <Radio.Button style={radioStyle} value="粗筛阳性">粗筛阳性</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                            <FormItem  {...FormItemLayout} hasFeedback>
                                <div>智力得分</div>
                                {getFieldDecorator('intelligenceScore', {

                                })(
                                    <Input   />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...FormItemLayout} >
                                <div>老年人情感状态*</div>
                                {getFieldDecorator('agedEmotionStatus', {

                                })(
                                    <Radio.Group defaultValue="0" buttonStyle="solid">
                                        <Radio.Button style={radioStyle} value="粗筛阴性">粗筛阴性</Radio.Button>
                                        <Radio.Button style={radioStyle} value="粗筛阳性">粗筛阳性</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                            <FormItem  {...FormItemLayout} hasFeedback>
                                <div>抑郁评分得分</div>
                                {getFieldDecorator('emotionScore:', {

                                })(
                                    <Input size={'small'}   />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    



                </Form>
        );
    }
}

const CustomizedHealth1 = Form.create()(CustomizedHealth);
export default CustomizedHealth1;