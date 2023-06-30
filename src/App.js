import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";
import Layout from "./router";

function App() {
  const client = new ApolloClient({
    uri: process.env.REACT_APP_SERVER_URL,
    cache: new InMemoryCache(),
  });

  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div>
          <Layout />
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;
