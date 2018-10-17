import React, { Component } from 'react';
import { Modal, Form,Row,Col, Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
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
                width = {1000}
            >
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
                        <Col span={8}>
                            <FormItem label="老年人健康状态自我评估*" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('symptom', {
                                    
                                })(
                                    <Radio.Group defaultValue="0" buttonStyle="solid">
                                        <Radio.Button value="1">满意</Radio.Button>
                                        <Radio.Button value="2">基本满意</Radio.Button>
                                        <Radio.Button value="3">说不清楚</Radio.Button>
                                        <Radio.Button value="4">不太满意</Radio.Button>
                                        <Radio.Button value="5">不满意</Radio.Button>
                                      </Radio.Group>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="老年人生活自理能力自我评估*" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('phone', {
                                    
                                })(
                                    <Input   addonAfter="CM"/>
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="老年人认知功能*" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('IdCardNo', {

                                })(
                                    <Input addonAfter="kg" />
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