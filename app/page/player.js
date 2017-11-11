import  React from 'react'
import './player.less'
import Progress from '../components/progress'
import { Link } from 'react-router'
import Pubsub from 'pubsub-js'

let duration = null;

class Player extends React.Component {
    constructor(props){
        super(props);
         this.state ={
            progress: 0,
            volume: 0,
            isPlay: true,
            leftTime: ''
        }
    }

    // getInitialState() {
    //     return {
    //         progress: 0,
    //         volume: 0,
    //         isPlay: true,
    //         leftTime: ''
    //     }
    // }

    //格式化时间
    formatTime(time) {
        time = Math.floor(time);
        let miniutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${miniutes}:${seconds}`;
    }

    //初始化播放进度
    componentDidMount() {
        $('#player').bind($.jPlayer.event.timeupdate, (e) => {
            duration = e.jPlayer.status.duration;
            this.setState({
                volume: e.jPlayer.options.volume * 100,
                progress: e.jPlayer.status.currentPercentAbsolute,
                leftTime: this.formatTime(duration * (1 - e.jPlayer.status.currentPercentAbsolute / 100)),
            });
        });
    }

    //播放进度
    progressChangeHandler(progress) {
        $('#player').jPlayer(this.state.isPlay ? 'play' : 'pause', duration * progress);
        // $('#player').jPlayer('play');
        this.setState({isPlay: true});
    }

    //调节音量
    changeVolumeHandler(progress) {
        $('#player').jPlayer('volume', progress);
    }

    //开始暂停
    play() {
        if (this.state.isPlay) {
            $('#player').jPlayer('pause');
        } else {
            $('#player').jPlayer('play');
        }
        this.setState({
            isPlay: !this.state.isPlay
        })
    }

    //函数销毁
    componentWillUnMount() {
        $('#player').unbind($.jPlayer.event.timeupdate);
    }

    //上下曲
    playPrev() {
        Pubsub.publish('PLAY_PREV');
    }

    playNext() {
        Pubsub.publish('PLAY_NEXT');
    }

    //切换播放方式
    Repeatplayer() {
        Pubsub.publish('REPEAT_PLAY');
    }

    render() {
        return (
            <div className="player-page">
                <h1 className="caption"><Link to="/list">我的私人音乐坊 &gt;</Link></h1>
                <div className="mt20 row">
                    <div className="controll-wrapper">
                        <h2 className="music-title">{this.props.currentMusicItem.title}</h2>
                        <h3 className="music-artist mt10">{this.props.currentMusicItem.artist}</h3>
                        <div className="row mt20">
                            <div className="left-time -col-auto">{this.state.leftTime}</div>
                            <div className="volume-container">
                                <i className="icon-volume rt" style={{top: 5 , left: -5}}></i>
                                <div className="volume-wrapper">
                                    <Progress progress={this.state.volume} onProgressChange={this.changeVolumeHandler}
                                              barColor="orange"/>
                                </div>
                            </div>
                        </div>
                        <div style={{height: 10, lineHeight: '10px', marginTop: 10}}>
                            <Progress progress={this.state.progress} onProgressChange={this.progressChangeHandler.bind(this)}
                                      barColor="#000000"/>
                        </div>
                        <div className="mt35 row">
                            <div>
                                <i className="icon prev" onClick={this.playPrev}></i>
                                <i className={`icon ml20 ${this.state.isPlay ? 'pause' : 'play'}`}
                                   onClick={this.play.bind(this)}></i>
                                <i className="icon next ml20" onClick={this.playNext}></i>
                            </div>
                            <div className="-col-auto">
                                <i className={`icon repeat-${this.props.repeatType}`} onClick={this.Repeatplayer}></i>
                            </div>
                        </div>
                    </div>
                    <div className="-col-auto cover">
                        <div className="coverBox coverBg">
                            <img draggable="false" className={`rotate ${this.state.isPlay ? '':'isRotate'}`}
                                 src={this.props.currentMusicItem.cover} alt={this.props.currentMusicItem.title}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Player;