import { useNavigate } from 'react-router';
import './styles/HomePage.css';
import { useState } from 'react'
// import { uuid } from 'uuidv4';
const HomePage = () => {
    const [userName, SetUserName] = useState('');
    const [roomDetails, setRoomDetails] = useState({ roomid: '', roompassword: '' });
    const [createFlag, setCreateFlag] = useState(false);
    const navigate=useNavigate();
    const handleJoinSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(userName, roomDetails);
        navigate(`/editor/${roomDetails.roomid}`,{
            state:{
                 userName
            }
        })
    }
    const handleCreateSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        // console.log("in create")
    }
    const uuid = () => {
        return String(Date.now().toString(32) + Math.random().toString(16).replace(/\./g, "-"))
    }
    const HandleCreateRoom = (e) => {
        e.stopPropagation();
        e.preventDefault();
        if (!createFlag) {
            setRoomDetails({ roomid: uuid(), roompassword: '' });
        }
        else
            setRoomDetails({ roomid: '', roompassword: '' });
        setCreateFlag(!createFlag);
    }
    return (
        <div className='HomePage'>
            <div className='JoinBox'>
                <p className="FormHeading">Connect and Collaborate in Real-Time</p>
                <form onSubmit={createFlag ? handleCreateSubmit : handleJoinSubmit}>

                    <div className="FormInputDiv">
                        <input id="UserName" type='text' className="FormInput" autoComplete="off" placeholder='' value={userName} onChange={(e) => { SetUserName(e.target.value) }} required />
                        <label className="FormLabel" htmlFor="UserName">Name</label>
                    </div>
                    <div className="FormInputDiv">
                        <input type='text' id='RoomId'
                            className="FormInput"
                            autoComplete='off' placeholder='' value={roomDetails.roomid} disabled={createFlag ? true : false} onChange={(e) => { setRoomDetails({ ...roomDetails, roomid: e.target.value }) }} required />
                        <label htmlFor="RoomId" className="FormLabel" >Room Id</label>
                    </div>
                    <div className="FormInputDiv">
                        <input id="Password" type='password' className="FormInput" autoComplete="off" placeholder='' value={roomDetails.roompassword} onChange={(e) => { setRoomDetails({ ...roomDetails, roompassword: e.target.value }) }} required />
                        <label className="FormLabel" htmlFor="Password">Password</label>
                    </div>
                    <div className="ButttonDiv">
                        <button type='submit'>{createFlag ? 'Create' : 'Join'}</button>
                    </div>

                </form>
                <p className="CreateMeetLink">Want to {createFlag ? 'Join' : 'Create New'}  Room? <a href='' onClick={HandleCreateRoom}>{createFlag ? "Join Room" : "New Room"}</a></p>
            </div>
        </div>
    )
}

export default HomePage