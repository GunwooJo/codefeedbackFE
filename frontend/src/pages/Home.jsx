import * as React from 'react';
import '../styles/Home.css'
//import axios from 'axios';
//import {useNavigate} from "react-router-dom";

export default function Home() {
    return (
        <div class="main-container">
            <div class="navigation-bar">
                <button class="navigation-button">my profile</button>
                <button class="navigation-button">board list</button>
            </div>
            <div class="chat-container">
                <div class="message received">
                    <div class="message-content">
                        <p>Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!</p>
                    </div>
                </div>
                <div class="message sent">
                    <div class="message-content">
                        <p>Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!Test!</p>
                    </div>
                </div>
            </div>
                <div class="input-container">
                    <form>
                        <textarea rows="8"/>
                        <input type='submit'/>
                    </form>
                </div>
        </div>
    );
};