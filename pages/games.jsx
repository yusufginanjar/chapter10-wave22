import React, { useEffect , useState} from 'react';
import { useRouter } from 'next/router'
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged  } from "../firebase/clientApp";
import Link from 'next/link'
import styles from '../styles/Games.module.css'
export default function Games() {
  const [player, setPlayer] = useState('');

  const auth = getAuth();
  const router = useRouter();


  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        router.push('/login');
      } 

      onAuthStateChanged(auth, (user) => {
        if (user) {
          const db = getDatabase();
          const uid = user.uid;
          const dataRef = ref(db, '/users/' + uid);
          onValue(dataRef, (snapshot) => {
              const data = snapshot.val();
              setPlayer({
                  username: data.username,
              })
          });
        } 
    });


    });
  }, []);


  return (
    <div className={"bg-dark " + styles.games}>
      <div className="container">
        <div className={ styles.gamesHero + " text-white rounded"}>
            <div className={styles.overlay + " p-4 p-md-5 mb-4"}>
            <div className="col-md-6 px-0">
                <h3>Welcome {player.username}</h3>
                <h1 className="display-4 font-weight-bolder">START AND WIN THE GAME</h1>
                <h2 className="my-3">Be The Best and get the Top Global Title</h2>
            </div>
            </div>
      </div>
    <div className="row ">
    <div className="col-md-6">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static text-white">
          <strong className="d-inline-block mb-2 text-primary">Game</strong>
          <h3 className="mb-0 text-white">Rock Paper Scissors</h3>
          <p className="card-text mb-auto mt-2">Traditional Game: Play vs AI</p>
          <Link href='/game/rps' className="stretched-link">Play Now</Link>
        </div>
        <div className="col-auto d-none d-lg-block">
          <img src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/people-playing-paper-rock-scissors-royalty-free-illustration-1583269312.jpg?crop=0.994xw:0.799xh;0.00160xw,0.195xh&resize=1600:*" alt="Rock Paper Scissors" width="200" height="250" />
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static text-white">
          <strong className="d-inline-block mb-2 text-success">Game</strong>
          <h3 className="mb-0 text-white">Portal 2</h3>
          <p className="mb-auto mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, repudiandae.</p>
          <a href="#" className="stretched-link">Play Now</a>
        </div>
        <div className="col-auto d-none d-lg-block">
        <img src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=347&q=80" alt="Rock Paper Scissors" width="200" height="250" />
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static text-white">
          <strong className="d-inline-block mb-2 text-danger">Game</strong>
          <h3 className="mb-0 text-white">The Legend of Zelda: Breath of the Wild</h3>
          <p className="mb-auto mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, repudiandae.</p>
          <a href="#" className="stretched-link">Play Now</a>
        </div>
        <div className="col-auto d-none d-lg-block">
        <img src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=347&q=80" alt="Rock Paper Scissors" width="200" height="250" />
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col p-4 d-flex flex-column position-static text-white">
          <strong className="d-inline-block mb-2 text-warning">Game</strong>
          <h3 className="mb-0 text-white">Super Mario World</h3>
          <p className="mb-auto mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque, repudiandae.</p>
          <a href="#" className="stretched-link">Play Now</a>
        </div>
        <div className="col-auto d-none d-lg-block">
        <img src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=347&q=80" alt="Rock Paper Scissors" width="200" height="250" />
        </div>
      </div>
    </div>
  </div>
      </div>
    </div>
  );
}