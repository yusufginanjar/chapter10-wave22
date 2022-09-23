import React from "react";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export default function Cards() {
  return (
    <div id="Cards">
      <div className="Container d-flex justify-content-center p-5">
        <div className="row">
          <div className="col">
            <Card>
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80"
              />
              <Card.Body>
                <Card.Title>Game List</Card.Title>
                <Card.Text className="text-black d-flex">
                  <span>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </span>
                </Card.Text>
                <Link href="/games">
                  <Button>See more</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              />
              <Card.Body>
                <Card.Title>Multiplayer Game</Card.Title>
                <Card.Text className="text-black d-flex">
                  <span>
                    the bulk of the card's content. Some quick example text to
                    build on the card title and make up
                  </span>
                </Card.Text>
                <Button variant="primary">See more</Button>
              </Card.Body>
            </Card>
          </div>
          <div className="col">
            <Card>
              <Card.Img
                variant="top"
                src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
              />
              <Card.Body>
                <Card.Title>Coming Soon</Card.Title>
                <Card.Text className="text-black d-flex">
                  <span>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </span>
                </Card.Text>
                <Button variant="primary">See more</Button>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
