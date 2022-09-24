import React from "react";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import { getAuth, signOut  } from "../firebase/clientApp";
import { Nav, Navbar, Container } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
// import { Link, useNavigate } from "react-router-dom";

export default function Navibar() {
  const [user, setUser] = useState(null);
  const auth = getAuth();
  const router = useRouter()
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      }
    })
  }, []);

  const handleSignOut = async () => {
    try {
      console.log("signing out");
      await signOut(auth);
      setUser(null);
      router.push('/login');
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <div bg="dark">
      <Navbar bg="dark " variant="dark" className="Navbar bg-opacity-75">
        <Container>
          <Link href="/" passHref>
            <Navbar.Brand>
              <Image
                alt=""
                src="/assets/icons/binarnew.svg"
                width="30"
                height="30"
                className="d-inline-block align-top Image-rounded "
              />{" "}
            </Navbar.Brand>
          </Link>
          <Nav className="me-auto ">
            <Link href="/" passHref>
              <Nav.Link>Home</Nav.Link>
            </Link>
            <Link href="/game/rps" passHref>
              <Nav.Link>Play RPS</Nav.Link>
            </Link>
            <Link href="/games" passHref>
              <Nav.Link>Games</Nav.Link>
            </Link>
            <Link href="/rank" passHref>
              <Nav.Link>Top Scores</Nav.Link>
            </Link>
          </Nav>{
            user ? (
              <Nav className="justify-content-end">
                <Link href="/profile" passHref>
                  <Nav.Link>Profile</Nav.Link>
                </Link>
                <Nav.Link onClick={handleSignOut}>Sign Out</Nav.Link>
            </Nav>
            ) : (
          <Nav className="justify-content-end">
            <Link href="/login" passHref>
              <Nav.Link>Login</Nav.Link>
            </Link>
            <Link href="/register" passHref>
              <Nav.Link>Sign Up</Nav.Link>
            </Link>
          </Nav>
        )}
        </Container>
      </Navbar>
    </div>
  );
}
