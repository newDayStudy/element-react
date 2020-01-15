import React from 'react';
import {Link} from 'react-router-dom';
import {Menu} from 'element-react';
import { menuData } from '../../assets/js/menu.js'
import '../../assets/views/menu.css';

export default class SliderMenu extends React.Component{
    handleMenu(){
        return  menuData.map((item,index)=>
          item.subMenu ? <Menu.SubMenu key={index} title={item.title} index={index.toString()}>
              { item.subMenu.map((sub, idx)=>
                  <Menu.Item key={idx} index={idx.toString()}><Link to={sub.router}>{sub.title}</Link></Menu.Item>
              ) }
          </Menu.SubMenu> : <Menu.Item key={index} index={index.toString()}><Link to={item.router}>{item.title}</Link></Menu.Item>
        )
    }
    render () {
        return (
            <Menu theme="dark">
                {this.handleMenu()}
            </Menu>
        )
    }
}