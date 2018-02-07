import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import { List, Avatar, Button, Spin, Icon ,Modal ,Input , message ,Select} from 'antd';
const Option = Select.Option;

import DataTable from './Json/DataTable';
import DataTree from './Json/DataTree';



class DummyDataView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayMode:"table"
        };
        
    }

    handleSelectDisplayMode = (value) =>{ 
        this.setState({displayMode:value});
    }

    render() {
        const { displayMode } = this.state;
        return <div className="dummy_data">
        <h1>Display Mode</h1>    
            <Select defaultValue={"table"} onChange={this.handleSelectDisplayMode} style={{width:"200px"}}>
                <Option value="table">Table</Option>
                <Option value="tree">Tree</Option>
            </Select>
            <section className="main">

                {/* <DataTable isShow={displayMode === "table"} /> */}
                <DataTree isShow={displayMode === "tree"} />
                
            </section>
        </div>
    }
}

function mapStateToProps(state) {
    return { caseList: state.Case.caseList }
}

export default withRouter(connect(mapStateToProps)(DummyDataView));
