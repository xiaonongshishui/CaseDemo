import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import { Icon, Form, Input, Button, Select, Tree, InputNumber ,message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;


import { getCaseTypes, getCaseDetail } from 'actions/CaseAction';
const inputStyle = {
  width: "150px"
}



class JsonFormControlled extends Component {
  constructor(props) {
    super(props);
    this.state = {
      regular: [
        { name: "", type: "string", length: null },
        //{ name: "apples", type: "list", length: null, children: [{ name: null, type: "string", length: 10 }] }
      ],

    };
    this.getKeyValueByTypeName = this.getKeyValueByTypeName.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleOnInput = this.handleOnInput.bind(this);
  }

  componentDidMount() {
    const { dispatch, handleSetRegular, match ,handleSetSampleData} = this.props;
    const caseId = match.params.caseId;
    handleSetRegular(this.state.regular);
    dispatch(getCaseTypes());
    dispatch(getCaseDetail(caseId)).then(({ regular }) => {
      console.log("regular", regular, typeof regular);
      if (regular.length > 0) { 
        this.setState({ regular: Object.assign([], regular) });
        handleSetSampleData(caseId,regular);        
      }
    }, (err) => {
      message.error("Get Detail Failed");
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { handleSetRegular } = this.props;
    if (prevState.regular !== this.state.regular) {
      handleSetRegular(this.state.regular);
    }
  }


  getKeyValueByTypeName(typeName, key) {
    const { caseTypes } = this.props;
    if (caseTypes.length > 0) {
      return (caseTypes.filter((ele, i) => {
        if (typeName === ele.name) {
          return true;
        }
      }))[0][key];
    }
  }


  objAddChild = (i) => {
    const { regular } = this.state;
    regular[i].children.push({ name: "", type: "string", length: null });

    this.setState({
      regular: Object.assign([], regular)
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
      regular: Object.assign([], regular)
    })
  }

  getFormFromRegular(regular) {
    const { caseTypes } = this.props;
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
        {isLenable ? <InputNumber addonBefore="Length" min={0} value={item.length} onChange={(value) => this.handleOnInput(value, "length", i)} /> : null}
        {basicType === 'object' ? <div className="icon"><i className="fa fa-plus-square-o" onClick={this.objAddChild.bind(this, i)}></i></div> : null}
        <div className="icon"><i className="fa fa-minus-square-o" onClick={this.removeRegular.bind(this, i, null)}></i></div>
        {this.getSecondary(item, basicType, i)}
      </li>
    })
  }

  getSecondary(item, basicType, parentIndex) {
    const { regular } = this.state;
    const { caseTypes } = this.props;
    // let _caseTypes = Object.assign([], caseTypes);
    // for (let i = 0; i < _caseTypes.length; i++) {
    //   if (_caseTypes[i].type !== 'basis') {
    //     _caseTypes.splice(i, 1);
    //   }
    // }
    //console.log('getSecondary', regular[parentIndex].children);
    if (basicType === 'object') {
      return <ul>
        {
          item.children.map((ele, i) => {
            return <li key={`${i}`}>
              <Input addonBefore="Key" value={ele.name} onChange={(e) => this.handleOnInput(e.target.value, "name", parentIndex, i)} />
              <Select value={ele.type} onChange={(value) => { this.handleSelect(value, item, parentIndex, i) }}>
                {
                  caseTypes.map((caseType, i) => {
                    return <Option value={caseType.name} key={i}>{caseType.name}</Option>
                  })
                }
              </Select>
              {this.getKeyValueByTypeName(regular[parentIndex].children[i].type, "lenable") ? <InputNumber addonBefore="Length" min={0} value={ele.length} onChange={(value) => this.handleOnInput(value, "length", parentIndex, i)} /> : null}
              <div className="icon"><i className="fa fa-minus-square-o" onClick={this.removeRegular.bind(this, parentIndex, i)}></i></div>
            </li>
          })
        }
      </ul>
    } else if (basicType === 'array') {
      const ele = item.children[0];
      return <ul><li>
        <Select value={ele.type} onChange={(value) => { this.handleSelect(value, item, parentIndex, 0) }}>
          {
            caseTypes.map((caseType, i) => {
              return <Option value={caseType.name} key={i}>{caseType.name}</Option>
            })
          }
        </Select>
        {this.getKeyValueByTypeName(regular[parentIndex].children[0].type, "lenable") ? <InputNumber addonBefore="Length" min={0} value={ele.length} onChange={(value) => this.handleOnInput(value, "length", parentIndex, 0)} /> : null}
      </li></ul>
    }
  }


  handleSelect(value, item, i, j) {
    console.log("onChange", value, item, i);
    let { regular } = this.state;
    const { caseTypes } = this.props;
    let current = null;
    if (j !== undefined) {
      regular[i].children[j].type = value;
      if (this.getKeyValueByTypeName(value, "type") !== 'basis') { 
        return;
      }
    } else {
      regular[i].type = value;
      for (let i = 0, len = caseTypes.length; i < len; i++) {
        if (caseTypes[i].name === value) {
          current = caseTypes[i];
        }
      }
      if (current.type === 'object') {
        regular[i].children = [{ name: "", type: "string", length: null }]
      }
      if (current.type === 'array') {
        regular[i].children = [{ name: null, type: "string" ,length:null}]
      }
    }

    this.setState({ regular: Object.assign([], regular) });
  }

  handleOnInput(value, key, index1, index2) {
    if (value === undefined) { 
      value = null;
    }
    let { regular } = this.state;
    if (index2 === undefined) {
      regular[index1][key] = value;
      
    } else {
      regular[index1].children[index2][key] = value;
    }
    this.setState({ regular: Object.assign([], regular) });
  }

  createBaseKey = () => {
    let { regular } = this.state;
    this.setState({
      regular: [...regular, { name: "", type: "string", length: null }]
    })
  }

  render() {
    const { history, caseTypes } = this.props;
    const { json, regular } = this.state;
    console.log('render', regular);
    console.log("caseTypes", caseTypes);
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
