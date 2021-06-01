
import { Provider } from "react-redux";
import store from "./config/redux";
import { AppRouter } from "./routes/App.routes";

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter />
    </Provider>
  );
}

export default App;
