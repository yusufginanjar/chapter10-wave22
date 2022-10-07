import {useEffect, useState} from "react";
import { getAuth, onAuthStateChanged  } from "../../firebase/clientApp";

import { useDispatch, useSelector } from "react-redux";
import { processing, success } from "../../store/statusSlice";

import Link from 'next/link'
import styles from '../../styles/Profile.module.scss'


export default function Profile() {
    const [player, setPlayer] = useState('');
    const [enableEdit, setEnableEdit] = useState(false);
    const [_userId, setUserId] = useState('');
    const auth = getAuth();

    const status = useSelector(state => {
        return state.status.status;
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(processing());
        const pathname = window.location.pathname
        const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
        const userId = getLastItem(pathname)
        setUserId(userId);

        if(localStorage.getItem('isAuthenticated') === 'true'){
            setPlayer({
                username: localStorage.getItem('username'),
                email: localStorage.getItem('email'),
                bio: localStorage.getItem('bio'),
                score: localStorage.getItem('score'),
                level: Math.ceil(localStorage.getItem('score')/100),
                url: localStorage.getItem('url') != 'undefined' ? localStorage.getItem('url') : "https://firebasestorage.googleapis.com/v0/b/fsw22-kelompok1.appspot.com/o/pexels-ron-lach-7848986.jpg?alt=media&token=8a222888-d8f9-4cf6-bc1f-9a744ab0bb5a",
            })
        };
        
        onAuthStateChanged(auth, (user) => {
        if (user) {
              const uid = user.uid;
              if (uid === userId){ setEnableEdit(true)}
            } 
        });
        dispatch(success());
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
                                {status == 'loading' ?  
                                <button className="btn btn-warning font-weight-bold btn-lg text-dark rounded-0" type="button" disabled>
                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    Loading...
                                </button>
                                : 
                                <button className="btn btn-warning font-weight-bold btn-lg text-dark rounded-0">EDIT</button>}
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