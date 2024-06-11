import { Provider } from "react-redux";
import "./App.css";
import { LayoutCointainer } from "./styled-components";
import store from "./redux/store";
import Home from "./pages/Home/Home";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <Provider store={store}>
      <Navbar></Navbar>
      <LayoutCointainer>
        <Home />
      </LayoutCointainer>
    </Provider>
  );
}

export default App;
