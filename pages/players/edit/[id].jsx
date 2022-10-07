import {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import { getDatabase, ref, onValue, update } from "firebase/database";
import { getAuth, onAuthStateChanged  } from "../../../firebase/clientApp";
import { getDownloadURL, getStorage, ref as _ref, uploadBytes} from 'firebase/storage'
import { useDispatch, useSelector } from "react-redux";
import { processing, success } from "../../../store/statusSlice";
import styles from "../../../styles/Profile.module.scss"
import Link from 'next/link'
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    },
  });

export default function ProfileEdit() {
    const [player, setPlayer] = useState({
        username: '',
        email: '',
        bio: '',
        score: '',
        rank: '',
    });
    const [ file, setFile ] = useState(null);
    const [_userId, setUserId] = useState('');
   
    const auth = getAuth();
    const router = useRouter()
    const dispatch = useDispatch();

    const status = useSelector(state => {
        return state.status.status;
    });
    
    useEffect(() => {
        dispatch(processing());
        const pathname = window.location.pathname
        const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)
        const userId = getLastItem(pathname)
        setUserId(userId);
        const db = getDatabase();
        const starCountRef = ref(db, '/users/' + userId);
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            setPlayer({
                username: data.username,
                email: data.email,
                bio: data.bio,
                score: data.score,
                url: data.url ?? "https://firebasestorage.googleapis.com/v0/b/fsw22-kelompok1.appspot.com/o/pexels-ron-lach-7848986.jpg?alt=media&token=8a222888-d8f9-4cf6-bc1f-9a744ab0bb5a",
            })
            dispatch(success());
        });
    }, [])

    function handleSubmit(e){
        e.preventDefault();
        onAuthStateChanged(auth, async (user) => {
            if (user) {
              const uid = user.uid;
              if (uid === _userId){ 
                const db = getDatabase();
                if(file){
                    const storage = getStorage();
                    const metadata = {
                      contentType: 'image/jpeg'
                    }
                    const fileName = `profile/${file.name}`;
                    const reference = _ref(storage, fileName, metadata);
                    const upload = await uploadBytes(reference, file);
                    console.log(upload);
                    
                    const downloadUrl = await getDownloadURL(_ref(storage, fileName));
                    console.log(downloadUrl);
        
                    update(ref(db, 'users/' + _userId), {
                        url: downloadUrl,
                      });
                    localStorage.setItem('url', downloadUrl);
                }
                update(ref(db, 'users/' + _userId), {
                  username: e.target.username.value,
                  email: e.target.email.value,
                  bio: e.target.bio.value,
                });
                localStorage.setItem('username', e.target.username.value);
                localStorage.setItem('email', e.target.email.value);
                localStorage.setItem('bio', e.target.bio.value);
                await Toast.fire({
                    icon: 'success',
                    title: 'Profile Update Successfully',
                  });
              }
            } 
        });
        router.push('/players/' + _userId);
      }

    const handleChange = (event) => {
        setPlayer({
          ...player,
          [event.target.name]: event.target.value
        });
      }

    const handleFileChange = (e) => {
        const _file = e.target.files[0];
        setFile(_file);
    }

    return(
        <div className={styles.profilePage}>
             <div className='container h-100 d-flex justify-content-center align-items-center pt-4'>
                <div className={ styles.bgBlack + " card mb-3 h-80"}>
                    <div className="row g-0">
                        <div className="col-md-5">
                        <img src={player.url} className={ styles.img + " img-fluid rounded-start"} alt="..."/>
                        </div>
                        <div className="col-md-7 ps-4">
                        <div className="card-body bg-dark text-white">
                            <h1 className="card-title mb-4">Edit Profile</h1>
                            
                            <form onSubmit={e => {handleSubmit(e)}}>
                                <div className="my-3 row">
                                    <label htmlFor="nickname" className="col-sm-3 col-form-label" >Nickname</label>
                                    <div className="col-sm-9">
                                    <input type="text" className="form-control" name="username" value={player.username} onChange={handleChange} id="nickname"/>
                                </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="email" className="col-sm-3 col-form-label">Email</label>
                                    <div className="col-sm-9">
                                    <input type="email" className="form-control" value={player.email} onChange={handleChange} id="email" name="email"/>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="bio" className="col-sm-3 col-form-label">Bio</label>
                                    <div className="col-sm-9">
                                        <input type="text" className="form-control" value={player.bio} onChange={handleChange} id="bio" name="bio"></input>
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="bio" className="col-sm-3 col-form-label">Bio</label>
                                    <div className="col-sm-9">
                                        <input type="file" className="form-control" onChange={handleFileChange} />
                                    </div>
                                </div>
                                <div className="mb-3 row">
                                    <label htmlFor="total-score" className="col-sm-3 col-form-label">Total Score</label>
                                    <div className="col-sm-9">
                                        <input type="text" readOnly className="form-control-plaintext text-light" name="score" id="total-score" value={ player.score } onChange={handleChange}/>
                                    </div>
                                </div>
                                { status == 'loading' ? <button class="btn btn-success me-3" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button> :
                                    <button className='btn btn-success me-3' type="submit">Save Profile</button>
                                    
                                    }
                                <Link  href={`/players/${_userId}`}>
                                    {status == 'loading' ?
                                    <button class="btn btn-outline-success" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Loading...
                                    </button>
                                    :
                                     <button className="btn btn-outline-success">Cancel</button>}
                                </Link>
                                
                            </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}