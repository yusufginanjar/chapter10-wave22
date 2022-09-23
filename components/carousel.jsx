import React, { useState } from "react";
import { Carousel } from "react-bootstrap";

export default function Carousels() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };
  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/people-playing-paper-rock-scissors-royalty-free-illustration-1583269312.jpg?crop=0.994xw:0.799xh;0.00160xw,0.195xh&resize=1600:*"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>Rock Paper Scissors</h3>
          <p className="d-flex justify-content-center">
            If you miss your childhood, we provide many traditional games here
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.dribbble.com/users/67858/screenshots/2482202/attachments/1190214/coming_soon.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          {/* <h3>Second slide label</h3> */}
          <p className="d-flex justify-content-center">
            There's something really cool is coming ! Stay tuned{" "}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://cdn.dribbble.com/users/67858/screenshots/2482202/attachments/1190214/coming_soon.png "
          alt="Third slide"
        />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3> */}

          <p className="d-flex justify-content-center">
            There's something really cool is coming ! Stay tuned{" "}
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
