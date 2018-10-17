import React, { Component } from 'react';
import './form.less';

import axios from 'axios';
import Mock from 'mockjs';
import moment from 'moment';
import { Row, Col, Input, Icon, Cascader, DatePicker, Button, Tooltip, Popconfirm } from 'antd';

import BreadcrumbCustom from '../common/BreadcrumbCustom';
import address from './request/address.json';
import data from './request/data.json';
import CollectionCreateForm from './CustomizedHealth';
import FormTable from './FormTable';
import Server from '../../helpers/Server'



const Search = Input.Search;
const InputGroup = Input.Group;
const options = [];
const { RangePicker } = DatePicker;
Mock.mock('/address', address);
Mock.mock('/data', data);

//数组中是否包含某项
function isContains(arr, item){
    arr.map(function (ar) {
        if(ar === item){
            return true;
        }
    });
    return false;
}
//找到对应元素的索引
function catchIndex(arr, key){ //获取INDEX
    arr.map(function (ar, index) {
        if(ar.key === key){
            return index;
        }
    });
    return 0;
}
//替换数组的对应项
function replace(arr, item, place){ //arr 数组,item 数组其中一项, place 替换项
    arr.map(function (ar) {
        if(ar.key === item){
            arr.splice(arr.indexOf(ar),1,place)
        }
    });
    return arr;
}

