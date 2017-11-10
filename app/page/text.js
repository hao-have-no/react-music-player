import React from 'react';

let Root=React.createClass({
     getInitialState(){
         return {
            id:'eee',
        }
     },
    componentDidMount(){
        $.ajax({
            url:'/',
            type:'get',
            dataType:'json',
            success : function(data){
                this.setState({
                    id: data,
                });
                console.log(data)
            },
            error : function(err){
                console.log(err);
                console.log("视图渲染失败...");
            }
        })
     },
    componentWillUnMount(){

    },
    render(){
        return(
            <div>
                <ul>
                    <li>{this.state.id}</li>
                </ul>
            </div>
            )
        document.getElementById('root');
    }
});

export default Root;