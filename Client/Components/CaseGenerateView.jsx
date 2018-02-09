import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { Select, Row, Col, Button, message } from 'antd'
const Option = Select.Option;
import jsoneditor from 'jsoneditor';
import JsonFormControlled from 'components/Forms/JsonFormControlled';
import JSONEditorComponent from 'components/JSONData/JSONEditorComponent';

import DataTree from './JSONData/DataTree';

import { getCaseDetail , getSampleData } from 'actions/CaseAction';

class CaseGenerateView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: "FORM",
            sampleData: {},
            regular:[]
        }
        this.handleSelectMode = this.handleSelectMode.bind(this);
    }

    handleSelectMode = (value) => {
        this.setState({ mode: value });
    }

    handleSetRegular = (regular) => { 
        this.setState({regular});
    }
    

    handleEditorChange = (json) => {
        console.log(json, json instanceof Error);
    }

    handleSetSampleData = (caseId, regular) => {
        const { dispatch } = this.props;
        dispatch(getSampleData(caseId, { regular })).then((data) => { 
            this.setState({ sampleData: data });
            //message.success('Get Sample Success');
        }, () => { 
            message.error('Get Sample Error');
        });
    }

    submitJson = (isSubmit) => {
        const { dispatch, match } = this.props; 
        const caseId = match.params.caseId;
        try {
            let json = this.editor.getJSON();
            console.log(json, typeof json);
            dispatch(getSampleData(caseId, {
                rawjson:json
            })).then((data) => {
                if (isSubmit) {
                    message.success("Submit Success");
                    this.submitToDetailPage();
                } else { 
                    this.setState({ sampleData: data });
                    message.success('Get Sample Success');
                }
                
            });
        } catch (e) {
            message.error("Illegal JSON");
        }
    }

    submitReqular = (isSubmit) => { 
        const { dispatch , match } = this.props;
        const { regular } = this.state;
        const caseId = match.params.caseId;
        if (this.validateRegular(regular)) { 
            dispatch(getSampleData(caseId, { regular })).then((data) => { 
                if (isSubmit) {
                    message.success("Submit Success");
                    this.submitToDetailPage();
                } else { 
                    message.success('Get Sample Success');                    
                    this.setState({ sampleData: data });
                }
            });
        }
    }

    validateRegular = (regular) => { 
       
        if (regular.length > 0) { 
            for (let i = 0; i < regular.length; i++) {
                
                if (regular[i].name === "") { 
                    message.error("Key can not be empty!");
                    return false;
                }
            
                if (regular[i].children && regular[i].children.length >0 && regular[i].children[0].name !== null) { 
                    for (let j = 0; j < regular[i].children.length; j++) { 
                        if (regular[i].children[j].name === "") { 
                            message.error("Key can not be empty!");
                            return false;
                        }
                    }
                }
            }
            return true;
        } else {
            return true;
        }
    }

    submitToDetailPage=()=> { 
        const { history ,match } = this.props;
        history.push(`/caseDetail/${match.params.caseId}/`);
    }

    render() {
        const { history } = this.props;
        console.log(this.props.match.params.caseId);
        const { mode, sampleData } = this.state;
        console.log("sampledata", sampleData);
        console.log("regular",this.state.regular);
        return <div className="case_generate">
            <div className="main">
                <div className="header">
                    <h1>Compile Mode</h1>
                    <Select defaultValue="FORM" style={{ width: "200px" }} onChange={this.handleSelectMode}>
                        <Option value="FORM">FORM</Option>
                        <Option value="JSON">JSON</Option>
                    </Select>
                </div>

                <Row>
                    <Col span={15}>
                        {mode === "JSON" ?
                            <JSONEditorComponent ref={(ref) => {
                                this.editor = ref;
                            }} editorChange={this.handleEditorChange}/> :
                            <JsonFormControlled
                                handleSetRegular={this.handleSetRegular}
                                handleSetSampleData={this.handleSetSampleData}/>}
                    </Col>
                    <Col span={9}>
                        <div className="templateData">
                            <DataTree isShow data={sampleData}/>
                            <div style={{ textAlign: "center" }}>
                                <Button type="primary" onClick={mode === "JSON"?()=>this.submitJson(false):()=>this.submitReqular(false)}>Save & View Sample Data</Button>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {}
}

export default withRouter(connect(mapStateToProps)(CaseGenerateView));
