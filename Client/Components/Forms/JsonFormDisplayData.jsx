import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import { Icon, Form, Input, Button, Select, Tree } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;

const inputStyle = {
    width: "150px"
}

class JsonForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawJson: {
                "name": "Jack",
                "age": 18,
                "sex": "male",
                "apples": ["1", "2", "3"],
                "object": {
                    a: 1,
                    b: 2
                }
            },
            regular: [
                { name: "a", type: "String",serviceType:null, length: 6 },
                { name: "b", type: "Array",serviceType:"name", length: 6 },
                {
                    name: "c",
                    type: "Object",
                    children: [
                        { name: "c-1", type: "String", serviceType:"address",length: 6 },
                ]}
            ]
        };
        this.handleChangeSelectType = this.handleChangeSelectType.bind(this);
        this.getFromFromJson = this.getFromFromJson.bind(this);
        this.getSecondaryform = this.getSecondaryform.bind(this);
    }

    handleChangeSelectType() {

    }

    getTypes(key, value) {
        //异步的操作
        //返回一个数组,包括这个基础类型对应的所有可以选择的类型

    }

    getFromFromJson() {
        const { rawJson } = this.state;
        let result = [];
        let i = 0;
        for (let key in rawJson) {
            const value = rawJson[key];
            const isSecondary = _.isArray(value) || _.isObject(value);

            //异步操作，根据rawJson的基础类型，给出相应的业务类型
            //比如如果是Number，则会有int，float，PhoneNumber...
            //基础类型确定后，表单后面的内容基本确定，长度，是否有二级等等

            //另一种表单的话，应该是type当中所有类型都存在，包括基础类型和业务类型，这是可以直接选择的
            let _result =

                <li>
                    <Input placeholder="Key" addonBefore={"key"} style={inputStyle} value={key} />
                    <Select defaultValue="String" style={inputStyle} onChange={this.handleChangeSelectType}>
                        <Option value="string" >String</Option>
                        <Option value="address">Address</Option>
                        {/* <Option value="disabled" disabled>Disabled</Option> */}
                        <Option value="text">text</Option>
                    </Select>

                    {
                        isSecondary ? <ul className="ant-form ant-form-inline">{this.getSecondaryform(key, value)}</ul> :
                            <Input addonBefore="Length" type="text" style={inputStyle} />
                    }
                </li>
            result.push(_result);
        }
        return result;

    }

    getSecondaryform(key, value) {
        if (_.isArray(value)) {
            return value.map((item, _key) => {
                return <li>
                    <Input addonBefore={"Key"} value={_key} />
                    <Select defaultValue="string">
                        <Option value="number"></Option>
                    </Select>
                </li>
            });
        }
        if (_.isObject(value)) {
            let result = [];
            for (let _key in value) {
                let _result = <li><Input addonBefore={_key} value={value[_key]} /></li>;
                result.push(_result);
            }
            return result;
        }
    }

    render() {
        const { history } = this.props;
        const { json } = this.state;
        const _key = "key";
        return <section className="form">
            <ul className="jsonForm">
                {this.getFromFromJson()}
            </ul>
        </section>

    }
}

function mapStateToProps(state) {
    return {  }
}

export default withRouter(connect(mapStateToProps)(JsonForm));
