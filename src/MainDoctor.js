import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter, Route} from 'react-router-dom';

import PatientsList from './PatientsList'
import DoctorsLogin from './DoctorsLogin';
import Header from './Header'
import {auth, googleAuthProvider, emailAuthProvider, usersRef} from './services/firebase';



class MainDoctor extends Component {
  constructor() {
      super();

      this.state = {
          user: null,
          using: 'doctor'
      };

      this.logout = this.logout.bind(this);
  }

  componentWillMount() {
        let userRef = null;

        this.setState({
            version: 2
        });

        auth.onAuthStateChanged((user) => {
          if (user) {
            userRef = usersRef.child(user.uid);

            userRef.once('value').then((snapshot) => {
              if (snapshot.val()) {
                console.log("load user from DB");

                let userDB = snapshot.val();

                this.setState({
                  user: userDB
                });

                return;
              } else {
                let nameArr = user.displayName.split(' ');
                let first_name =  nameArr[0] || 'n/a';
                let last_name = nameArr[1] || 'n/a';
                let nationality  = "ghana";
                let sex = "male";
                let user_type = "eit";
                let {displayName, email, uid, photoURL} = user;

                let newUser = {
                  first_name,
                  last_name,
                  email,
                  nationality,
                  sex,
                  user_type,
                  displayName,
                  uid,
                  photoURL
                };

                // let payload = {
                //     user: newUser
                // };
                //
                // console.log("create user");
                // HTTP.post('/users', payload)
                //     .then((response) => {
                //         newUser.id = response.id;

                //save to firebase
                userRef.set(newUser);

                this.setState({user: newUser});

                // }).catch((err) => {
                //     console.error(err);
                // });
              }
            });
          }
        });
      }



logout() {
    console.log("set user to null");
    this.setState({
        user: null
    });
}
  render() {
    let {user, using} = this.state;
    return (
      <div>
        <HashRouter>
          <div>
            <Header using={using} user={user} logout={this.logout} />
            {/* <Route exact path="/" component={MainInterface} /> */}
            {user ? <PatientsList user={user} logout={this.logout} /> : <DoctorsLogin />}
          </div>
        </HashRouter>
      </div>
    );
  }
}

export default MainDoctor;
// ReactDOM.render(
//     <Index />,
//     document.getElementById('root')
// );
