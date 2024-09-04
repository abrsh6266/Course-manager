import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <button className="btn">Hello daisyUI</button>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
