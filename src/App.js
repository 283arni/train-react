import Layout from "./hoc/Layout/Layout";
import Quiz from "./container/Quiz/Quiz";
import Auth from "./components/Auth/Auth";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import QuizList from "./components/QuizList/QuizList";
import {Route, Switch, Redirect} from 'react-router-dom';
import classes from './App.module.css'
import {connect} from "react-redux";
import {Component} from "react";
import Logout from "./components/Logout/Logout";
import {autoLogin} from "./redux/actions/auth";

class App extends  Component {

  componentDidMount() {
    this.props.autoLogin()
  }

  render() {
    return (
      <div className={classes.App}>
        <Layout>
          {this.props.isAuth ?
            <Switch>
              <Route exact path="/quiz-creator" component={QuizCreator}/>
              <Route path="/quiz/:id" component={Quiz}/>
              <Route exact path="/logout" component={Logout}/>
              <Route exact path="/" component={QuizList}/>
              <Redirect to="/"/>
            </Switch>
            :
            <Switch>
              <Route exact path="/auth" component={Auth}/>
              <Route exact path="/quiz/:id" component={Quiz}/>
              <Route exact path="/" component={QuizList}/>
              <Redirect to="/"/>
            </Switch>
          }
        </Layout>
      </div>
    );
  }
}

const  mapStateToProps = (state) => ({
  isAuth: !!state.auth.token
})

const mapDispatchToProps = (dispatch) => ({
  autoLogin: () => dispatch(autoLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
