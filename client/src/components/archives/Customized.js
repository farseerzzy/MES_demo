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
            value: 2,
            rowData:this.props.rowData
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
            rowData:this.props.rowData
        });
    

    };

    onRefForm = (ref) => {
        this.child = ref;
    }
    onRefHealth = (ref) => {
        this.child2 = ref;
    }
    onRefStyle = (ref) => {
        this.child3 = ref;
    }
    onOkProcess = ()=>{
        switch(this.state.value){
            case 1:
                this.child.updateData();
                break;
            case 2:
                this.child2.updateData();
                break;
            case 3:
                this.child3.updateData();
                break;

        }
        this.props.updateRoot();
        this.props.handleCancel();
    }
    showTab = (value) => {

        switch(value){
            case 1:
                return <CollectionCreateForm1 onRef={this.onRefForm} rowData={this.state.rowData} />;
            case 2:
                return <CustomizedHealth1  onRef={this.onRefHealth} rowData={this.state.rowData} />;
            case 3:
                return <CustomizedLifeStyle1 onRef={this.onRefStyle} rowData={this.state.rowData} />;

        }

    };

    showConsole = () =>{

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
                cancelText={'返回'}
                onCancel={onCancel}
                onOk={this.onOkProcess}
                width = {1200}
            >
            <div className="CustomizedForm">
                    <div className="radioGroup">
                        <RadioGroup onChange={this.onChange} value={value} buttonStyle="solid" size="large">
                            <Radio.Button style={radioStyle} value={2}>一般状况</Radio.Button>
                            <Radio.Button style={radioStyle} value={1}>症状</Radio.Button>
                            
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