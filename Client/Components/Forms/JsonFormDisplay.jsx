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
import { getCaseTypes } from 'actions/CaseAction';

class JsonFormDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getCaseTypes());
        this.getExpandStatus();
    }

    getExpandStatus() { 
        let expandStatus = {};
        const { regular } = this.props;
        regular.map((ele,i) => { 
            if (ele.children) { 
                expandStatus[i] = true;
            }
        })
        this.setState({expandStatus});
    }


    getKeyValueByTypeName=(typeName, key)=>{
        const { caseTypes } = this.props;
        let arr = (caseTypes.filter((ele, i) => {
            if (typeName === ele.name) {
                return true;
            }
        }));
        if (arr.length > 0) { 
            return arr[0][key];
        }
      }

    getFormFromRegular = () => {
        const { regular } = this.props;
        const { expandStatus } = this.state;
        return regular.length > 0 ?regular.map((item, i) => {
            const basicType = this.getKeyValueByTypeName(item.type, "type");
            return <li key={i}>
                <Input addonBefore="Key" defaultValue={item.name} disabled />
                <Input addonBefore="Type" defaultValue={item.type} disabled />
                {_.isNumber(item.length) ? <Input addonBefore="Length" defaultValue={item.length} disabled /> : null}
                {item.children && expandStatus ? <div className="icon" onClick={()=>this.handleExpandSecondary(i)}><i className={"fa " + (expandStatus[i]?"fa-chevron-circle-down":"fa-chevron-circle-right")}></i></div>:null}
                {this.getSecondary(item, basicType, i)}
            </li>
        }):null
    }

    getSecondary = (item, basicType, parentIndex) => {
        const { regular } = this.props;
        const { expandStatus } = this.state;
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
    return {caseTypes: state.Case.caseTypes}
}

export default withRouter(connect(mapStateToProps)(JsonFormDisplay));
