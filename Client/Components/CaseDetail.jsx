import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { Menu, Icon, Form, Input, Button, Select, Row, Col, InputNumber, Tabs, message ,Spin } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import CaseGenerateView from 'components/CaseGenerateView';
import DummyDataView from 'components/DummyDataView';

// import { insertManual, getCaseDetail ,generateDummyData } from 'actions/CaseAction';

const CaseTab = ({ handleOnChangeTab, activeKey }) => {
  return <Tabs defaultActiveKey="0" activeKey={activeKey} onChange={handleOnChangeTab} type="card">
    <TabPane tab="Case Detail" key="0"></TabPane>
    <TabPane tab="View Dummy Data" key="1"></TabPane>
  </Tabs>
}



class CaseDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTabKey: "0",
      json: {
        "name": "Jack",
        "age": 18,
        "sex": "male",
        "apples": ["1", "2", "3"],
        "object": {
          a: 1,
          b: 2
        }
      },
      regular: [],
      isLoading: false
    };
    this.number = 0;
  }

  componentDidMount() {
    const { dispatch, match } = this.props;
    const caseId = match.params.caseId;
    
  }

  handleOnChangeTab = (key) => {
    this.setState({ activeTabKey: key });
  }
  submitJson = () => {
    const { dispatch, match } = this.props;
    const caseId = match.params.caseId;
    try {
      let json = this.editor.getJSON();
      console.log(json, typeof json);
      dispatch(insertManual(caseId, json)).then(() => { 
        message.success("Insert Manual Data Success");
      }, (err) => { 
        message.error("Insert Manual Data Failed");
      });
    } catch (e) {
      message.error("Illegal JSON");
    }
  }

  editorChange = (json) => {
    console.log(json, json instanceof Error);
  }

  generateData = () => {
    const { dispatch, match } = this.props;
    const caseId = match.params.caseId;
    this.setState({ isLoading: true });
    // console.log("this.quantity.value", this.number, typeof this.number);
    dispatch(generateDummyData(caseId, this.number)).then(() => { 
      this.setState({ isLoading: false });
      message.success("Generate Dummy Data Success!");
      this.setState({activeTabKey:"1"});
    }, (err) => {
      this.setState({ isLoading: false });
      message.error("Generate Dummy Data Failed!");
    });
  }

  onChangeQuantity = (value) => { 
    this.number = value;
  }
  render() {
    const { history } = this.props;
    const { activeTabKey, regular ,isLoading } = this.state;

    return <div className="case_detail">
      <Spin spinning={isLoading}>
        <CaseTab handleOnChangeTab={this.handleOnChangeTab} activeKey={activeTabKey} />

      <section className="middle">
        {activeTabKey === "0" ? <CaseGenerateView />:<DummyDataView />}
      </section>
</Spin>
    </div>
  }
}

function mapStateToProps(state) {
  return {}
}

export default withRouter(connect(mapStateToProps)(CaseDetail));
