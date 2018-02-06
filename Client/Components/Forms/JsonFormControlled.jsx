import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import { Icon, Form, Input, Button, Select, Tree } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;


import { getCaseTypes } from 'actions/CaseAction';
const inputStyle = {
    width: "150px"
}



class JsonFormControlled extends Component {
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

            // _regular: [
            //     { name: "a", type: "String", serviceType: null, length: 6 },
            //     { name: "b", type: "Array", serviceType: "name", length: 6 },
            //     {
            //         name: "c",
            //         type: "Object",
            //         children: [
            //             { name: "c-1", type: "String", serviceType: "address", length: 6 },
            //         ]
            //     }
            // ],
            regular: [
                { name: "", type: "str", length: null },
                // { name: "apples", type: "list", length: null, children: [{ name: null, type: "string", length: 10 }] }
            ],
            caseTypes: [
                { "type": "object", "name": "object", "lenable": false }, { "type": "basis", "name": "decimal", "lenable": false }, { "type": "array", "name": "list", "lenable": true }, { "type": "basis", "name": "str", "lenable": true }, { "type": "object", "name": "dict", "lenable": false }, { "type": "basis", "name": "float", "lenable": false }, { "type": "basis", "name": "int", "lenable": false }, { "type": "basis", "name": "ssn", "lenable": false }, { "type": "basis", "name": "phone_number", "lenable": false }, { "type": "basis", "name": "name", "lenable": false }, { "type": "basis", "name": "text", "lenable": true }, { "type": "basis", "name": "job", "lenable": false }, { "type": "basis", "name": "uri", "lenable": false }, { "type": "basis", "name": "email", "lenable": false }, { "type": "basis", "name": "date_time", "lenable": false }, { "type": "basis", "name": "date", "lenable": false }, { "type": "basis", "name": "credit_card_number", "lenable": false }, { "type": "basis", "name": "company", "lenable": false }, { "type": "basis", "name": "color_name", "lenable": false }, { "type": "basis", "name": "address", "lenable": false }
            ]
        };
        this.getKeyValueByTypeName = this.getKeyValueByTypeName.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleOnInput = this.handleOnInput.bind(this);
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getCaseTypes());
    }


    getKeyValueByTypeName(typeName, key) {
        const { caseTypes } = this.state;
        return (caseTypes.filter((ele, i) => {
            if (typeName === ele.name) {
                return true;
            }
        }))[0][key];
    }

    getFormFromRegular(regular) {
        const { caseTypes } = this.state;
        return regular.map((item, i) => {
            const basicType = this.getKeyValueByTypeName(item.type, "type");
            const isLenable = this.getKeyValueByTypeName(item.type, "lenable");
            console.log(basicType, isLenable);
            return <li key={i}>
                <Input addonBefore="Key" value={item.name} onChange={(e) => this.handleOnInput(e.target.value, "name", i)} />
                <Select value={item.type} onChange={(value) => { this.handleSelect(value, item, i) }}>
                    {
                        caseTypes.map((caseType, i) => {
                            return <Option value={caseType.name} key={i}>{caseType.name}</Option>
                        })
                    }
                </Select>
                {isLenable ? <Input addonBefore="Length" onChange={(e) => this.handleOnInput(e.target.value, "length", i)} /> : null}
                {basicType === 'object' ? <div className="icon"><i className="fa fa-plus-square-o"></i></div> : null}
                {this.getSecondary(item, basicType)}
            </li>
        });
    }

    getSecondary(item, basicType) {

        const { caseTypes } = this.state;
        if (basicType === 'object') {
            return <ul>
                {
                    item.children.map((ele, i) => {
                        return <li>
                            <Input addonBefore="Key" />
                            <Select value={item.type} onChange={(value) => { this.handleSelect(value, item, i) }}>
                                {
                                    caseTypes.map((caseType, i) => {
                                        return <Option value={caseType.name} key={i}>{caseType.name}</Option>
                                    })
                                }
                            </Select>
                            {isLenable ? <Input addonBefore="Length" onChange={(e) => this.handleOnInput(e.target.value, "length", i)} /> : null}
                        </li>
                    })
                }
            </ul>
        } else if (basicType === 'array') {
            return <ul><li>
                <Select defaultValue="string" onChange={() => { console.log(111) }}>
                    {
                        caseTypes.map((caseType, i) => {
                            return <Option value={caseType.name} key={i}>{caseType.name}</Option>
                        })
                    }
                </Select>
                {this.getKeyValueByTypeName(item.type, "lenable") ? <Input addonBefore="Length" /> : null}
            </li></ul>
        }
    }


    handleSelect(value, item, i) {
        console.log("onChange");
        let { regular } = this.state;
        regular[i].type = value;
        this.setState({ regular });
    }

    handleSecondarySelect() {

    }

    handleOnInput(value, key, index1, index2) {
        let { regular } = this.state;
        if (index2 === undefined) {
            regular[index1][key] = value;
        } else {
            regular[index1].children[index2][key] = value;
        }
        this.setState({regular});
    }



    render() {
        const { history } = this.props;
        const { json, regular } = this.state;
        console.log(regular);
        const _key = "key";
        return <section className="form">
            <Button type="primary">Create Key</Button>
            <ul className="jsonForm">
                {this.getFormFromRegular(regular)}
            </ul>
        </section>
    }
}

function mapStateToProps(state) {
    return { caseTypes: state.Case.caseTypes }
}

export default withRouter(connect(mapStateToProps)(JsonFormControlled));
