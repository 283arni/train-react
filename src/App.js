import Layout from "./hoc/Layout/Layout";
import Quiz from "./container/Quiz/Quiz";
import Auth from "./components/Auth/Auth";
import QuizCreator from "./components/QuizCreator/QuizCreator";
import QuizList from "./components/QuizList/QuizList";
import {Route, Switch} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Layout>
        <Switch>
          <Route exact path="/auth" component={Auth}/>
          <Route exact path="/quiz-creator" component={QuizCreator}/>
          <Route path="/quiz/:id" component={Quiz}/>
          <Route exact path="/" component={QuizList}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
