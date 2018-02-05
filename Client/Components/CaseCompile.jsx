import React, {Component} from 'react';
import {connect} from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import jsoneditor from 'jsoneditor';

class CaseCompile extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const { history } = this.props;
        return <div className="case_compile">
            <h1>case compile</h1>
            <div>

            </div>
        </div>
    }
}

function mapStateToProps(state) {
    return {chatRoomsNameList: state.chatRooms.chatRoomsNameList}
}

export default withRouter(connect(mapStateToProps)(CaseCompile));
