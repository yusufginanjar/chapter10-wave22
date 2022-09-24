import React, { useState } from "react";
import Link from "next/link";
import Carousels from "../components/carousel";
import Cards from "../components/Card";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "../styles/Landing.module.css";

export default function Home(props) {
  const [player, setPlayer] = useState("");
  return (
    <div className="bg-dark">
      <div className={styles.myBG}>
        <div className={styles.intro}>
          <Container className="text-white d-flex justify-content-center align-items-center">
            <Row>
              <Col>
                <h1 className={styles.title}>Welcome to The Game {player}</h1>
                <h3 className={styles.title + " d-flex justify-content-center"}>
                  Let's play some games !
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
