import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import UserWithdrawal from "../components/UserWithdrawal";

function UserInfo() {

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);

    return (
        <div>
            <button onClick={handleShow}>탈퇴</button>
            <UserWithdrawal showModal={showModal} setShowModal={setShowModal}/>
        </div>
    );
}

export default UserInfo;
