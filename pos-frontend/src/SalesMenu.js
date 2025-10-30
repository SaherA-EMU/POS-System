import './Html&Css/style/MainMenu.css';
import React from 'react';

export default function SalesMenu() {
    return (
        <div className="menu">
            <button className="History" onClick={ () => alert('this feature is not available yet')}>
                <img src={require('./Html&Css/images/history.png')} alt="History Icon" />
                <span> Transaction History</span>
            </button>
            <button className="Transaction" onClick="location.href='ItemCart.html'">
                <img src={require('./Html&Css/images/dollar-symbol.png')} alt="Dollar Sign" />
                <span> Make a Sale</span>
            </button>
            <button className="Reports" onClick={ () => alert('this feature is not available yet')}>
                <img src={require('./Html&Css/images/report.png')} alt="Reports Icon" />
                <span> Reports </span>
            </button>
        </div>
        );
        }
