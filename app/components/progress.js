import React from 'react'
import './progress.less'

let Progress=React.createClass({
    getDefaultProps(){
      return {
          barColor:'#000000'
      }
    },
    changeProgress(e){
        let progressBar= this.refs.progressBar;
        let progress= (e.clientX-progressBar.getBoundingClientRect().left)/progressBar.clientWidth;
        this.props.onProgressChange && this.props.onProgressChange(progress);
        console.log(progress);
    },
    render(){
        return (
            <div className="components-progress" ref="progressBar" onClick={this.changeProgress}>
                <div className="progress" style={{width: `${this.props.progress}%`,background:this.props.barColor}}></div>
            </div>
        );
    }
});

export default Progress;