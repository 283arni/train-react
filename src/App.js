import Layout from "./hoc/Layout/Layout";
import Quiz from "./container/Quiz/Quiz";

function App() {
  return (
    <div className="App">
      <Layout>
        <Quiz />
      </Layout>
    </div>
  );
}

export default App;
