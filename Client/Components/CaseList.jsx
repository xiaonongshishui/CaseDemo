import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { List, Avatar, Button, Spin, Icon ,Modal ,Input , message } from 'antd';

const iconStyle = {
    color: "#fff",
    cursor: "pointer"
};



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
            loading: false,
            loadingMore: false,
            showLoadingMore: true,
            isDialogOpen:false
        };
        this.handleCreateCase = this.handleCreateCase.bind(this);
        this.handleOpenDialog = this.handleOpenDialog.bind(this);
        this.handleCloseDialog = this.handleCloseDialog.bind(this);
    }

    handleCreateCase() {
        console.log(this.caseName);
        if (this.handleValidateCaseName(this.caseName.input.value)) {
            this.props.history.push('/caseCompile');
            this.handleCloseDialog();
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
        const { history } = this.props;
        const { caseList, loading, loadingMore, showLoadingMore ,isDialogOpen } = this.state;
        const loadMore = showLoadingMore ? (
            <div style={{ textAlign: 'center', marginTop: 12, height: 32, lineHeight: '32px' }}>
                {loadingMore && <Spin />}
                {!loadingMore && <Button onClick={this.onLoadMore}>loading more</Button>}
            </div>
        ) : null;

        return <div className="case_list" >
            <div style={{ textAlign: "right" }}>
                <Button type="primary" onClick={this.handleOpenDialog}>Create New Case</Button>
            </div>
            <h1>Case List</h1>
            {caseList.length > 0 ? <List
                className="demo-loadmore-list"
                loading={loading}
                itemLayout="horizontal"
                loadMore={loadMore}
                dataSource={caseList}
                renderItem={item => (
                    <List.Item actions={[<a>more</a>]}>
                        <List.Item.Meta
                            title={item.name}
                            description=""
                        />
                        <div>content</div>
                    </List.Item>
                )}
            /> : <div style={{ textAlign: "center" }}>No case<br />Please create one</div>}
            <Modal
                title="Create Case"
                visible={isDialogOpen}
                onOk={this.handleCreateCase}
                onCancel={this.handleCloseDialog}
            >
                <Input placeholder="Please enter the case name" ref={(ref)=>{this.caseName = ref}}/>
            </Modal>
        </div>
    }
}

function mapStateToProps(state) {
    return { caseList: state.case.caseList }
}

export default withRouter(connect(mapStateToProps)(CaseList));
