import {useEffect, useState} from "react";
import { query, orderByChild, limitToLast } from "firebase/database";
import { getDatabase, ref, onValue  } from "../firebase/clientApp";
import Link from 'next/link'
import styles from '../styles/Rank.module.css'

export default function Rank() {
    const [player, setPlayer] = useState([]);
    
    
    useEffect(() => {
        const pathname = window.location.pathname
        const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
        const userId = getLastItem(pathname)

        const db = getDatabase();
        const mostViewedPosts = query(ref(db, 'users'), orderByChild('score'), limitToLast(50));
        onValue(mostViewedPosts, async (snapshot) => {
            const x = [];
            await snapshot.forEach(function(child) {
                console.log(child.key);
                console.log(child.val()) 
                x.push(child.val())
            })
            console.log(x);
            const y = x.sort((a, b) => b.score - a.score);
            console.log(y);
            setPlayer( y)
        });
    }, [])
     
    return(
        <div className={styles.rankPage + ' bg-dark'}>
            <section className={styles.topScores} >
                <div className={styles.backgroundOverlay}></div>
                <div className={styles.container + " container"}>
                    <div className="row">
                    <div className="col-lg-6 pt-4">
                        <h2 className={styles.h1 + " h1 display-4 text-white text-center"}>ROCK PAPER SCISSORS</h2>
                        <p className="text-center text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et sequi quae ipsum unde consequatur fugiat exercitationem vel ipsa commodi? Velit.</p>
                        <div className="d-block text-center">
                        <Link href="/game/rps" >
                            <button className="btn btn-lg btn-block btn-warning my-4">
                                PLAY NOW
                            </button>
                        </Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className={styles.gridContainer}>
                            
                        <div className={styles.gridItem + ' mb-4'}>
                        <h2 className={ styles.h1 + " h1 text-white text-center"}>TOP SCORES</h2>
                            <p className="text-center text-white">This top score from various games provided on this polatform</p>
                            {player.map((item, index) => {
                                return(
                                    <div key={index} className={ styles.card + " card bg-dark mt-4"}>
                                        <div className="card-body">
                                            <div className="d-flex">
                                            <div className={ styles.profileImage + " me-4 mb-4"}>
                                                <img src={item.url} alt=""/>
                                                <div className={ styles.backShadow + " bg-warning"}></div>
                                            </div>

                                            <h4 className={styles.cardTitle + " card-title mt-3 text-warning"}>{item.username}<span className="h6 text-muted"><br/>{item.score}</span></h4>
                                            <a href="#" className={styles.twitterIcon + " ms-auto mt-3"}></a>
                                            </div>
                                            <p className="card-text">{item.bio}</p>
                                            <div className="text-muted">
                                                {/* <Link to={`/`}>
                                                    View Profile
                                                </Link> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </div>
    )
}