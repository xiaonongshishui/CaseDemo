import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import JsonTable from 'ts-react-json-table';

class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:[{
                array: [1, 2, 3],
                bool: true,
                object: {
                  foo: 'bar'
                }
              },{
                array: [1, 2, 3],
                bool: true,
                object: {
                  foo: 'bar'
                }
              }]
        };
        
    }


    render() {
        const { isShow } = this.props;
        return <div style={{display:isShow?"block":"none"}}><JsonTable rows={this.state.data} /></div>
    }
}

function mapStateToProps(state) {
    return { caseTypes: state.Case.caseTypes }
}

export default withRouter(connect(mapStateToProps)(DataTable));
