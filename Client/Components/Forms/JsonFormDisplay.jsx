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

class JsonFormDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regular: [
                { name: "a", type: "str", length: 6 },
                { name: "b", type: "email", length: null },
                {
                    name: "c",
                    type: "object",
                    children: [
                        { name: "c-1", type: "address", length: 6 },
                        { name: "c-2", type: "address", length: 6 },
                        { name: "c-3", type: "address", length: 6 },
                    ]
                },
                {
                    name: "appleLists",
                    type: "list",
                    length:10,
                    children: [{Name:null,type:"address",length:2}]
                }
            ],
            caseTypes: [
                { "type": "object", "name": "object", "lenable": false },
                { "type": "basis", "name": "decimal", "lenable": false },
                { "type": "array", "name": "list", "lenable": true },
                { "type": "basis", "name": "str", "lenable": true },
                { "type": "object", "name": "dict", "lenable": false },
                { "type": "basis", "name": "float", "lenable": false },
                { "type": "basis", "name": "int", "lenable": false },
                { "type": "basis", "name": "ssn", "lenable": false },
                { "type": "basis", "name": "phone_number", "lenable": false },
                { "type": "basis", "name": "name", "lenable": false },
                { "type": "basis", "name": "text", "lenable": true },
                { "type": "basis", "name": "job", "lenable": false },
                { "type": "basis", "name": "uri", "lenable": false },
                { "type": "basis", "name": "email", "lenable": false },
                { "type": "basis", "name": "date_time", "lenable": false },
                { "type": "basis", "name": "date", "lenable": false },
                { "type": "basis", "name": "credit_card_number", "lenable": false },
                { "type": "basis", "name": "company", "lenable": false },
                { "type": "basis", "name": "color_name", "lenable": false },
                { "type": "basis", "name": "address", "lenable": false },
              ]
        };
    }

    componentDidMount() { 
        this.getExpandStatus();
    }

    getExpandStatus() { 
        let expandStatus = {};
        const { regular } = this.state;
        regular.map((ele,i) => { 
            if (ele.children) { 
                expandStatus[i] = true;
            }
        })
        this.setState({expandStatus});
    }


    getKeyValueByTypeName=(typeName, key)=>{
        const { caseTypes } = this.state;
        return (caseTypes.filter((ele, i) => {
          if (typeName === ele.name) {
            return true;
          }
        }))[0][key];
      }

    getFormFromRegular = () => {
        const { regular , expandStatus } = this.state;
        return regular.map((item, i) => {
            const basicType = this.getKeyValueByTypeName(item.type, "type");
            return <li key={i}>
                <Input addonBefore="Key" defaultValue={item.name} disabled />
                <Input addonBefore="Type" defaultValue={item.type} disabled />
                {_.isNumber(item.length) ? <Input addonBefore="Length" defaultValue={item.length} disabled /> : null}
                {item.children && expandStatus ? <div className="icon" onClick={()=>this.handleExpandSecondary(i)}><i className={"fa " + (expandStatus[i]?"fa-chevron-circle-down":"fa-chevron-circle-right")}></i></div>:null}
                {this.getSecondary(item, basicType, i)}
            </li>
        });
    }

    getSecondary = (item, basicType, parentIndex) => {
        const { regular , expandStatus } = this.state;
        if (basicType === 'object') {
            return <ul style={{display:expandStatus && expandStatus[parentIndex]?"block":"none"}}>
                {
                    item.children.map((ele, i) => {
                        return <li key={`${i}`}>
                            <Input addonBefore="Key" defaultValue={ele.name} disabled/>
                            <Input addonBefore="Type" defaultValue={ele.type} disabled/>
                            {_.isNumber(ele.length) ? <Input addonBefore="Length" defaultValue={ele.length} disabled/> : null}
                        </li>
                    })
                }
            </ul>
        } else if (basicType === 'array') {
            return <ul style={{display:expandStatus && expandStatus[parentIndex]?"block":"none"}}><li>
                <Input addonBefore="Type" defaultValue={item.children[0].type} disabled/>
                {_.isNumber(item.children[0].length) ? <Input addonBefore="Length" defaultValue={item.children[0].length} disabled/> : null}
            </li>
            </ul>
        }
    }

    handleExpandSecondary = (parentIndex) => {
        console.log("111");
        console.log(parentIndex);
        const { expandStatus } = this.state;
        expandStatus[parentIndex] = !expandStatus[parentIndex];
        this.setState({expandStatus});
    }

    render() {
        const { history } = this.props;
        const { json ,expandStatus} = this.state;
        const _key = "key";
        console.log(expandStatus);
        return <section className="form">
            <ul className="jsonForm">
                {this.getFormFromRegular()}
            </ul>
        </section>

    }
}

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps)(JsonFormDisplay));
