import { Route, Routes } from "react-router-dom";
import Header from "../components/common/header";
import LoginDialog from "../components/login";
import PdpContainer from "../components/pdp/pdpContainer";
import PlpContainer from "../components/plp/plpContainer";
import SignupForm from "../components/signup";
import { paths } from "../constants/paths";
import Checkout from "../components/checkout/checkout";
import Orders from "../components/orders/orders";
import { Login } from "../components/demo/Login";

const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={paths.signup} element={<SignupForm />} />
        <Route path={paths.login} element={<LoginDialog />} />
        <Route path={paths.root} element={<PlpContainer />} />
        <Route path={paths.plp} element={<PlpContainer />} />
        <Route path={paths.pdp} element={<PdpContainer />} />
        <Route path={paths.checkout} element={<Checkout />} />
        <Route path={paths.orders} element={<Orders />} />
        <Route path="/demo" element={<Login />} />
      </Routes>
    </>
  );
};

export default Layout;
