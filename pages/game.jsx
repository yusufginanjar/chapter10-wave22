import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged  } from "../firebase/clientApp";
// import "bootstrap/dist/css/bootstrap.min.css";
// import {Link, useNavigate} from "react-router-dom";

import styles from '../styles/Game.module.css';

export default function Game() {
    const [score, setScore] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [comScore, setComScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [play, setPlay] = useState(true);
    const [result, setResult] = useState('VS');
    const [userId, setUserId] = useState('');
    const [player, setPlayer] = useState('Player 1');
    const [playerPick, setPlayerPick] = useState('');
    const [comPick, setComPick] = useState('');

    const auth = getAuth();

    // const navigate = useNavigate();
 
    useEffect(() => {
        console.log(score, comScore);
        const db = getDatabase();
        
        onAuthStateChanged(auth, (user) => {
            if (user) {
                const uid = user.uid;
                setUserId(uid);
                const scoreRef = ref(db, '/users/' + uid);
                onValue(scoreRef, (snapshot) => {
                    const data = snapshot.val();
                    setTotalScore(data.score);
                    setPlayer(data.username);
                });
            } else {
                console.log('no user');
                // navigate('/login');
            }
        });
       
        const _scoreRef = ref(db, '/users/' + userId);
        if(score === 2 || comScore === 2){
            if (score === 2) {
                console.log('you win');
                const new_score = totalScore + 100;
                setTotalScore(new_score);
                // update score to firebase
                update(_scoreRef, {
                    score: new_score,
                });
            } else if (comScore === 2) {
                console.log('you lose');
                const new_score = totalScore - 70;
                setTotalScore(new_score);
                // update score to firebase
                update(_scoreRef, {
                    score: new_score,
                });
            }
            setGameOver(true);
        }
    }, [score, comScore])

    // function to get random computer choice between rock, paper, scissors
    const getComChoice = () => {
        const choices = ['com_rock', 'com_paper', 'com_scissors'];
        const random = Math.floor(Math.random() * 3);
        return choices[random];
    }

    // function to reset set play to true and pick to empty object
    const handleReset = () => {
        setGameOver(false);
        setPlay(true);
        setPlayerPick('');
        setComPick('');

        if(score === 2 || comScore === 2){
            setScore(0);
            setComScore(0);
        }
    }

    const getPickStyle = (p) => {
        if (p === playerPick) {
            return styles.picked;
        } else {
            return ''
        }
    }

    const getComPickStyle = (p) => {
        if (p === comPick) {
            return styles.picked;
        } else {
            return ''
        }
    }


    // function to handle click and add player score
    const handleClick = (choice) => {
        if(play === true && gameOver === false) {
            setPlay(false);
            // call getComChoice function to get computer choice
            const comChoice = getComChoice();
            setPlayerPick(choice);
            setComPick(comChoice);

            // check if player choice is equal to computer choice
            if (`com_${choice}` === comChoice) {
                setResult('TIE');
                // if equal, do nothing
            } else if (choice === 'rock' && comChoice === 'com_scissors') {
                setResult('WIN');
                // if player choice is rock and computer choice is scissors, add 1 to score
                setScore(score + 1);
            } else if (choice === 'paper' && comChoice === 'com_rock') {
                setResult('WIN');
                // if player choice is paper and computer choice is rock, add 1 to score
                setScore(score + 1);
            }
            else if (choice === 'scissors' && comChoice === 'com_paper') {
                setResult('WIN');
                // if player choice is scissors and computer choice is paper, add 1 to score
                setScore(score + 1);
            } else {
                setResult('LOSE');
                // if player choice is not equal to computer choice, add 1 to computer score
                setComScore(comScore + 1);
            }
        }
    }

    return(
        <div id="rock-paper-scissors" className={styles.rockpaperscissors}>
            <div>
                <nav className="d-flex pt-3 ms-4">
                    <a className="me-3" >
                        <img src="../../assets/icons/back.svg" alt="" width="30" height="24"/>
                    </a>
                    <div className="me-3">
                        <img src="../../assets/icons/rps-logo.svg" alt="" width="30" height="30"/>
                    </div>
                    <div id="title" className={styles.title}>Rock Paper Scissors</div>
                    <div id="total-score" className={styles.totalscore + ' ms-4'}>| Your Total Score: {totalScore}</div>
                </nav>
            </div>
       
            <section id="game-rps" className={styles.gamerps}>
                <div className="container">
                    <div className="row">
                        <div className="col-4 player-1  d-flex justify-content-center">
                            <ul className="player-wrapper">
                                {/* <Link to={`/players/${userId}`} style={{ textDecoration: 'none' }}> */}
                                    <h5 className="text-center mb-4 text-dark" >{player}</h5>
                                {/* </Link> */}
                                <li className={`rock ${styles.choice} ` + getPickStyle('rock') } onClick={() => handleClick('rock')}>
                                    <img src="../../assets/images/batu.png" className="image-fluid" alt="Rock"/>
                                </li>
                                <li className={`paper ${styles.choice} ${getPickStyle('paper')}`} onClick={() => handleClick('paper')}>
                                    <img src="../../assets/images/kertas.png" className="image-fluid" alt="Paper"/>
                                </li>
                                <li className={`scissors ${styles.choice} ${getPickStyle('scissors')}`} onClick={() => handleClick('scissors')}>
                                    <img src="../../assets/images/gunting.png" className="image-fluid" alt="Scissors"/>
                                </li>
                            </ul>
                        </div>
                        <div id="result" className={styles.result + " col-4 d-flex justify-content-center"}>
                            <div className={styles.gameresult} >
                                <div id="answer" className={styles.answer}><h1>{result}</h1></div>
                            </div>
                        </div>
                        <div className="col-4 com d-flex justify-content-center">
                            <ul className="computer-wrapper">
                                <h5 className="text-center mb-4">COM</h5>
                                <li id="com_rock" className={`rock ${getComPickStyle('com_rock')}`}>
                                    <img src="../../assets/images/batu.png" className="image-fluid"alt="Rock"/>
                                </li>
                                <li id="com_paper" className={`paper ${getComPickStyle('com_paper')}`}>
                                    <img src="../../assets/images/kertas.png" className="image-fluid"alt="Paper"/>
                                </li>
                                <li id="com_scissors" className={`scissors ${getComPickStyle('com_scissors')}`}>
                                    <img src="../../assets/images/gunting.png" className="image-fluid"alt="Scissors"/>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="reset" className="reset d-flex justify-content-center choice" onClick={handleReset}>
                        <img src="../../assets/icons/refresh.svg" alt=""/>
                    </div>
                    <div className="row">
                        <div className="col-4 player-1  d-flex justify-content-center">
                            <ul className="player-wrapper">
                                <h1 className="text-center mb-4">{score}</h1>
                            </ul>
                        </div>
                        <div className="col-4 d-flex justify-content-center">
                        </div>
                        <div className="col-4 com d-flex justify-content-center">
                            <ul className="computer-wrapper">
                                <h1 className="text-center mb-4">{comScore}</h1>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}