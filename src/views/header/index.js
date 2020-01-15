import React from 'react';
import {Layout} from 'element-react';
import logo from '../../assets/image/logo192.png';
export default class Headers extends React.Component{
    render () {
        return (
            <Layout.Row className="headers">
                <Layout.Col span="3" offset="21">
                    <img src={logo} alt="" className="avatar"/>
                    <span>张三</span>
                </Layout.Col>
            </Layout.Row>
        )
    }
}