import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { Menu, Icon, Form, Input, Button, Select } from 'antd';
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const Option = Select.Option;

import JsonForm from './JsonForm'

const CaseMenu = ({ handleClick }) => {
    return <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        mode="horizontal"
    >
        <Menu.Item key="1">
            <Icon type="mail" />
            Detail
        </Menu.Item>
        <Menu.Item key="2">
            <Icon type="mail" />
            Data
        </Menu.Item>
    </Menu>
}

class CaseDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            json: {
                "name": "Jack",
                "age": 18,
                "sex": "male",
                "apples": ["1", "2", "3"],
                "object": {
                    a: 1,
                    b: 2
                }
            }
        }
    }


    render() {
        const { history } = this.props;

        return <div className="case_detail">
            <CaseMenu />
            <JsonForm/>
        </div>
    }
}

function mapStateToProps(state) {
    return { chatRoomsNameList: state.chatRooms.chatRoomsNameList }
}

export default withRouter(connect(mapStateToProps)(CaseDetail));
