import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { Select, Row, Col, Button ,message } from 'antd'
import jsoneditor from 'jsoneditor';
import JsonFormControlled from 'components/Forms/JsonFormControlled';
import JSONEditorComponent from 'components/JSONData/JSONEditorComponent';

import DataTree from './JSONData/DataTree';

import { getSampleData } from 'actions/CaseAction';

class CaseCompile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "JSON",
            sampleData: {}
        }
        this.handleSelectMode = this.handleSelectMode.bind(this);
    }

    handleSelectMode = (value) => {
        this.setState({ mode: value });
    }

    handleEditorChange = (json) => {
        console.log(json, json instanceof Error);
    }

    submitJson = () => {
        const { dispatch, match } = this.props; 
        const caseId = match.params.caseId;
        try {
            let json = this.editor.getJSON();
            console.log(json, typeof json);
            dispatch(getSampleData(caseId, {
                rawjson:json
            })).then((data) => { message.success('get sample ok'); this.setState({sampleData:data});});
        } catch (e) {
            message.error("Illegal JSON");
        }
    }

    submitReqular = () => { 

    }

    render() {
        const { history } = this.props;
        console.log(this.props.match.params.caseId);
        const { mode ,sampleData } = this.state;
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
                        {mode === "JSON" ?
                            <JSONEditorComponent ref={(ref) => {
                                this.editor = ref;
                            }} editorChange={this.handleEditorChange}/> :
                            <JsonFormControlled />}
                    </Col>
                    <Col span={9}>
                        <div className="templateData">
                            <DataTree isShow data={sampleData}/>
                            <div style={{ textAlign: "center" }}>
                                <Button type="primary" onClick={mode === "JSON"?this.submitJson:this.submitReqular}>View the Sample</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
            <div className="footer">
                <Button type="danger" size="large" onClick={mode === "JSON"?this.submitJson:this.submitReqular}>Submit</Button>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps)(CaseCompile));
