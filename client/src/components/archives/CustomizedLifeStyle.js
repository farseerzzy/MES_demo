import React, { Component } from 'react';
import { Modal, Form,Row,Col, Checkbox,Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';
import address from './request/address';


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
    showConsole = () =>{
        console.log('asdadasdadasdasda')
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
            labelCol: { span: 10 },
            wrapperCol: { span: 6 },
        };
        const FormItemLayout7 = {
            labelCol: { span: 7 },
            wrapperCol: { span: 6 },
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

                    <div class="cateTitle">体育锻炼</div>
                    <FormItem  {...FormItemLayoutW} hasFeedback>
                        <span>锻炼频率： </span>
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
                        <Col span={8}>
                            <FormItem label="每次锻炼时间" {...FormItemLayout7} hasFeedback>
                                {getFieldDecorator('id', {
                                    rules: [{ required: true, message: '请输入姓名！' }],
                                })(
                                    <Input addonAfter="分钟" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
                            <FormItem label="坚持锻炼时间" {...FormItemLayout} hasFeedback>
                                {getFieldDecorator('sex', {
                                    
                                })(
                                    <Input addonAfter="年" />
                                )}
                            </FormItem>
                        </Col>
                        <Col span={8}>
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
                    <div className="cateTitle">吸烟状况</div>
                    <Row gutter={8}>
                    <Col span={8}>
                        <FormItem   hasFeedback>

                            {getFieldDecorator('symptom', {

                            })(
                            
                                <Radio.Group defaultValue="0" buttonStyle="solid">
                                    <Radio.Button style={radioStyle} value="1">从不吸烟</Radio.Button>
                                    <Radio.Button style={radioStyle} value="2">已戒烟</Radio.Button>
                                    <Radio.Button style={radioStyle} value="3">吸烟</Radio.Button>
                                </Radio.Group>
                            )}
                        </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem label="日吸烟量" {...FormItemLayout} hasFeedback>
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: '请输入姓名！' }],
                                    })(
                                        <Input addonAfter="支" />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem label="开始吸烟年龄" {...FormItemLayout} hasFeedback>
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: '请输入姓名！' }],
                                    })(
                                        <Input addonAfter="岁" />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={4}>
                                <FormItem label="戒烟年龄" {...FormItemLayout} hasFeedback>
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: '请输入姓名！' }],
                                    })(
                                        <Input addonAfter="岁" />
                                    )}
                                </FormItem>
                        </Col>
                    </Row>
                    
                    <div className="cateTitle">饮酒情况</div>

                    <FormItem  {...FormItemLayout} hasFeedback>
                        <span>饮酒频率： </span>
                        {getFieldDecorator('symptom', {

                        })(

                            <Radio.Group defaultValue="0" buttonStyle="solid">
                                <Radio.Button style={radioStyle} value="1">从不</Radio.Button>
                                <Radio.Button style={radioStyle} value="2">偶尔</Radio.Button>
                                <Radio.Button style={radioStyle} value="3">经常</Radio.Button>
                            </Radio.Group>
                        )}
                    </FormItem>
                    
                    <Row gutter={8}>
                        <Col span={6}>
                                <FormItem label="日饮酒量"  {...FormItemLayout7} hasFeedback>
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: '请输入姓名！' }],
                                    })(
                                        <Input addonAfter="两" />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem   hasFeedback>
                                    <span>是否戒酒： </span>
                                    {getFieldDecorator('symptom', {

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
                                    {getFieldDecorator('id', {
                                        rules: [{ required: true, message: '请输入姓名！' }],
                                    })(
                                        <Input addonAfter="岁" />
                                    )}
                                </FormItem>
                        </Col>
                        <Col span={6}>
                                <FormItem   hasFeedback>
                                    <span>近一年内是否曾醉酒：</span>
                                    {getFieldDecorator('symptom', {

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
                            {getFieldDecorator('symptom', {

                            })(

                                <Radio.Group defaultValue="0" buttonStyle="solid">
                                    <Radio.Button style={radioStyle} value="1">有</Radio.Button>
                                    <Radio.Button style={radioStyle} value="2">无</Radio.Button>
                    
                                </Radio.Group>
                            )}
                        </FormItem>
                    <div className="cateTitle">毒物种类</div>
                    <Checkbox.Group style={{ width: '100%' }}>
                        <Row>
                            <Col span={4}><Checkbox value="A">粉尘</Checkbox></Col>
                            <Col span={4}><Checkbox value="B">放射物质</Checkbox></Col>
                            <Col span={4}><Checkbox value="C">物理因素</Checkbox></Col>
                            <Col span={4}><Checkbox value="D">化学物质</Checkbox></Col>
                            <Col span={4}><Checkbox value="E">其他</Checkbox></Col>
                        </Row>
                    </Checkbox.Group>


                </Form>

        );
    }
}

const CollectionCreateForm1 = Form.create()(CustomizedLifeStyle);
export default CollectionCreateForm1;