import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { signInWithEmailAndPassword, getAuth } from "../firebase/clientApp";
import Swal from "sweetalert2";
import styles from "../styles/Login.module.css";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const loginState = {
  email: "",
  password: "",
};
export default function SignIn() {
  const router = useRouter();
  const auth = getAuth();
  const [login, setLogin] = useState(loginState);
  const { email, password } = login;

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("games");
      }
    });
  });

  const handleOnChangeInput = (e) => {
    const { name, value } = e.target;
    setLogin({
      ...login,
      [name]: value,
    });
  };

  const authLogin = async () => {
    try {
      if ((email, password === "")) {
        await Toast.fire({
          icon: "warning",
          title: "please fill in the column first",
          timer: 1500,
        });
      } else {
        await Toast.fire({
          icon: "success",
          title: "signed in successfully",
        });
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(await user.user.getIdToken());
        router.push("games");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.myBG + " container"}>
      <div className="row  justify-content-center align-items-end py-5 ">
        <div className="d-flex m-5 col-md-10  justify-content-start  py-5 my-9">
          <div className="col-md-5  bg-white shadow rounded-start  p-3 d-flex flex-column align-items-center">
            <h2 className="text-center text-primary pt-5 pb-4">
              <span className="text-dark">Sign in</span> to Account
            </h2>

            <Form.Control
              className="col-md-auto d-flex flex-column mb-3 rounded"
              label="Email"
              type="email"
              name="email"
              placeholder="Your Email ... "
              onChange={handleOnChangeInput}
            />

            <Form.Control
              className="col-md-6 rounded"
              label="Password"
              type="password"
              name="password"
              placeholder="Password Here .."
              onChange={handleOnChangeInput}
            />
            <div className="col-md-12  d-flex justify-content-end pb-3">
              <button
                type="button"
                className="btn btn-link text-muted "
                onClick={() => {
                  router.push("/forget");
                }}
              >
                Forgot Password?
              </button>
            </div>
            <div className="col-md-7 offset-md-2 pb-5 ">
              <button
                type="button"
                className="btn btn-outline-primary col-md-8 rounded-pill "
                onClick={authLogin}
              >
                Log In
              </button>
            </div>
          </div>
          <div className="col-md-3 shadow bg-primary rounded-end p-3 d-flex flex-column text-light align-items-center justify-content-center">
            <h2 className="pb-3">Join the Game</h2>
            <div className=" border-bottom w-25  border-4 pt-4 border-light"></div>
            <p className="text-center py-auto mt-3">
              Fill up personal information and explore the games with us.
            </p>

            <div className="col-md-7 offset-md-2 pb-5 ">
              <button
                type="button"
                className="btn btn-outline-light col-md-8 rounded-pill "
                onClick={() => {
                  router.push("/register");
                }}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
