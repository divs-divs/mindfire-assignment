import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SplitPane from 'react-split-pane';
import Info from '../Profile/Info';
import Password from './Password';
import './profile.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const Profile = () => (
  <Router>
    <SplitPane
      split="vertical"
      minSize={400}
      defaultSize={500}
      // resizerStyle={styles}
    >
      <menu id='menu'>
        <div ><Link to="/profile" id="link" className="lead font-weight-bold"><i className="mr-1 fa fa-info-circle" aria-hidden="true"></i><span>INFORMATION</span></Link></div>
        <div className='password'><Link to="/profile/password" id="link" className="lead font-weight-bold"><i className="mr-2 fa fa-unlock float-left" aria-hidden="true"></i>CHANGE PASSWORD</Link></div>
      </menu>
      <div>
        <ToastContainer/>
        <Route exact path="/profile" component={Info} />
        <Route path="/profile/password" component={Password} />
      </div>
    </SplitPane>
  </Router>
);

export default Profile;