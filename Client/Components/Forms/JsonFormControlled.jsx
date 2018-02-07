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
      regular: [
        { name: "", type: "str", length: null },
        // { name: "apples", type: "list", length: null, children: [{ name: null, type: "string", length: 10 }] }
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


  objAddChild = (i) => {
    const { regular } = this.state;
    regular[i].children.push({ name: "", type: "str", length: null });

    this.setState({
      regular
    })
  }

  removeRegular = (i, j) => {
    const { regular } = this.state;
    if (j) {
      let currentArr = regular[i].children;
      if (currentArr.length <= 1) {
        regular.splice(i, 1);
      } else {
        regular[i].children.splice(j, 1);
      }
    } else {
      if (regular.length >= 1) {
        regular.splice(i, 1);
      }
    }

    this.setState({
      regular
    })
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
        {basicType === 'object' ? <div className="icon"><i className="fa fa-plus-square-o" onClick={this.objAddChild.bind(this, i)}></i></div> : null}
        <div className="icon"><i className="fa fa-minus-square-o" onClick={this.removeRegular.bind(this, i,null)}></i></div>
        {this.getSecondary(item, basicType, i)}
      </li>
    });
  }

  getSecondary(item, basicType, parentIndex) {
    const { caseTypes, regular } = this.state;
    let _caseTypes = Object.assign([], caseTypes);
    for (let i = 0; i < _caseTypes.length; i++) {
      if (_caseTypes[i].type === 'object' || _caseTypes[i].type === 'array') {
        _caseTypes.splice(i, 1);
      }
    }
    console.log('getSecondary', regular[parentIndex].children);
    if (basicType === 'object') {
      return <ul>
        {
          item.children.map((ele, i) => {
            return <li key={`${i}`}>
              <Input addonBefore="Key" onChange={(e) => this.handleOnInput(e.target.value, "name", parentIndex, i)} />
              <Select value={ele.type} onChange={(value) => { this.handleSelect(value, item, parentIndex, i) }}>
                {
                  _caseTypes.map((caseType, i) => {
                    return <Option value={caseType.name} key={i}>{caseType.name}</Option>
                  })
                }
              </Select>
              {this.getKeyValueByTypeName(regular[parentIndex].children[i].type, "lenable") ? <Input addonBefore="Length" onChange={(e) => this.handleOnInput(e.target.value, "length", parentIndex, i)} /> : null}
              <div className="icon"><i className="fa fa-minus-square-o" onClick={this.removeRegular.bind(this, parentIndex, i)}></i></div>
            </li>
          })
        }
      </ul>
    } else if (basicType === 'array') {
      return <ul><li>
        <Select defaultValue="string" onChange={(value) => { this.handleSelect(value, item, parentIndex, 0) }}>
          {
            _caseTypes.map((caseType, i) => {
              return <Option value={caseType.name} key={i}>{caseType.name}</Option>
            })
          }
        </Select>
        {this.getKeyValueByTypeName(regular[parentIndex].children[0].type, "lenable") ? <Input addonBefore="Length" onChange={(e) => this.handleOnInput(e.target.value, "length", parentIndex, 0)} /> : null}
      </li></ul>
    }
  }


  handleSelect(value, item, i, j) {
    console.log("onChange", value, item, i);
    let { regular, caseTypes } = this.state;
    let current = null;
    if (j !== undefined) {
      regular[i].children[j].type = value;
    } else {
      regular[i].type = value;
      for (let i = 0, len = caseTypes.length; i < len; i++) {
        if (caseTypes[i].name === value) {
          current = caseTypes[i];
        }
      }
      if (current.type === 'object' || current.type === 'array') {
        regular[i].children = [{ name: "", type: "str" }]
      }
    }

    this.setState({ regular });
  }

  handleOnInput(value, key, index1, index2) {
    let { regular } = this.state;
    if (index2 === undefined) {
      regular[index1][key] = value;
    } else {
      regular[index1].children[index2][key] = value;
    }
    this.setState({ regular });
  }

  createBaseKey = () => {
    let { regular } = this.state;
    this.setState({
      regular: [...regular, { name: "", type: "str", length: null }]
    })
  }

  render() {
    const { history } = this.props;
    const { json, regular } = this.state;
    console.log('render', regular);
    return <section className="form_controlled">
    <div className="button"><Button type="primary" onClick={this.createBaseKey}>Create Key</Button></div>
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
