import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import JSONTree from 'react-json-tree';



class DataDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data:{
                array: [1, 2, 3],
                bool: true,
                object: {
                  foo: 'bar'
                }
              }
        };
        
    }

  



    render() {
        
        return <JSONTree data={this.state.data} />
    }
}

function mapStateToProps(state) {
    return { caseTypes: state.Case.caseTypes }
}

export default withRouter(connect(mapStateToProps)(DataDisplay));
