import {useEffect, useState} from "react";
import { getDatabase, ref, onValue, query, orderByChild } from "firebase/database";
import { getAuth, onAuthStateChanged  } from "../../firebase/clientApp";
import Link from 'next/link'
import styles from '../../styles/Profile.module.css'


export default function Profile() {
    const [player, setPlayer] = useState('');
    const [enableEdit, setEnableEdit] = useState(false);
    const [_userId, setUserId] = useState('');

    const auth = getAuth();

    useEffect(() => {
      const pathname = window.location.pathname
      const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
      const userId = getLastItem(pathname)
      setUserId(userId);

        onAuthStateChanged(auth, (user) => {
            if (user) {
              const uid = user.uid;
              if (uid === userId){ setEnableEdit(true)}
            } 
        });
        
        const db = getDatabase();
        const topUserPostsRef = query(ref(db, 'users'),orderByChild('score'));
        onValue(topUserPostsRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data);
        });
        const dataRef = ref(db, '/users/' + userId);
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data.score);
            setPlayer({
                username: data.username,
                email: data.email,
                bio: data.bio,
                score: data.score,
                level: Math.ceil(data.score / 128),
                url: data.url ?? "https://firebasestorage.googleapis.com/v0/b/fsw22-kelompok1.appspot.com/o/pexels-ron-lach-7848986.jpg?alt=media&token=8a222888-d8f9-4cf6-bc1f-9a744ab0bb5a",
            })
        });
    }, [])

     
    return(
        <div className={styles.profilePage + ' bg-dark'}>
            <div className="container">
            <div className="row no-gutters">
                <div className="col-md-4 col-lg-4">
                    <img src={player.url} className={ styles.img + " img-fluid"} />
                </div>
                <div className="col-md-8 col-lg-8">
                    <div className="d-flex flex-column">
                        <div className="d-flex flex-row justify-content-between align-items-center p-5 bg-info text-white">
                            <h2 className="display-4">{player.username}</h2></div>
                        <div className={ styles.bgBlack + ' p-3 text-white'}>
                            <h6>{player.bio}</h6>
                        </div>
                        <div className="d-flex flex-row text-white">
                            <div className={ styles.skillBlock + " p-4 bg-primary text-center"}>
                                <h6>Total Score</h6>
                                <h4>{player.score}</h4>
                            </div>
                            <div className={ styles.skillBlock + " p-3 bg-success text-center"}>
                                <h6>Level</h6>
                                <h4>{player.level}</h4>
                            </div>
                            <div className={ styles.skillBlock + " p-3 bg-warning text-center"}>
                                <h6>Rank</h6>
                                <h4>--</h4>
                            </div>
                            <div className={ styles.skillBlock + " p-3 bg-danger text-center"}>
                            {enableEdit ? 
                            <Link href={ `/players/edit/${_userId}` }>
                              <button className="btn btn-warning font-weight-bold btn-lg text-dark rounded-0">EDIT</button>
                            </Link> : ''}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}