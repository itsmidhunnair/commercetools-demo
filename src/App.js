import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import Layout from "./router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MiniCart from "./components/cart/miniCart";

function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_SERVER_URL,
    cache: new InMemoryCache(),
    credentials: "include",
  });

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div>
          <Layout />
          <div id="recaptcha-container"></div>
        </div>
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
