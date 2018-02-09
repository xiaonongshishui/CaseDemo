import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { List, Avatar, Button, Spin, Icon, Modal, Input, message, Select, InputNumber, Row, Col, Collapse } from 'antd';
const Option = Select.Option;
const Panel = Collapse.Panel;

import DataTable from './JSONData/DataTable';
import DataTree from './JSONData/DataTree';
import FileSaver from 'file-saver';

import { getDummyData, generateDummyData , insertManual } from 'actions/CaseAction';
import JSONEditorComponent from './JSONData/JSONEditorComponent';

class DummyDataView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMode: "table",
            dummyData: [],
            isLoading: false,
            exportMode: "txt",
            isModalShow: false
        };
        this.number = undefined;

    }
    componentDidMount() {
        this.updateDummyData();
    }

    updateDummyData = () => {
        const { dispatch, match } = this.props;
        const caseId = match.params.caseId;
        this.setState({ isLoading: true });
        dispatch(getDummyData(caseId)).then((data) => {
            this.setState({ dummyData: data });
            this.setState({ isLoading: false });
            //message.success("Update Dummy Data Success");
        }, () => {
            this.setState({ isLoading: false });
            message.error("Update Dummy Data Failed");
        });
    }

    handleSelectDisplayMode = (value) => {
        this.setState({ displayMode: value });
    }
    export = () => {
        //FileSaver.saveAs(blob, "hello world.txt");
    }

    handleSelectExportMode = (exportMode) => {
        this.setState({ exportMode });
    }

    generateData = () => {
        const { dispatch, match } = this.props;
        const caseId = match.params.caseId;
        this.setState({ isLoading: true });
        // console.log("this.quantity.value", this.number, typeof this.number);
        if (this.number === undefined) {
            message.error("Wrong Quantity");
            return;
        }
        dispatch(generateDummyData(caseId, this.number)).then(() => {
            this.setState({ isLoading: false });
            message.success("Generate Dummy Data Success!");
            this.updateDummyData();
        }, (err) => {
            this.setState({ isLoading: false });
            message.error("Generate Dummy Data Failed!");
        });
    }

    onChangeQuantity = (value) => {
        this.number = value;
    }

    handleSwitchModal = (isModalShow) => {
        this.setState({ isModalShow });
    }

    submitManualJson = () => {
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


    render() {
        const { match } = this.props;
        const { displayMode, dummyData, isLoading, exportMode, isModalShow } = this.state;
        const caseId = match.params.caseId;
        return <div className="dummy_data">
            <Spin spinning={isLoading}>
                <div className="header">
                    <Row>
                        <Col span={12}>
                            <div className="item left">
                                <span>Quantity</span>
                                <InputNumber min={1} style={{ width: "120px" }} ref={(ref) => { this.quantity = ref }} onChange={this.onChangeQuantity} />
                                <Button type="primary" onClick={this.generateData}>Generate</Button>
                                <Button type="dashed" onClick={() => this.handleSwitchModal(true)}>Manual</Button>

                            </div>
                        </Col>
                        <Col span={12}>
                            <div className="item right">
                                <span>Export Type</span>
                                <Select defaultValue={"JSON"} onChange={this.handleSelectExportMode} style={{ width: "200px" }}>
                                    <Option value="json">JSON</Option>
                                    <Option value="txt">TXT</Option>
                                </Select>
                                <Button type="primary" onClick={this.export} ><a href={`http://192.168.202.35:8000/api/downloadfile/${caseId}/${exportMode}/`}>Export</a></Button>
                            </div></Col>
                    </Row>
                </div>
                <h1>Display Mode</h1>
                <Select defaultValue={"table"} onChange={this.handleSelectDisplayMode} style={{ width: "200px" }}>
                    <Option value="table">Table</Option>
                    <Option value="tree">Tree</Option>
                </Select>

                <section className="main">
                    <DataTable isShow={displayMode === "table"} data={dummyData} />
                    <DataTree isShow={displayMode === "tree"} data={dummyData} />
                </section>
            </Spin>
            <Modal
                visible={isModalShow}
                onOk={this.submitManualJson}
                onCancel={() => this.handleSwitchModal(false)}>
                <JSONEditorComponent editorChange={this.editorChange}
                    ref={(ref) => {
                        this.editor = ref;
                    }} />
            </Modal>
        </div>
    }
}

function mapStateToProps(state) {
    return { caseList: state.Case.caseList }
}

export default withRouter(connect(mapStateToProps)(DummyDataView));
