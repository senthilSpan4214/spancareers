import "@/styles/globals.css";
import { Provider } from "react-redux";
import { store , persistor} from "@/redux/store";
import Headers from "@/components/Headers";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import { PersistGate } from "redux-persist/integration/react";

export default function App({ Component, pageProps }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {hasMounted && (
            <>
              <Headers />
              <Component {...pageProps} />
              <ToastContainer />
              <Footer />
            </>
          )}
        </PersistGate>
      </Provider>
    </>
  );
}
