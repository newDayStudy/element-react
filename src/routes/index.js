
import React from 'react'
import {HashRouter, Route, Switch, Redirect } from  'react-router-dom'
import App from '../App'
import Admin from '../views/'
import Buttons from '../views/UI/buttons/'
import Colors from '../views/UI/colors/'
import Layouts from '../views/UI/layouts'
import Icons from '../views/UI/icons'
import Tables from '../views/UI/tables'
import Login from '../views/login/'
export default class Routers extends React.Component{
    render(){
        const user = localStorage.getItem('user')
        return (
            <HashRouter>
                <App>
                    <Route exact path='/'>
                        {
                        user ? <Redirect to='/views/ui/layouts' />
                        : <Redirect to='/login' />}
                    ></Route>
                    <Route path='/login' component={Login}/>
                    <Route path='/views' render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/views/ui/layouts" component={Layouts}></Route>
                                <Route path="/views/ui/colors" component={Colors}></Route>
                                <Route path="/views/ui/icons" component={Icons}></Route>
                                <Route path="/views/ui/buttons" component={Buttons}></Route>
                                <Route path="/views/ui/tables" component={Tables}></Route>
                            </Switch>
                        </Admin>
                    }/>
                </App>
            </HashRouter>
        )
    }
} 
