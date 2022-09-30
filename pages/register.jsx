import React, { useState as _useState } from 'react';
import { Form } from 'react-bootstrap';
import { uid } from 'uid';
import { useRouter as _useRouter } from 'next/router';
import { login as stateLogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

import {
  createUserWithEmailAndPassword,
  getAuth,
  ref,
  set,
  getDatabase,
  onValue,
} from '../firebase/clientApp';
const registerState = {
  username: "",
  password: "",
  email: "",
  bio: 0,
  score: 0,
};
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
export default function signup() {
  const db = getDatabase();
  const auth = getAuth();
  const router = _useRouter();
  const [user, setUser] = _useState(registerState);
  const { username, email, password, score, bio } = user;
  const handleRegisterInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  const dispatch = useDispatch();
  const handleRegister = async () => {
    if ((username, password, email === "")) {
      await Toast.fire({
        icon: "warning",
        title: "please fill in the column first",
        timer: 1500,
      });
    } else {
      if (password.length < 6) {
        alert("please input password 6 character");
      } else {
        const uuid = uid();
        await createUserWithEmailAndPassword(auth, email, password);
        await set(
          ref(db, `/users/${auth.currentUser.uid}`, {
            uuid,
          }),
          {
            username,
            password,
            email,
            score,
            bio,
          }
        );
        const dataRef = ref(db, `/users/${auth.currentUser.uid}`);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(stateLogin(data))
        });
        await Toast.fire({
          icon: "success",
          title:
            "register is successful and will be redirected to the homepage",
          timer: 2400,
        });
        await router.push("/games");
      }
    }
  };
  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100 ">
          <div className="row d-flex justify-content-center align-items-center h-100 ">
            <div className="col-lg-12 col-xl-11 ">
              <div className="card rounded-end">
                <div className=" ">
                  <div className="row  justify-content-end">
                    <div className="col-md-7 bg-primary d-flex flex-column justify-content-center  align-items-center text-light rounded-start">
                      <h2 className="">Already have account ?</h2>
                      <div className=" border-bottom w-25  border-4 pt-4 border-light"></div>
                      <p className="text-center py-auto mt-3">
                        Please sign in if you already have an account
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
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h2 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up{" "}
                        <span className="text-primary">your Account</span>
                      </p>

                      <Form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control
                              label={"Username"}
                              placeholder="input username ..."
                              type="string"
                              name="username"
                              onChange={handleRegisterInput}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control
                              label={"email"}
                              placeholder="input email ..."
                              type="email"
                              name="email"
                              onChange={handleRegisterInput}
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw" />
                          <div className="form-outline flex-fill mb-0">
                            <Form.Control
                              label={"Password"}
                              placeholder="input password ..."
                              type="password"
                              name="password"
                              onChange={handleRegisterInput}
                            />
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-outline-primary  rounded-pill w-50"
                            onClick={handleRegister}
                          >
                            Register
                          </button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
