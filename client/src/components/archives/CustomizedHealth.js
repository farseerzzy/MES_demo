import React, { Component } from 'react';
import { Modal, Form,Row,Col, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';
import address from './request/address';

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
        this.state ={
            Temp:'',//体温
            PR:'',//脉率
            Resp:'', //呼吸频率
            NibpAver:'',//血压（平均压）
            Height:'',//身高
            Weight:'',//体重
            waistline: '',//腰围
            bmi: '',//体质指数

            agedLiveStatus: 0,//老年人生活状态自我评估
            agedSelfCareStatus: 0, //老年人生活自理能力自我评估
            agedCognitive: 0, //老年人认知功能
            agedEmotionStatus: 0, //老年人情感状态

            intelligenceScore: '',//智力得分
            emotionScore: '',//抑郁评分得分

        }
    }
    showConsole = () =>{
        console.log('asdadasdadasdasda')
    }
    syncData =()=>{
            //处理数据
            var data  = [{
                Temp:this.state.Temp,//体温
                PR:this.state.PR,//脉率
                Resp:this.state.Resp, //呼吸频率
                NibpAver:this.state.NibpAver,//血压（平均压）
                HeightM:this.state.Height,//身高
                Weight:this.state.Weight,//体重
                waistline: this.state.waistline,//腰围
                bmi: this.state.bmi,//体质指数
                agedLiveStatus: configData.agedLiveStatus[this.state.agedLiveStatus],//老年人生活状态自我评估
                agedSelfCareStatus: configData.agedSelfCareStatus[this.state.agedSelfCareStatus], //老年人生活自理能力自我评估
                agedCognitive: configData.agedCognitive[this.state.agedCognitive], //老年人认知功能
                agedEmotionStatus: configData.agedEmotionStatus[this.state.agedEmotionStatus], //老年人情感状态]
            }]
            
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
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (

                <Form layout="horizontal">

                    <Row gutter={8}>
                        <Col span={8}>
                            <FormItem label="体温" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('id', {
                                    rules: [{ required: true, message: '请输入姓名！' }],
                                })(
                                    <Input addonAfter="℃" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="脉搏" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('sex', {
                                    
                                })(
                                    <Input addonAfter="次/分钟" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="呼吸频率" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('age', {
                                   
                                })(
                                    <Input addonAfter="次/分钟" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <FormItem label="血压" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('symptom', {
                                    
                                })(
                                    <Input addonAfter="mmHg" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="身高" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('phone', {
                                    
                                })(
                                    <Input   addonAfter="CM"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="体重" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('IdCardNo', {

                                })(
                                    <Input addonAfter="kg" />
                                )}
                            </FormItem>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <FormItem label="腰围" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('symptom', {
                                    
                                })(
                                    <Input addonAfter="CM" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="体质指数" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('phone', {
                                    
                                })(
                                    <Input   addonAfter="Kg/m2"/>
                                )}
                            </FormItem>
                        </Col>

                    </Row>



                    <Row gutter={8}>
                        <Col span={6}>
                            <FormItem  {...FormItemLayout} hasFeedback>
                                <div>老年人健康状态自我评估*</div>
                                {getFieldDecorator('symptom', {
                                    
                                })(

                                    <Radio.Group defaultValue="0" buttonStyle="solid">
                                        <Radio.Button style={radioStyle} value="0">满意</Radio.Button>
                                        <Radio.Button style={radioStyle} value="1">基本满意</Radio.Button>
                                        <Radio.Button style={radioStyle} value="2">说不清楚</Radio.Button>
                                        <Radio.Button style={radioStyle} value="3">不太满意</Radio.Button>
                                        <Radio.Button style={radioStyle} value="4">不满意</Radio.Button>
                                      </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...FormItemLayout} hasFeedback>
                                <div>老年人生活自理能力自我评估*</div>
                                {getFieldDecorator('phone', {
                                    
                                })(
                                    <Radio.Group defaultValue="0" buttonStyle="solid">
                                        <Radio.Button style={radioStyle} value="0">可自理（0～3分）</Radio.Button>
                                        <Radio.Button style={radioStyle} value="1">轻度依赖（4～8分</Radio.Button>
                                        <Radio.Button style={radioStyle} value="2">中度依赖（9～18分)</Radio.Button>
                                        <Radio.Button style={radioStyle} value="3">不能自理（≥19分）</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...FormItemLayout} hasFeedback>
                                <div>老年人认知功能*</div>
                                {getFieldDecorator('IdCardNo', {

                                })(
                                    <Radio.Group defaultValue="0" buttonStyle="solid">
                                        <Radio.Button style={radioStyle} value="1">粗筛阴性</Radio.Button>
                                        <Radio.Button style={radioStyle} value="2">粗筛阳性</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                            <FormItem  {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('IdCardNo', {

                                })(
                                    <Input addonBefore={'总分'}  />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={6}>
                            <FormItem  {...FormItemLayout} hasFeedback>
                                <div>老年人情感状态*</div>
                                {getFieldDecorator('IdCardNo', {

                                })(
                                    <Radio.Group defaultValue="0" buttonStyle="solid">
                                        <Radio.Button style={radioStyle} value="1">粗筛阴性</Radio.Button>
                                        <Radio.Button style={radioStyle} value="2">粗筛阳性</Radio.Button>

                                    </Radio.Group>
                                )}
                            </FormItem>
                            <FormItem  {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('IdCardNo', {

                                })(
                                    <Input size={'small'} addonBefore={'总分'}  />
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