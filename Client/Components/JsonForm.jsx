import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Link } from 'react-router-dom';
import _ from 'underscore';
import {Icon, Form, Input, Button, Select } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;

const inputStyle = {
    width:"200px"
}

class JsonForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rawJson: {
                "name": "Jack",
                "age": 18,
                "sex": "male",
                "apples": ["1", "2", "3"],
                "object": {
                    a: 1,
                    b: 2
                }
            }
        };
        this.handleChangeSelectType = this.handleChangeSelectType.bind(this);
        this.getFromFromJson = this.getFromFromJson.bind(this);
        this.getSecondaryform = this.getSecondaryform.bind(this);
    }

    handleChangeSelectType(){

    }

    getTypes(key,value){
        //异步的操作
        //返回一个数组,包括这个基础类型对应的所有可以选择的类型
        
    }

    getFromFromJson(){
        const { rawJson } = this.state;
        let result = [];
        for(let key in rawJson){
            const value = rawJson[key];
            const isSecondary = _.isArray(value) || _.isObject(value);

            //异步操作，根据rawJson的基础类型，给出相应的业务类型
            //比如如果是Number，则会有int，float，PhoneNumber...
            //基础类型确定后，表单后面的内容基本确定，长度，是否有二级等等

            //另一种表单的话，应该是type当中所有类型都存在，包括基础类型和业务类型，这是可以直接选择的
            let _result = <Form layout="inline">
                    <FormItem>
                        <div>Key</div>
                        <Input placeholder="Key" style={inputStyle} value={key}/>
                    </FormItem>
                    <FormItem>
                        <div>Type</div>
                        <Select defaultValue="String" style={inputStyle} onChange={this.handleChangeSelectType}>
                            <Option value="string" >String</Option>
                            <Option value="address">Address</Option>
                            {/* <Option value="disabled" disabled>Disabled</Option> */}
                            <Option value="text">text</Option>
                        </Select>
                    </FormItem>
                    {
                        isSecondary?null:<FormItem>
                        <div>Length</div>
                        <Input type="text" style={inputStyle}/>
                    </FormItem>
                    }
                    {isSecondary?<div>
                        {this.getSecondaryform(value)}
                    </div>:null}
            </Form>
            result.push(_result);
        }
        return result;

    }

    getSecondaryform(value){
        if(_.isArray(value)){
            return value.map((item,key)=>{
                return <FormItem><span>{key}</span><Input value={item}/></FormItem>
            });
        }
        if(_.isObject(value)){
            for(let key in value){
                return <FormItem><span>{key}</span><Input value={value[key]}/></FormItem>
            }
        }
    }

    render() {
        const { history } = this.props;
        const { json } = this.state;
        return <section className="form">

                {this.getFromFromJson()}

            </section>
    
    }
}

function mapStateToProps(state) {
    return { chatRoomsNameList: state.chatRooms.chatRoomsNameList }
}

export default withRouter(connect(mapStateToProps)(JsonForm));
