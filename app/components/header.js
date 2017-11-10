import React from 'react';
import './header.less';

let Header=React.createClass({
  render(){
      return (
          <div className="components-header row">
              <img src="../static/images/logo.png" width="40" alt="" className="-col-auto"/>
               <h1 className="caption">It's My Music</h1>
              <img src="../static/images/psb.gif" width="60" className="-col-auto" />
          </div>
      );
  }
});

export default Header;