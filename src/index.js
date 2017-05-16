import React from 'react';
import ReactDOM from 'react-dom';
import Banner from './Banner';
import ABout from './About';
import Contact from './Contact';
import BookApt from './BookApt';
import MainDoctor from './MainDoctor'
import {HashRouter, Route, Switch} from 'react-router-dom';


class Access extends React.Component {
    render() {
        return (

                    <div>
                        <HashRouter>
                            <Switch>
                                <Route exact path="/" component={Banner}/>
                                <Route path="/about" component={ABout} />
                                <Route path="/bookapt" component={BookApt} />
                                <Route path="/contact" component={Contact} />
                                <Route path="/patients" component={MainDoctor} />
                            </Switch>
                        </HashRouter>

                    </div>
        );
    }
}

ReactDOM.render(
    <Access />,
    document.getElementById('root')
);
