import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import _ from 'underscore';
// import JsonTable from 'ts-react-json-table';
import { Table, Icon, Divider } from 'antd';

// const columns = [{
//   title: 'tableKey',
//   dataIndex: 'tableKey',
//   key: 'tableKey',
//   render: text => <span>{text}</span>,
// }, {
//   title: 'type',
//   dataIndex: 'type',
//   key: 'type',
// }, {
//   title: 'value',
//   dataIndex: 'value',
//   key: 'value',
//   render: text => <span>{JSON.stringify(text)}</span>,

// }];

class DataTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        array: [1, 2, 3],
        bool: true,
        object: {
          foo: 'bar'
        }
      }, {
        array: [1, 2, 3],
        bool: true,
        object: {
          foo: 'bar'
        }
      }]
    };

  }
  getType = (src) => {
    let type = null;
    switch (Object.prototype.toString.call(src)) {
      case "[object String]":
        type = "string";
        break;
      case "[object Number]":
        type = "number";
        break;
      case "[object Null]":
        type = "null";
        break;
      case "[object Boolean]":
        type = "boolean";
        break;
      case "[object Object]":
        type = "object";
        break;
      case "[object Array]":
        type = 'array';
        break;
      default:
        break;
    }
    return type;
  }
  getJsonList = (json) => {
    json = this.state.data[0]

    if (!json) return {};
    let that = this;
    that.jsonList = [];


    function spreadObj(src, key) {
      for (let i in src) {
        let type = that.getType(src[i]);
        that.jsonList.push({ tableKey: `${key}.${i}`, value: src[i], type: that.getType(src[i]), key: that.jsonList.length });
        if (type === 'array' || type === 'object') {
          spreadFn(json[i], i);
        }
      }
    }
    function spreadArr(src, key) {
      let preListItem = that.jsonList[that.jsonList.length - 1];

      for (let i = 0; i < src.length; i++) {
        let type = that.getType(src[i]);
        that.jsonList.push({ tableKey: `${preListItem.tableKey}[${i}]`, value: src[i], type: type, key: that.jsonList.length });
      }
    }
    function spreadFn(val, inputKey) {
      let type = that.getType(val);
      let schemaFn = {
        object: spreadObj,
        array: spreadArr,
      }
      return schemaFn[type](val, inputKey);
    }

    for (let i in json) {
      let type = that.getType(json[i])
      that.jsonList.push({ tableKey: `${i}`, value: json[i], type: type, key: that.jsonList.length });
      if (type === 'array' || type === 'object') {
        spreadFn(json[i], i);
      }
    }
    return that.jsonList;
  }
  getColumns = (json) => {
    // let json = this.jsonList;
    let columns = [{
      title: "index",
      dataIndex: "index",
      key: "index",
      render: text => <span>{text}</span>,
    }];

    json.map((item) => {
      columns.push({
        title: item.tableKey,
        dataIndex: item.tableKey,
        key: item.tableKey,
        render: text => <span>{text}</span>,
      });
    });
    return columns;
  }
  getTableData = (json, i) => {
    let data = { index: i, key: i };
    json.map((item) => {
      data[item.tableKey] = JSON.stringify(item.value);
    });
    return data;
  }
  render() {
    const { isShow } = this.props;
    let tableData = [];
    const { data } = this.state;
    let columns = null;
    data.map((item, i) => {
      // tableData = [...tableData, ...this.getJsonList(item)];
      let json = this.getJsonList(item);
      if (i === 0) {
        columns = this.getColumns(json);
      }
      tableData.push(this.getTableData(json, i));
    });
    // data.push(this.getJsonList());
    console.log('table', tableData, columns)
    return <div style={{display:isShow?"block":"none"}}>
      {/* <JsonTable rows={this.state.data} /> */}
      <Table columns={columns} dataSource={tableData} />
    </div>
  }
}

function mapStateToProps(state) {
  return { caseTypes: state.Case.caseTypes }
}

export default withRouter(connect(mapStateToProps)(DataTable));
