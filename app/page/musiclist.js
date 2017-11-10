import React from 'react'
import MusicListItem from '../components/musiclistitem'

let MusicList =React.createClass({
    render(){
        let listEle= null;
        //map集合会返回一个新的数组
        //key(列表里),react做页面更新时，
        // 比较当前的key与之前的key是否一致，再决定要不要更新
        listEle = this.props.musicList.map((item) => {
            return (
                <MusicListItem
                    focus={item === this.props.currentMusicItem}
                    key={item.id}
                    musicItem={ item }
                >
                    {item.title}
                </MusicListItem>
            );
    });
        return (
            <ul>
                { listEle }
            </ul>
        );
    }
});

export default MusicList;
