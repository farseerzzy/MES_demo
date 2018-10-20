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
            dataIndex: 'Name',
            width: 80,
        }, {
            title: '身份证号',
            dataIndex: 'IdCardNo',
            width: 80,
        }, {
            title: '身高',
            dataIndex: 'GeneralSymptoms[0].Height',

            width: 80,
        },{
            title: '体重',
            dataIndex: 'GeneralSymptoms[0].Weight',
            width: 80,
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
                    <span onClick={() => editClick(record._id)}>
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
