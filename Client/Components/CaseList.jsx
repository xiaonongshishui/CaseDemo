import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { getCaseList, createCase } from 'actions/CaseAction';
import { List, Avatar, Button, Spin, Icon, Modal, Input, message } from 'antd';

const iconStyle = {
    color: "#fff",
    cursor: "pointer"
};

const hintStyle = {
    textAlign: "center",
    marginTop: "50px",
    lineHeight: "20px"
}

class CaseList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caseList: [
                {
                    id: 0,
                    name: "我是第一个case"
                },
                {
                    id: 1,
                    name: "我是第二个case"
                },
                {
                    id: 1,
                    name: "我是第二个case"
                },
                {
                    id: 1,
                    name: "我是第二个case"
                },
                {
                    id: 1,
                    name: "我是第二个case"
                }
            ],
            isDialogOpen: false,
            isLoading: false,
            confirmLoading:false
        };
        this.handleCreateCase = this.handleCreateCase.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(getCaseList());
    }

    handleCreateCase() {
        console.log(this.caseName);
        const { dispatch } = this.props;
        let caseName = this.caseName.input.value;
        if (this.handleValidateCaseName(caseName)) {
            this.setState({ confirmLoading: true });
            dispatch(createCase(caseName)).then(() => {
                this.setState({ confirmLoading: false });
                message.success("Create Success");
                dispatch(getCaseList());
                this.handleCloseDialog();
            }, (err) => {
                this.setState({ confirmLoading: false });
                message.error("Create failed")
            });
        } else {
            message.error("Please enter the right name");
        }
    }

    handleValidateCaseName(caseName) {
        return caseName !== "" && caseName !== null && caseName !== undefined;
    }

    handleOpenDialog() {
        this.setState({ isDialogOpen: true });
    }
    handleCloseDialog() {
        this.setState({ isDialogOpen: false });
    }

    render() {
        const { history, caseList } = this.props;
        const { isDialogOpen , isLoading ,confirmLoading } = this.state;
        console.log(caseList);

        return <div className="case_list" >
            
                <div style={{ textAlign: "right" }}>
                    <Button type="primary" onClick={this.handleOpenDialog}>Create New Case</Button>
                </div>
                <h1>Case List</h1>
                {caseList.length > 0 ? <List
                    className="demo-loadmore-list"
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={caseList}
                    renderItem={item => (
                        <List.Item actions={[<a href={`/caseDetail/${item.id}`}>more</a>]}>
                            <List.Item.Meta
                                title={item.name}
                                description=""
                            />
                            <div>content</div>
                        </List.Item>
                    )}
                /> : <div style={hintStyle}>No case<br />Please create one</div>}
                
                <Modal
                    title="Create Case"
                    visible={isDialogOpen}
                    confirmLoading={confirmLoading}
                    onOk={this.handleCreateCase}
                    onCancel={this.handleCloseDialog}
                >
                    <Input placeholder="Please enter the case name" ref={(ref) => { this.caseName = ref }} />  
                </Modal>
        </div>
    }
}

function mapStateToProps(state) {
    return { caseList: state.Case.caseList }
}

export default withRouter(connect(mapStateToProps)(CaseList));
