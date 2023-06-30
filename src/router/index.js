import { Route, Routes } from "react-router-dom";
import Header from "../components/common/header";
import PdpContainer from "../components/pdp/pdpContainer";
import PlpContainer from "../components/plp/plpContainer";
import { paths } from "../constants/paths";

const Layout = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={paths.root} element={<PlpContainer />} />
        <Route path={paths.plp} element={<PlpContainer />} />
        <Route path={paths.pdp} element={<PdpContainer />} />
      </Routes>
    </>
  );
};

export default Layout;
