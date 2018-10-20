import React, { Component } from 'react';
import { Modal,Checkbox , Form, Row,Col,Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import Server from '../../helpers/Server'
import address from './request/address';

const CheckboxGroup = Checkbox.Group;
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const options = [];
const checkList = [
    {checkStatus: false, name: '无症状',label: '无症状',value: '无症状'}, 
    {checkStatus: false, name: '头痛',label: '头痛',value: '头痛'}, 
    {checkStatus: false, name: '头晕',label: '头晕',value: '头晕'}, 
    {checkStatus: false, name: '心悸',label: '心悸',value: '心悸'},
    {checkStatus: false, name: '胸闷',label: '胸闷',value: '胸闷'}, 
    {checkStatus: false, name: '胸痛',label: '胸痛',value: '胸痛'}, 
    {checkStatus: false, name: '慢性咳嗽',label: '慢性咳嗽',value: '慢性咳嗽'},
    {checkStatus: false, name: '咳痰',label: '咳痰',value: '咳痰'},
    {checkStatus: false, name: '呼吸困难',label: '呼吸困难',value: '呼吸困难'}, 
    {checkStatus: false, name: '多饮',label: '多饮',value: '多饮'}, 
    {checkStatus: false, name: '多尿',label: '多尿',value: '多尿' }, 
    {checkStatus: false, name: '体重下降',label: '体重下降',value: '体重下降'},
    {checkStatus: false, name: '乏力',label: '乏力',value: '乏力'}, 
    {checkStatus: false, name: '关节肿痛',label: '关节肿痛',value: '关节肿痛'}, 
    {checkStatus: false, name: '视力模糊',label: '视力模糊',value: '视力模糊'}, 
    {checkStatus: false, name: '手脚麻木',label: '手脚麻木',value: '手脚麻木'},
    {checkStatus: false, name: '尿急',label: '尿急',value: '尿急'}, 
    {checkStatus: false, name: '尿痛便秘',label: '尿痛便秘',value: '尿痛便秘'}, 
    {checkStatus: false, name: '便秘',label: '便秘',value: '便秘'}, 
    {checkStatus: false, name: '腹泻',label: '腹泻',value: '腹泻'},
    {checkStatus: false, name: '恶心呕吐',label: '恶心呕吐',value: '恶心呕吐'}, 
    {checkStatus: false, name: '眼花',label: '眼花',value: '眼花'}, 
    {checkStatus: false, name: '耳鸣',label: '耳鸣',value: '耳鸣'},
    {checkStatus: false, name: '乳房胀痛',label: '乳房胀痛',value: '乳房胀痛'}];


class CustomizedForm extends Component{
    state = {
        autoCompleteResult: [],
    };
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.onRef(this);
        if(this.props.rowData.symptom!=undefined){

            var symptomArr = this.props.rowData.symptom.split(',');
            var symptomInsertArr = [];
            for (var i = 0; i < symptomArr.length; i++) {
                var name = symptomArr[i];
                for (var j = 0; j < checkList.length; j++) {
                    var obj = checkList[j];


                    if(name == obj.name){
                        console.log( obj.name)
                        symptomInsertArr.push(obj.name) ;
                    }
                }
            }

            this.props.form.setFieldsValue({
                symptom:symptomInsertArr
            });
        }
        if(this.props.rowData.otherSymptom!=undefined){
            this.props.form.setFieldsValue({
                otherSymptom:this.props.rowData.otherSymptom
            });
        }
    }

    findDiff =  (arr1, arr2) =>{
        var set2 = new Set(arr2);
        var subset = [];
        arr1.forEach(function(val, index) {
            if (!set2.has(val)) {
                subset.push(val);
            }
        });
        return subset;
    };

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.cn', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };
    updateData =()=>{
        const {getFieldValue} = this.props.form;
        let sArray = getFieldValue('symptom');
        let otherSymptom = getFieldValue('otherSymptom');

        if(sArray.length > 0 || otherSymptom!==''){

            var data = {
                symptom : sArray.join(','),
                otherSymptom:otherSymptom
            }
            console.log(data)
            let userid = this.props.rowData._id;
            Server.postHealthInfo(data,userid,function (res) {
                console.log(res)
            })
        }else {
            Server.showAlert('输入值为空');
        }
    }
    render(){
        const { visible, onCancel, onCreate, form, okText, title } = this.props;
        const { getFieldDecorator } = form;
        const { autoCompleteResult } = this.state;

        const FormItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 20 },
        };
        return (
                <div className="symptom">
                <Form   layout="vertical">
                    <FormItem  {...FormItemLayout} >
                        {getFieldDecorator('symptom', {

                        })(
                            <CheckboxGroup options={checkList} />
                        )}
                    </FormItem>


                    <br/>
                    <br/>
                     <FormItem  {...FormItemLayout} >
                                {getFieldDecorator('otherSymptom', {

                                })(
                                    <Input  addonBefore={'其他'}  />
                                )}
                      </FormItem>
                </Form>
                </div>
        );
    }
}

const CollectionCreateForm1 = Form.create()(CustomizedForm);
export default CollectionCreateForm1;