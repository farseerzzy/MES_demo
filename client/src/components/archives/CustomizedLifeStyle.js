import React, { Component } from 'react';
import { Modal, Form,Row,Col, Checkbox,Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';
import address from './request/address';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];

class CustomizedForm extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);
    }
    componentDidMount(){
        axios.get('/address')
            .then(function (response) {
                response.data.map(function(province){
                    options.push({
                        value: province.name,
                        label: province.name,
                        children: province.city.map(function(city){
                            return {
                                value: city.name,
                                label: city.name,
                                children: city.area.map(function(area){
                                    return {
                                        value: area,
                                        label: area,
                                    }
                                })
                            }
                        }),
                    })
                })
            })
            .catch(function (error) {
                console.log(error);
            });
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

        };
        const layoutc = {span: 6, offset: 20}
        const websiteOptions = autoCompleteResult.map(website => (
            <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
        ));
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={onCreate}
                width = {1200}
            >
                <Form layout="horizontal">

                    <div class="cateTitle">体育锻炼</div>
                    <FormItem  {...FormItemLayout} hasFeedback>
                        <div>锻炼频率</div>
                        {getFieldDecorator('symptom', {

                        })(

                            <Radio.Group defaultValue="0" buttonStyle="solid">
                                <Radio.Button style={radioStyle} value="0">每天</Radio.Button>
                                <Radio.Button style={radioStyle} value="1">每周一次以上</Radio.Button>
                                <Radio.Button style={radioStyle} value="2">偶尔</Radio.Button>
                                <Radio.Button style={radioStyle} value="3">不锻炼</Radio.Button>

                            </Radio.Group>
                        )}
                    </FormItem>
                    <Row gutter={0}>
                        <Col span={12}>
                            <FormItem label="每次锻炼时间" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('id', {
                                    rules: [{ required: true, message: '请输入姓名！' }],
                                })(
                                    <Input addonAfter="分钟" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="坚持锻炼时间" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('sex', {
                                    
                                })(
                                    <Input addonAfter="年" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={12}>
                            <FormItem label="锻炼方式" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('age', {
                                   
                                })(
                                    <Input  />
                                )}
                            </FormItem>
                        </Col>
                    </Row>

                    <div className="cateTitle">饮食习惯</div>

                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            <Col span={4}><Checkbox value="A">荤素均衡</Checkbox></Col>
                            <Col span={4}><Checkbox value="B">荤食为主</Checkbox></Col>
                            <Col span={4}><Checkbox value="C">素食为主</Checkbox></Col>
                            <Col span={4}><Checkbox value="D">嗜盐</Checkbox></Col>
                            <Col span={4}><Checkbox value="E">嗜油</Checkbox></Col>
                            <Col span={4}><Checkbox value="E">嗜糖</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>




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
            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(CustomizedForm);
export default CollectionCreateForm;