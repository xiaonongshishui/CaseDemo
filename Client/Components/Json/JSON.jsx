import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';

import JSONEditor from 'JSONEditor';
import "editor/dist/jsoneditor.min.css";

class JSONComponent extends Component {

  static defaultProps = {
  };

  constructor(props) {
    super(props);

    this.state = {
      // json: JSON.parse(JSON.stringify((props.json))),
      json: '{a:1}',
      list: false,
    };

    this.editor = null;
    this.editorRef = null;
    this.mode = "code";
    this.jsonList = [];
  }

  componentDidMount() {
    this.editor = new JSONEditor(this.editorRef, {
      mode: this.mode,
      onChange: this.handleChange,
    });
    window.editor = this.editor;
    if (this.props.json) {

      this.editor.set(this.props.json);
    }
  }

  componentWillReceiveProps(nextProps) {
    this.editor.set(nextProps.json);
    this.setState({
      json: nextProps.json,
    });
  }

  componentWillUnmount() {
    this.editor.destroy();
  }

  getProperties(){

  }

  getType(src){
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

  getSchema(json){

    if (!(json || this.getType(json) === 'object')) return {};
    this.jsonList = [];
    let that = this;
    let schema = {
      "title": "Example Schema",
      "type": 'object',
      properties: {}
    };
    function strSchema(src) {
      let allowSelectStr = new Set([
        "__name__",
        "__address__",
        "__firstName__",
        "__lastName__",
      ]);
      allowSelectStr.add(src);
      return {
        "enum": [...allowSelectStr]
      }
    }

    function numSchema(src) {
      let allowSelectNum = new Set([
        "__phone__",
        "__No__",
        "__age__",
      ]);
      allowSelectNum.add(src);
      return {
        "enum": [...allowSelectNum]
      }
    }

    function booleanSchema(src) {
      return {
        "enum": [true, false]
      }
    }

    function nullSchema(src) {
      return {
        "type": "null"
      }
    }
    function objSchema(src, key) {
      let oSchema = {
        type: 'object',
        properties: {}
      }
      for (let i in src) {

        that.jsonList.push({ key: `${key}[.]${i}`, value: src[i], type: that.getType(src[i]) });
        oSchema.properties[i] = selectSchemaFn(src[i], i);
      }
      return oSchema;
    }
    function arrSchema(src, key) {
      let aSchema = {
        type: "array",
        maxItems: 1,
        items: {
        }
      };
      let preListItem = that.jsonList[that.jsonList.length - 1];

      for (let i = 0; i < src.length; i++) {
        let type = that.getType(src[i]);
        that.jsonList.push({ key: `${preListItem.key}[]${i}`, value: src[i], type: type });
        aSchema.items = selectSchemaFn(src[i], `${key}[]${i}`);

      }


      return aSchema;
    }

    let schemaFn = {
      string: strSchema,
      number: numSchema,
      null: nullSchema,
      boolean: booleanSchema,
      object: objSchema,
      array: arrSchema,
    }
    function selectSchemaFn(val, inputKey) {
      let type = that.getType(val);
      return schemaFn[type](val, inputKey);
    }
    for (let i in json) {
      that.jsonList.push({ key: `${i}`, value: json[i], type: that.getType(json[i]) });
      schema.properties[i] = selectSchemaFn(json[i], i);
    }
    return schema;
  }

  schema(){
    let json = this.editor.get();
    let schema = this.getSchema(json);
    console.log(json, schema);
    this.editor.setSchema(schema);
  }
  toSelectType(){
    this.schema();
    this.editor.setMode("form");
    this.editor.expandAll();
    this.toggleList();
  }

  toEditorJSON(){

    this.editor.setMode("code");
    this.editor.setSchema({});
    this.editor.format();
    this.toggleList()
  }

  handleChange(){
    try {
      console.log('change');

      this.setState({
        json: this.editor.get(),
      });
    } catch (e) {
      // HACK! This should propagate the error somehow
      console.error(e);
    }
  }

  formatJSON(){
    this.editor.format();
  }

  changeMode(){
    let mode = this.mode;
    this.mode = mode === "code" ? "form" : "code";
    this.editor.setMode(this.mode);
  }

  renderInput(){
    console.log('render')
    let jsonList = this.jsonList;
    let List = [];
    for (let i = 0, len = jsonList.length; i < len; i++) {
      if (jsonList[i].type === 'array') {
        List.push(<div key={`${jsonList[i].key}-${i}`}>
          {i}-{jsonList[i].key}-<input placeholder="输入数量" />
        </div>)
      } else {
        List.push(<div key={`${jsonList[i].key}-${i}`}>
          {i}-{jsonList[i].key}-null
        </div>)
      }
    }
    return List;
  }

  toggleList(src){
    console.log('render list')
    this.setState({
      list: !this.state.list
    });
  }
  
  render() {
    const { height, width } = this.props;
    const { list } = this.state;
    console.log('render', this.state);
    window.z = this;
    return (
      <div>
        <div className="inputList">
          {list ? this.renderInput() : "wait List..."}
        </div>

        <div
          id='editor'
          ref={(ref) => { this.editorRef = ref; }}
          style={{ width: 400, height: 400, float: 'left' }}
        />
        <br />
        <br />
        <br />
        <button onClick={this.toSelectType}>toSelectType</button>
        <button onClick={this.toEditorJSON}>editJSON</button>
        <br />
        <br />
        <button onClick={this.formatJSON}>formatJSON</button>
        <button onClick={this.schema}>schema</button>
        <button onClick={this.changeMode}>changeMode</button>
        <button onClick={this.toggleList}>toggleList</button>        
      </div>

    );
  }
}


function mapStateToProps(state) {
  return {  }
}

export default withRouter(connect(mapStateToProps)(JSONComponent));