export default class UForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            address: '',
            timeRange: '',
            visible: false, //新建窗口隐藏
            dataSource: [],
            count: data.length,
            selectedRowKeys: [],
            tableRowKey: 0,
            isUpdate: false,
            loading: true,
            userList:[],
        };
    }
    //getData
    getData = () => {
        let self = this;
        axios.get('/data')
            .then(function (response) {
                // console.log(response.data);
                this.setState({
                    dataSource: response.data,
                    //loading:false
                })
            }.bind(this))
            .catch(function (error) {
                console.log(error);
            })


        Server.getUserList(function (res) {
            console.log(res)
            var dataObj = res.data;

            self.setState({
                userList: dataObj,
                loading:false
            })

        })
    };
    componentWillMount(){
        let self = this;
        console.log('初始化数据');
        

    };

    //用户名输入
    onChangeUserName = (e) => {
        const value = e.target.value;
        this.setState({
            userName: value,
        })
    };
    //用户名搜索
    onSearchUserName = (value) => {
        // console.log(value);
        const { dataSource } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => item.name.indexOf(value) !== -1),
            loading: false,
        })
    };
    //地址级联选择
    Cascader_Select = (value) => {
        const { dataSource } = this.state;
        if(value.length===0){
            this.setState({
                address: value,
                dataSource: [],
            });
            this.getData();
        }else{
            this.setState({
                address: value,
                dataSource: dataSource.filter(item => item.address === value.join(' / '))
            });
        }
    };
    //时间选择
    RangePicker_Select = (date, dateString) => {
        // console.log(date, dateString);
        const { dataSource } = this.state;
        const startime = moment(dateString[0]);
        const endtime = moment(dateString[1]);
        if(date.length===0){
            this.setState({
                timeRange: date,
                dataSource: [],
            });
            this.getData();
        }else{
            this.setState({
                timeRange: date,
                dataSource: dataSource.filter(item => (moment(item.createtime.substring(0,10)) <= endtime  && moment(item.createtime.substring(0,10)) >= startime) === true)
            });
        }
    };
    //渲染
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
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        this.getData();

    }
    //搜索按钮
    btnSearch_Click = () => {

    };
    //重置按钮
    btnClear_Click = () => {
        this.setState({
            userName: '',
            address: '',
            timeRange: '',
            dataSource: [],
            count: data.length,
        });
        this.getData();
    };
    //新建信息弹窗
    CreateItem = () => {
        this.setState({
            visible: true,
            isUpdate: false,
        });
        const form = this.form;
        form.resetFields();
    };
    //接受新建表单数据
    saveFormRef = (form) => {
        this.form = form;
    };
    //填充表格行
    handleCreate = () => {
        const { dataSource, count } = this.state;
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            values.key = count;
            values.address = values.address.join(" / ");
            values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

            form.resetFields();
            this.setState({
                visible: false,
                dataSource: [...dataSource, values],
                count: count+1,
            });
        });
    };
    //取消
    handleCancel = () => {
        this.setState({ visible: false });
    };
    //批量删除
    MinusClick = () => {
        const { dataSource, selectedRowKeys } = this.state;
        this.setState({
            dataSource: dataSource.filter(item => !isContains(selectedRowKeys, item.key)),
        });
    };
    //单个删除
    onDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };
    //点击修改
    editClick = (key) => {
        const form = this.form;
        const { userList } = this.state;
        const index = catchIndex(userList, key);
        form.setFieldsValue({
            key: key,
            name: userList[index].id,
            sex: userList[index].sex,
            age: userList[index].age,
            symptom: userList[index].symptom,
            phone: userList[index].phone,
            IdCardNo: userList[index].IdCardNo,
           
        });
        this.setState({
            visible: true,
            tableRowKey: key,
            isUpdate: true,
        });
    };
    //更新修改
    handleUpdate = () => {
        const form = this.form;
        const { dataSource, tableRowKey } = this.state;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            console.log('Received values of form: ', values);

            values.key = tableRowKey;
            values.address = values.address.join(" / ");
            values.createtime = moment().format("YYYY-MM-DD hh:mm:ss");

            form.resetFields();
            this.setState({
                visible: false,
                dataSource: replace(dataSource, tableRowKey, values)
            });
        });
    };
    //单选框改变选择
    checkChange = (selectedRowKeys) => {
        this.setState({selectedRowKeys: selectedRowKeys});
    };
    render(){
        const { userName, address, timeRange, dataSource, visible, isUpdate, loading ,userList} = this.state;
        const questiontxt = ()=>{
            return (
                <p>
                    <Icon type="plus-circle-o" /> : 新建信息<br/>
                    <Icon type="minus-circle-o" /> : 批量删除
                </p>
            )
        };
        return(
            <div>
                <BreadcrumbCustom paths={['首页','健康档案']}/>
                <div className='formBody'>
                    <Row gutter={16}>
                        <Col className="gutter-row" sm={8}>
                            <Search
                                placeholder="Input Name"
                                prefix={<Icon type="user" />}
                                value={userName}
                                onChange={this.onChangeUserName}
                                onSearch={this.onSearchUserName}
                            />
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            <InputGroup compact>
                                <Cascader style={{ width: '100%' }} options={options} placeholder="Select Address" onChange={this.Cascader_Select} value={address}/>
                            </InputGroup>
                        </Col>
                        <Col className="gutter-row" sm={8}>
                            <RangePicker style={{ width:'100%' }} onChange={this.RangePicker_Select} value={timeRange}/>
                        </Col>
                    </Row>
                    <Row gutter={16}>

                        <div className='btnOpera'>

                            <Button type="primary" onClick={this.btnSearch_Click} style={{marginRight:'10px'}}>查询</Button>
                            <Button type="primary" onClick={this.btnClear_Click} style={{background:'#f8f8f8', color: '#108ee9'}}>重置</Button>
                        </div>
                        
                    </Row>
                    <FormTable
                        userList={userList}
                        checkChange={this.checkChange}
                        onDelete={this.onDelete}
                        editClick={this.editClick}
                        loading={loading}
                    />
                    {isUpdate?
                        <CollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleUpdate} title="修改信息" okText="更新"
                    /> : <CollectionCreateForm ref={this.saveFormRef} visible={visible} onCancel={this.handleCancel} onCreate={this.handleCreate} title="新建信息" okText="创建"
                    />}
                </div>
            </div>
        )
    }
}