import React from "react";
import './Html&Css/style/MainMenu.css';

export default function InventoryMenu() {

    return (
        <div class="menu">
            <button class="ItemLookUp" onclick="alert('this feature is not available yet')">
                <img src={require('./Html&Css/images/loupe.png')} alt="Item Look Up Icon" />
                <span> Item Look Up</span>
            </button>
            <button class="AddItem" onclick="alert('this feature is not available yet')">
                <img src={require('./Html&Css/images/add.png')} alt="Add Item Icon"/>
                <span> Add Item</span>
            </button>
            <button class="LostItem" onclick="alert('this feature is not available yet')">
                <img src={require('./Html&Css/images/lost-items.png')} alt="LostItem" />
                <span> Lost Item</span>
            </button>
        </div>
    );
}