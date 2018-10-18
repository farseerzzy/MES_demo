import React, { Component } from 'react';
import { Modal, Form, Row,Col,Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import axios from 'axios';
import address from './request/address';
import CollectionCreateForm1 from './CustomizedForm';
import CustomizedHealth1 from './CustomizedHealth';
import CustomizedLifeStyle1 from './CustomizedLifeStyle';


const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];
const RadioGroup = Radio.Group;

class Customized extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            value: 1,
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
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    };
    saveFormRef = (formcs)=>{
        this.cfrom = formcs
    }
    showTab = (value,forms) => {
        switch(value){
            case 1:
                return <CollectionCreateForm1 ref={this.saveFormRef} form={forms} />;
            case 2:
                return <CustomizedHealth1 ref={this.saveFormRef} form={forms} />;
            case 3:
                return <CustomizedLifeStyle1 ref={this.saveFormRef} form={forms} />;

        }
    };

    showConsole = () =>{
        console.log(this)
    }


    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { value } = this.state;
        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 16 },
        };
        const radioStyle = {
 
            height: '50px',
            lineHeight: '50px',

        };
        return (
            <Modal
                visible={visible}
                title={title}
                okText={okText}
                onCancel={onCancel}
                onOk={this.showConsole}
                width = {1200}
            >
            <div className="CustomizedForm">
                    <div className="radioGroup">
                        <RadioGroup onChange={this.onChange} value={value} buttonStyle="solid" size="large">
                            <Radio.Button style={radioStyle} value={1}>症状</Radio.Button>
                            <Radio.Button style={radioStyle} value={2}>一般状况</Radio.Button>
                            <Radio.Button style={radioStyle} value={3}>生活方式</Radio.Button>

                        </RadioGroup>
                    </div>
                    <div className="showEchart">
                        {this.showTab(value,form)}
                    </div>
                </div>

            </Modal>
        );
    }
}

const CollectionCreateForm = Form.create()(Customized);
export default CollectionCreateForm;