import React, {Component} from 'react';
import './App.css';
import {withRouter,Router,Switch} from 'react-router-dom';
import history from './history';
import axios from 'axios';

import Route from 'react-router-dom/Route';
import SponsorLayout from '../adminWebsite/components/layouts/SponsorLayout';
import AdminLayout from '../adminWebsite/components/layouts/AdminLayout';
import AdminNewSchoolReview from '../adminWebsite/adminNewSchoolReview';
import AdminAccessReview from '../adminWebsite/adminAccessReview';
import AdminRoleCheck from '../adminWebsite/adminRoleCheck';
import TrustRegister from '../adminWebsite/trustRegister';
import TrustLogin from '../adminWebsite/trustLogin';
import VolunteerRegister from '../adminWebsite/VolunteerRegister';
import AdminPendingWorkflow from '../adminWebsite/adminPendingWorkflow';
import AdminSchoolCheck from '../adminWebsite/adminSchoolCheck';
import ReferVolunteer from '../adminWebsite/ReferVolunteer';
import ConfirmatinScreen from '../adminWebsite/confirmationScreen';
import TrustMemberScreen from '../adminWebsite/TrustMemberScreen';
import AdminUploadDEOresponse from '../adminWebsite/adminUploadDEOresponse';

class App extends Component {
  state = {
    user:"",
    spinner:false
  }

  saveUser=(updatedUser)=>{
    this.setState({user:updatedUser,spinner:true});
    axios.post('http://localhost:6060/puthuyir/user',updatedUser)
    .then(res=>{
        console.log(res);
        this.setState({spinner:false});
        history.push("/confirmation");
    })
  }
  
  render(){
    const AdminLayoutRoute=({component:Component,...rest})=>{
      return(
        <Route {...rest} render={props=>(
          <AdminLayout {...props}>
            <Component {...props}/>
          </AdminLayout>
        )}/>
      )
    }
    const SponsorLayoutRoute=({component:Component,...rest})=>{
      return(
        <Route {...rest} render={props=>(
          <SponsorLayout {...props}>
            <Component {...props}/>
          </SponsorLayout>
        )}/>
      )
    }
    return (
      <div>   
        <Router history={history}>
          <Switch>
            <Route path="/confirmation" component={()=><ConfirmatinScreen/>}/>
            <Route path="/trustRegister" history={history}component={()=><TrustRegister saveUser={(user)=>this.saveUser(user)}/>}/>}/>
            <Route exact path="/login" history={history} component={()=><TrustLogin />}/>
            <Route path="/volunteerRegister" history={history} component={(props)=><VolunteerRegister saveUser={(user)=>this.saveUser(user)}{...props}/>}/>
            <AdminLayoutRoute path="/adminNewSchoolReview" history={history} component={(props)=><AdminNewSchoolReview {...props}/>}/>
            <AdminLayoutRoute path="/adminPendingWorkflow" history={history} component={(props)=><AdminPendingWorkflow {...props}/>}/>
            <AdminLayoutRoute path="/accessReview" history={history} component={(props)=><AdminAccessReview {...props}/>}/>
            <AdminLayoutRoute path="/adminSchoolCheck" history={history} component={(props)=><AdminSchoolCheck {...props}/>}/>
            <AdminLayoutRoute path="/adminRoleCheck" history={history} component={(props)=><AdminRoleCheck {...props}/>}/>
            <AdminLayoutRoute path="/adminUploadDEOresponse" history={history} component={(props)=><AdminUploadDEOresponse {...props}/>}/>
            <SponsorLayoutRoute path="/trustMemberScreen" history={history} component={(props)=><TrustMemberScreen {...props}/>}/>
            <SponsorLayoutRoute path="/referVolunteer" history={history} component={(props)=><ReferVolunteer {...props}/>}/>}/>
          </Switch>
        </Router>
        {this.state.spinner?<div class="spinner"></div>:null}
      </div>
    );
  }
}

export default withRouter(App);
