import React from 'react';
import Header from './components/header';
import Player from './page/player';
import MusicList from './page/musiclist';
import MUSIC_LIST from './config/musiclist';
import {Router,IndexRoute,Link,Route,hashHistory} from 'react-router';


//音乐不播放器顶级组件
let App=React.createClass({
    getInitialState(){
        return {
            musicList:MUSIC_LIST,
            currentMusicItem:MUSIC_LIST[0],
            repeatType:'cycle'//循环类型，默认顺序播放
        }
    },
    playMusic(musicItem){
      $('#player').jPlayer('setMedia',{
         mp3: musicItem.file
      }).jPlayer('play');
        this.setState({
            currentMusicItem: musicItem
        });
    },
    playNext(type = "text"){
        let index=this.findMusicIndex(this.state.currentMusicItem);
        let newIndex = null;
        let musicListLength=this.state.musicList.length
        if (type === 'next'){
            newIndex =(index + 1) % musicListLength;
        }else {
            newIndex =(index - 1 +musicListLength) % musicListLength;
        }
        this.playMusic(this.state.musicList[newIndex]);
    },
    findMusicIndex(musicItem){
        return this.state.musicList.indexOf(musicItem);
    },
    playWhenEnd(){
        let Type = this.state.repeatType;
        if(Type === 'random'){
            let musiclistLength = this.state.musicList.length;
            let index = Math.ceil(Math.random() * (musiclistLength - 1));
            this.playMusic(this.state.musicList[index]);
        }else if (Type === 'once') {
            this.playMusic(this.state.currentMusicItem);
        }else {
            this.playNext('next');
        }
    },
    componentDidMount(){
        var self=this;
        $('#player').jPlayer({
            supplied: 'mp3',
            wmode:'window',
            ended:function () {
                self.playWhenEnd();
            }
        });
       this.playMusic(this.state.currentMusicItem);

        PubSub.subscribe('DELETE_MUSIC',(msg,musicItem) =>{
            if(this.state.currentMusicItem === musicItem){
                this.playNext('next');
            };
            this.setState({
                musicList:this.state.musicList.filter(item=>{
                    return item !== musicItem;
                    //现在的item不等于现在需要删除的item
                })
            })
        });
        PubSub.subscribe('PlAY_MUSIC',(msg,musicItem) =>{
           this.playMusic(musicItem);
        });
        PubSub.subscribe('PLAY_PREV',(msg,musicItem) =>{
            this.playNext('prev');
        });
        PubSub.subscribe('PLAY_NEXT',(msg,musicItem) =>{
            this.playNext('next');
        });
        //绑定事件（观察者模式），底层组件监听反映到上层处理，底层做好逻辑处理再反馈到上层组件
        //React.cloneElement给所有子元素添加当前的属性（ROOT是父组件，易用子组件传递属性，也是中枢部分，所有底层的通用的都可以再次声明）
        let repeatList=['once','cycle','random']
        PubSub.subscribe("REPEAT_PLAY",(msg,musicList)=>{
            let index=repeatList.indexOf(this.state.repeatType);
            this.setState({
                repeatType:repeatList[(index+1)%repeatList.length]
            });
        })
    },
    componentWillUnMount(){
        PubSub.unsubscribe('PLAY_MUSIC');
        PubSub.unsubscribe('DELETE_MUSIC');
        PubSub.unsubscribe('PlAY_MUSIC');
        PubSub.unsubscribe('PLAY_NEXT');
        $('#player').unbind($.jPlayer.event.ended);
    },
    render(){
        return (
            <div>
                <Header />
                { React.cloneElement(this.props.children,this.state) }
                </div>
        );
    }
});
//控制页面的跳转
let Root=React.createClass({
    render(){
        return (
        <Router history={hashHistory}>
            <Route path="/" component={App}>
            <IndexRoute component={Player}></IndexRoute>
            <Route path="/list" component={MusicList}></Route>
        </Route>
        </Router>
        );
    }
});

export default Root;
