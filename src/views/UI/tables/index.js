import React from 'react';
import {Layout,Table,Pagination,Button,MessageBox,Message,Dialog,Input,DatePicker} from 'element-react';

export default class Tables extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            columns: [
                {
                  label: "日期",
                  prop: "date",
                  width: 180,
                  sortable: true
                },
                {
                  label: "姓名",
                  prop: "name",
                  width: 180
                },
                {
                  label: "地址",
                  prop: "address"
                },
                {
                    label: '操作',
                    render:(row,column, index)=>{
                        return <span>
                                <Button type="danger" size="small" onClick={this.handleDelete.bind(this, row.id)}>删除</Button>
                                <Button type="info" size="small" onClick={this.handleEdit.bind(this, row)}>编辑</Button>
                            </span>
                       
                    }
                }
              ],
            data: [],
            page1:[
                {
                    id:1,
                    date: '2016-05-02',
                    name: '王小虎1',
                    address: '上海市普陀区金沙江路 1518 弄'
                  }, {
                    id:2,
                    date: '2016-05-04',
                    name: '王小虎2',
                    address: '上海市普陀区金沙江路 1517 弄'
                  }, {
                    id:3,
                    date: '2016-05-01',
                    name: '王小虎3',
                    address: '上海市普陀区金沙江路 1519 弄'
                  }, {
                    id:4,
                    date: '2016-05-03',
                    name: '王小虎4',
                    address: '上海市普陀区金沙江路 1516 弄'
                  },{
                    id:5,
                    date: '2016-05-02',
                    name: '王小虎5',
                    address: '上海市普陀区金沙江路 1518 弄'
                  }
            ],
            page2:[
                {
                    id:6,
                    date: '2016-05-04',
                    name: '王小虎6',
                    address: '上海市普陀区金沙江路 1517 弄'
                  }, {
                    id:7,
                    date: '2016-05-01',
                    name: '王小虎7',
                    address: '上海市普陀区金沙江路 1519 弄'
                  }, {
                    id:8,
                    date: '2016-05-03',
                    name: '王小虎8',
                    address: '上海市普陀区金沙江路 1516 弄'
                }
            ],
            currentPage:1,
            pageSize:5,
            dialogVisible:false,
            temp: {},
            id:8,
            addColumns:{
                name: '',
                date: new Date(),
                address: ''
            }
        }
    }
    componentWillMount(){
        let {page1, data} = this.state
        data = page1
        this.setState({
            data: [...data]
        })
    }
    handleDelete(id){
        MessageBox.confirm('确定删除此记录吗？','',{
            type: 'warning',
        }).then(()=>{
            const data = this.state.data
            data.splice(id-1,1)
            this.setState({
                data: [...data]
            })
            Message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(()=>{
            Message({
                type: 'info',
                message: '已取消删除'
            });
        })
    }
    handleEdit(row){
        this.setState({
            dialogVisible: true,
            temp: Object.create(row) //避免数据双向绑定，直接修改了数据
        })
    }
    onChange(key, value){
        const {temp} = this.state
        temp[key] = value
        this.setState({
            temp: temp
        })
    }
    handle(){
        var temp = this.state.temp
        MessageBox.confirm('确定要修改吗？','',{
            type: 'warning'
        }).then(()=>{
            setTimeout(()=>{
                var data = this.state.data
                data[temp.id-1] = temp
                this.setState({
                    data: [...data],
                    dialogVisible: false
                })
            },1000)
            Message({
                type: 'success',
                message: '修改成功'
            })
        }).catch(()=>{
            Message({
                type: 'info',
                message: '已取消修改'
            })
        })
    }
    addColums(){
        let {id, addColumns,data} = this.state
        id++;
        addColumns['id'] = id;
        data.push(addColumns)
        Message({
            type: 'success',
            message: '添加成功'
        })
        setTimeout(()=>{
            this.setState({
                id: id,
                addColumns: {},
                data: [...data]
            })
        },3000)
    }
    onChange(key, value){
        const {addColumns} = this.state
        addColumns[key] = value
        this.setState({
            addColumns: addColumns
        })
    }
    formatDate(date){
        var y = date.getFullYear()
        var m = date.getMonth() + 1 > 9 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)
        var d = date.getDate() > 9 ? date.getDate() : '0' + date.getDate()
        return y + '-' + m + '-' + d
    }
    onCurrentChange(pages){
        let currentPage = this.state['page'+pages]
        let data = currentPage
        this.setState({
            data: [...data],
            currentPage: pages
        })
    }
    onSizeChange(pager){
        let {data, page1, page2} = this.state
        if(pager > 5){
            data = page1.concat(page2)
        } else {
            data = page1
        }
        this.setState({
            data: [...data],
            pageSize: pager
        })
    }
    render () {
        const {addColumns} = this.state
        return (
            <Layout.Row>
                <Layout.Row className="btn-group" >
                    <Layout.Col span="4">
                        <Input placeholder="请输入姓名" value={addColumns.name} onChange={this.onChange.bind(this, 'name')}></Input> 
                    </Layout.Col>
                    <Layout.Col span="4" offset="1">
                        <Input placeholder="请输入地址" value={addColumns.address} onChange={this.onChange.bind(this, 'address')}></Input>
                    </Layout.Col>
                    <Layout.Col span="4" offset="1">
                        <DatePicker placeholder="请选择日期" value={new Date(addColumns.date )} onChange={date=>{
                            let {addColumns} = this.state
                            addColumns.date = this.formatDate(date)
                            this.setState({ 
                                addColumns: addColumns
                            })
                        }}></DatePicker>
                    </Layout.Col>
                    <Layout.Col span="4">
                        <Button type="primary" onClick={this.addColums.bind(this)}>添加</Button>
                    </Layout.Col>
                </Layout.Row>
                
                <Table
                    stripe={true}
                     style={{width: '100%'}}
                     columns={this.state.columns}
                     data={this.state.data}
                ></Table>
                <Layout.Row>
                    <Layout.Col span="6" offset="18">
                        <Pagination layout="total,sizes,prev, pager, next" pageSize={this.state.pageSize} currentPage={this.state.currentPage} total={8} className="pagination"
                        onCurrentChange={this.onCurrentChange.bind(this)}
                        onSizeChange={this.onSizeChange.bind(this)}
                        pageSizes={[5, 10, 20, 30]}
                        />
                    </Layout.Col>
                </Layout.Row>
                <Dialog
                    title="编辑信息"
                    size="tiny"
                    visible={ this.state.dialogVisible }
                    onCancel={ () => this.setState({ dialogVisible: false }) }
                    lockScroll={ false }
                >
                    <Dialog.Body>
                        <Layout.Row className="padding">
                            <Input placeholder="请输入名字" value={this.state.temp.name} onChange={this.onChange.bind(this, 'name')}/>
                        </Layout.Row>
                        <Layout.Row className="padding">
                            <Input placeholder="请输入地址" value={this.state.temp.address} onChange={this.onChange.bind(this, 'address')}/>
                        </Layout.Row>
                        <Layout.Row className="padding">
                            <DatePicker
                                value={new Date(this.state.temp.date)}
                                placeholder="选择日期"
                                onChange={date=>{
                                    const temp = this.state.temp
                                    temp.date = this.formatDate(date)
                                    this.setState({temp: temp})
                                }}
                                />
                        </Layout.Row>
                        
                    </Dialog.Body>
                    <Dialog.Footer className="dialog-footer">
                    <Button onClick={ () => this.setState({ dialogVisible: false }) }>取消</Button>
                    <Button type="primary" onClick={ this.handle.bind(this) }>确定</Button>
                    </Dialog.Footer>
                </Dialog>
            </Layout.Row>
        )
    }
}