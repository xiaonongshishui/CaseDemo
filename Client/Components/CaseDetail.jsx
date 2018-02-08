import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { Menu, Icon, Form, Input, Button, Select, Row, Col, InputNumber, Tabs } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const TabPane = Tabs.TabPane;

import JSONEditorComponent from 'components/JSONData/JSONEditorComponent';
import JsonFormDisplay from 'components/Forms/JsonFormDisplay';
import DummyDataView from 'components/DummyDataView';


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
      }
    }
  }

  handleOnChangeTab = (key) => {
    this.setState({ activeTabKey: key });
  }
  submitJson = () => {
    try {
      let json = this.editor.getJSON();
      console.log(json, typeof json);
    } catch (e) {
      alert('err');
    }
  }
  
  editorChange = (json) => {
    console.log(json, json instanceof Error);
  }
  render() {
    const { history } = this.props;
    const { activeTabKey } = this.state;

    return <div className="case_detail">
      <CaseTab handleOnChangeTab={this.handleOnChangeTab} activeKey={activeTabKey} />
      {/* <section className="middle" style={{ display: activeTabKey === "0" ? "block" : "none" }}> */}
      <section className="middle">
        {activeTabKey === "0" ? <Row>
          <Col span={10}>
            <JsonFormDisplay />
          </Col>
          <Col span={8}>
            <JSONEditorComponent
              editorChange={this.editorChange}
              ref={(ref) => {
                this.editor = ref;
              }}
            />
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              <Button type="primary" onClick={this.submitJson}>Submit Manual Data</Button>
            </div>
          </Col>
          <Col span={6} style={{ textAlign: "center" }}>
            <Form>
              <FormItem>
                <h1>Please Enter the Quantity</h1>
                <InputNumber min={1} style={{ width: "120px" }} />

              </FormItem>
              <Button type="danger" size="large">Generate Data</Button>
            </Form>
          </Col>
        </Row> : <DummyDataView />}

      </section>

    </div>
  }
}

function mapStateToProps(state) {
  return {}
}

export default withRouter(connect(mapStateToProps)(CaseDetail));
