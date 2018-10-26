import React, { Component } from 'react';
import { Modal,Checkbox , Form, Row,Col,Input, Radio, InputNumber, Cascader, Select, AutoComplete } from 'antd';
import Server from '../../helpers/Server'
import address from './request/address';

const CheckboxGroup = Checkbox.Group;
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