import { useQuery } from "@apollo/client";
import { async } from "@firebase/util";
import React, { useEffect } from "react";
import { fetchAllOrdersQuery } from "../../graphQl/queries/orderQuery";
import useOrders from "../../talon/useOrders";
import OrderCard from "./orderCard";

const Orders = () => {
  const { orders, loading, error } = useOrders();
  console.log("🚀 ~ file: orders.jsx:9 ~ Orders ~ data:", orders);

  return (
    <div className="flex flex-wrap gap-4 justify-center mt-6">
      {orders?.map((order) => (
        <OrderCard data={order} />
      ))}
    </div>
  );
};

export default Orders;

// import React, { useState, useEffect } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   isSignInWithEmailLink,
//   sendSignInLinkToEmail,
//   signInWithEmailLink,
// } from "firebase/auth";
// import { auth } from "../../config/firebase.config";

// const Orders = () => {
//   const [user] = useAuthState(auth);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const { search } = location;

//   const [email, setEmail] = useState("");

//   const [loginLoading, setLoginLoading] = useState(false);
//   const [loginError, setLoginError] = useState("");

//   const [infoMsg, setInfoMsg] = useState("");

//   const [initialLoading, setInitialLoading] = useState(false);
//   const [initialError, setInitialError] = useState("");

//   useEffect(() => {
//     // user is not signed in but the link is valid
    
//     console.log("🚀 ~ file: orders.jsx:54 ~ useEffect ~ isSignInWithEmailLink(auth, window.location.href):", isSignInWithEmailLink(auth, window.location.href))
//     if (isSignInWithEmailLink(auth, window.location.href)) {
//       // now in case user clicks the email link on a different device, we will ask for email confirmation
//       let email = localStorage.getItem("email");
//       if (!email) {
//         email = window.prompt("Please provide your email");
//       }
//       // after that we will complete the login process
//       setInitialLoading(true);
//       signInWithEmailLink(
//         auth,
//         localStorage.getItem("email"),
//         window.location.href
//       )
//         .then((result) => {
//           // we can get the user from result.user but no need in this case
//           console.log(result.user);
//           localStorage.removeItem("email");
//           setInitialLoading(false);
//           setInitialError("");
//           navigate("/");
//         })
//         .catch((err) => {
//           setInitialLoading(false);
//           setInitialError(err.message);
//           navigate("/login");
//         });
//     } else {
//       console.log("enter email and sign in");
//     }
//   }, [user, search, navigate]);

//   const handleLogin = (e) => {
//     e.preventDefault();
//     setLoginLoading(true);
//     sendSignInLinkToEmail(auth, email, {
//       // this is the URL that we will redirect back to after clicking on the link in mailbox
//       url: "http://localhost:3000/demo",
//       handleCodeInApp: true,
//     })
//       .then(() => {
//         localStorage.setItem("email", email);
//         setLoginLoading(false);
//         setLoginError("");
//         setInfoMsg("We have sent you an email with a link to sign in");
//       })
//       .catch((err) => {
//         setLoginLoading(false);
//         setLoginError(err.message);
//       });
//   };

//   return (
//     <div className="box">
//       {initialLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           {initialError !== "" ? (
//             <div className="error-msg">{initialError}</div>
//           ) : (
//             <>
//               {/* We are checking user because for a split second, we will not have user */}
//               {user ? (
//                 // so instead of seeing form, I am using this please wait msg
//                 <div>Please wait...</div>
//               ) : (
//                 // for a split second we will see this form
//                 <form className="form-group custom-form" onSubmit={handleLogin}>
//                   <label>Email</label>
//                   <input
//                     type={"email"}
//                     required
//                     placeholder="Enter Email"
//                     className="form-control"
//                     value={email || ""}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                   <button type="submit" className="btn btn-success btn-md">
//                     {loginLoading ? (
//                       <span>Logging you in</span>
//                     ) : (
//                       <span>Login</span>
//                     )}
//                   </button>
//                   {/* show login error msg */}
//                   {loginError !== "" && (
//                     <div className="error-msg">{loginError}</div>
//                   )}

//                   {/* show info msg */}
//                   {infoMsg !== "" && <div className="info-msg">{infoMsg}</div>}
//                 </form>
//               )}
//             </>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Orders;
