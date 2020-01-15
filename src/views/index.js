
import React from 'react';
import { Layout } from 'element-react';
import SlideMenu from './menu/'
import Headers from './header/'
export default class Admin extends React.Component{
    render () {
        return (
            <Layout.Row>
                <Layout.Col span="2" className="slide-menu">
                    <SlideMenu></SlideMenu>
                </Layout.Col>
                <Layout.Col span="24" className="main" gutter="3">
                    <Layout.Row>
                        <Headers></Headers>
                    </Layout.Row>
                    <Layout.Row className="content">
                        {this.props.children}
                    </Layout.Row>
                </Layout.Col>
            </Layout.Row>

            
        )
    }
}