import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from 'reducers/index';
import 'assets/css/main.less'

import CaseList from 'components/CaseList'
import CaseCompile from 'components/CaseCompile'
import CaseDetail from 'components/CaseDetail'


export default class App extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Provider store={store}>
                <Router>
                    <div style={{width: "100%", height: "100%"}} className="main">
                        <Route path="/" exact component={CaseList}/>
                        <Route path="/caseCompile" exact component={CaseCompile}/>
                        <Route path="/caseDetail/:caseId" exact component={CaseDetail}/>
                    </div>
                </Router>
            </Provider>
    }
}
