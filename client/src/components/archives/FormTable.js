import React, { Component } from 'react';
import { Table, Icon, Popconfirm } from 'antd';
import moment from 'moment';

export default class FormTable extends Component{
    constructor(props){
        super(props);
    }
    render(){
        const { checkChange, onDelete, editClick, dataSource, loading, userList } = this.props;
        const rowSelection = {
                onChange: checkChange,
                getCheckboxProps: record => ({
                disabled: record.name === 'Disabled User', // Column configuration not to be checked
            }),
        };
        const columns = [{
            title: '姓名',
            dataIndex: 'id',
            width: 80,
        }, {
            title: '性别',
            dataIndex: 'sex',
            filters: [
                { text: '男', value: '男' },
                { text: '女', value: '女' },
            ],
            onFilter: (value, record) => record.sex.indexOf(value) === 0,
            width: 80,
        }, {
            title: '年龄',
            dataIndex: 'age',
            sorter: (a, b) => a.age - b.age,
            width: 80,
        },{
            title: '症状',
            dataIndex: 'symptom',
            width: 180,
        },{
            title: '手机号',
            dataIndex: 'phone',
            width: 120,
        },{
            title: '身份证号',
            dataIndex: 'IdCardNo',
            width:140,
        },{
            title: '创建时间',
            dataIndex: 'createdAt',
            sorter: (a, b) => moment(a.createtime) - moment(b.createtime),
            width:150,
        },{
            title: '操作',
            dataIndex: 'opera',
            width:100,
            render: (text, record) =>
                <div className='opera'>
                    <span onClick={() => editClick(record.id)}>
                         <Icon type="edit" /> 修改
                    </span><br />
                    
                </div>
        }];
        return(
            <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={userList}
                bordered={true}
                scroll={{x:'100%'}}
                className='formTable'
                loading={loading}
            />
        )
    }
}
