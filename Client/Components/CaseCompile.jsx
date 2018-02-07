import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { Select, Row, Col, Button } from 'antd'
import jsoneditor from 'jsoneditor';
import JsonFormControlled from 'components/Forms/JsonFormControlled';
import JSONComponent from 'components/JSON/JSONComponent';

import DataTree from './Json/DataTree';

// import JSON from './Json/JSON'

class CaseCompile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "JSON"
        }
        this.handleSelectMode = this.handleSelectMode.bind(this);
    }

    handleSelectMode(value) {
        this.setState({ mode: value });
    }

    render() {
        const { history } = this.props;
        const { mode } = this.state;
        return <div className="case_compile">
           <div className="main">
                <div className="header">
                    <h1>Compile Mode</h1>
                    <Select defaultValue="JSON" style={{ width: "200px" }} onChange={this.handleSelectMode}>
                        <Option value="JSON">JSON</Option>
                        <Option value="FORM">FORM</Option>
                    </Select>
            </div>
            
                <Row>
                    <Col span={15}>
                        {mode === "JSON" ? <JSONComponent /> : <JsonFormControlled />}
                    </Col>
                    <Col span={9}>
                        <div className="templateData">
                            <DataTree />
                            <div style={{ textAlign: "center" }}>
                                <Button type="primary">View the Sample</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer">
                <Button type="danger" size="large">Submit</Button>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps)(CaseCompile));
