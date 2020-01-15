
import React from 'react';
import {Input, Form, FormItem, Button} from 'element-react';
import '../../assets/views/login.css';
export default class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          form: {
            username: 'admin',
            password: '123456'
          },
          loading: false,
          rules: {
              username:[
                {required:true, message: '请输入用户名', trigger: 'blur'}
              ],
              password: [
                {required:true, message: '请输入密码', trigger: 'blur'}
              ]
          }
        };
    }
    onChange(key, value){
        this.state.form[key] = value;
        this.forceUpdate();
    }
    onSubmit(e){
        this.setState({
            loading: true
        })
        e.preventDefault();
        this.refs.form.validate((valid) => {
          if (valid) {
            setTimeout(()=>{
                this.setState({
                    loading: false
                })
                localStorage.setItem('user', JSON.stringify(this.state.form))
                window.location.href = '#/views/ui/buttons'
            },2000)
          } else {
            this.setState({
                loading: false
            })
            console.log('error submit!!');
            return false;
          }
        });
    }
    render () {
        return (
            <div className="login-form">
                <h1 className="form-title">React Element</h1>
                <Form 
                    ref="form"
                    model={this.state.form} 
                    rules={this.state.rules} 
                    className="form" 
                >
                    <Form.Item prop="username">
                        <Input 
                            placeholder="请输入用户名" 
                            value={this.state.form.username}
                            onChange={this.onChange.bind(this, 'username')}
                        />
                    </Form.Item>
                    <Form.Item prop="password">
                        <Input 
                            type="password" 
                            placeholder="请输入密码" 
                            value={this.state.form.password} 
                            onChange={this.onChange.bind(this, 'password')}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" loading={this.state.loading} className="login-btn" onClick={this.onSubmit.bind(this)}>登录</Button>
                    </Form.Item>
                </Form>
            </div>
            
            
        )
    }
}