import "bootstrap/dist/css/bootstrap.min.css";

import { useEffect } from "react";

import Footer from "../components/footer";
import Navibar from "../components/navibar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle");
  }, []);
  return (
    <>
      <Navibar />
      <Component {...pageProps} />;
      <Footer />
    </>
  );
}

export default MyApp;
