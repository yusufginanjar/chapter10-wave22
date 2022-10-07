import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";
import { wrapper, store } from "../store";
import { Provider } from "react-redux";

import Footer from "../components/footer";
import Navibar from "../components/navibar";
import "../styles/globals.scss";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);
  return (
    <>
      <Provider store={store}>
        <Navibar />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  );
}

// export default MyApp;
export default wrapper.withRedux(MyApp);
