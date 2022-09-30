import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, getAuth, ref, getDatabase, onValue } from '../firebase/clientApp';
import { login as stateLogin } from '../store/authSlice';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  },
});

const loginState = {
  email: '',
  password: '',
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
        router.push('games');
        const db = getDatabase();
        const dataRef = ref(db, '/users/' + user.uid);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            dispatch(stateLogin(data))
        });
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
      if ((email, password === '')) {
        await Toast.fire({
          icon: 'warning',
          title: 'please fill in the column first',
          timer: 1500,
        });
      } else {
        await Toast.fire({
          icon: 'success',
          title: 'signed in successfully',
        });
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log(await user.user.getIdToken());
        router.push('games');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container  ">
      <div className="row  justify-content-center   ">
        <div className="d-flex m-5 justify-content-center  ">
          <div className="col-md-6 border border-primary pb-5 d-flex flex-column align-items-center">
            <h3 className="text-center pt-5 pb-4">Sign In</h3>
            <input
              className="col-md-6 mb-2"
              label="Email"
              type="email"
              name="email"
              placeholder="Your Email ... "
              onChange={handleOnChangeInput}
            />
            <input
              className="col-md-6"
              label="Password"
              type="password"
              name="password"
              placeholder="Password Here .."
              onChange={handleOnChangeInput}
            />
            <div className="col-md-6  d-flex justify-content-start pb-4">
              <button
                type="button"
                className="btn btn-link "
                onClick={() => {
                  router.push('/forget');
                }}
              >
                Forget Password
              </button>
            </div>
            <div className="col-md-7 offset-md-4 ">
              <button
                type="button"
                className="btn btn-primary col-md-6 "
                onClick={authLogin}
              >
                Log In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
