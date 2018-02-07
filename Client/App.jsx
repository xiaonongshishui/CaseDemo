import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link , withRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'reducers/index';
import 'assets/css/main.less'

import CaseList from 'components/CaseList'
import CaseCompile from 'components/CaseCompile'
import CaseDetail from 'components/CaseDetail'

import { Menu ,Icon } from 'antd';

const CaseMenu = ({ handleClickMenu }) => {
    return <Menu
        onClick={handleClickMenu}
        // selectedKeys={[this.state.current]}
        mode="horizontal"
          theme="dark"
    >
        <Menu.Item key="0">
           <Link to="/"> <Icon type="menu-fold" />Case List</Link>
    </Menu.Item>
    </Menu>
}


export default class App extends Component {
    constructor(props) {
        super(props);
    }
    handleClickMenu = ({ item, key, keyPath }) => { 
        if (key === '0') { 
            console.log(this.props);
        }
    }

    render() {
        return <Provider store={store}>
                <Router>
                <div style={{ width: "100%", height: "100%" }} className="main">
                    <CaseMenu handleClickMenu={this.handleClickMenu}/>
                        <Route path="/" exact component={CaseList}/>
                        <Route path="/caseCompile" exact component={CaseCompile}/>
                        <Route path="/caseDetail/:caseId" exact component={CaseDetail}/>
                    </div>
                </Router>
            </Provider>
    }
}

