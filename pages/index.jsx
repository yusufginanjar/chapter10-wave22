import React, { useState, useEffect } from "react";
import Link from "next/link";
import Carousels from "../components/carousel";
import Cards from "../components/Card";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../styles/Landing.module.scss";

import { useSelector, useDispatch } from "react-redux";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth, onAuthStateChanged } from "../firebase/clientApp";

export default function Home() {
  const [player, setPlayer] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const db = getDatabase();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        const dataRef = ref(db, "/users/" + uid);
        onValue(dataRef, (snapshot) => {
          const data = snapshot.val();
          setPlayer({
            username: data.username,
          });
        });
      }
    });
  }, []);

  return (
    <div className="bg-dark">
      <div className={styles.myBG}>
        <div className={styles.intro}>
          <Container className="text-white d-flex justify-content-center align-items-center">
            <Row>
              <Col>
                <h1 className={styles.title}>
                  Welcome to The Game {player.username}
                </h1>
                <h3 className={styles.title + " d-flex justify-content-center"}>
                  Let`s play some games !
                </h3>
                <Link href="/#Cards ">
                  <div className="d-flex justify-content-center ">
                    <Button className=" w-50 ">PLAY GAME</Button>
                  </div>
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <Carousels />
      <Cards />
    </div>
  );
}
