import React from 'react';
import fakeData from '../../fakeData';


const Inventory = () => {

    const handleAddInventory = () =>{
        const product = fakeData[0];
        console.log('Before post', fakeData.length);
        fetch('http://localhost:4200/addProduct', {
            method: 'POST',
            body: JSON.stringify(fakeData),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
                }
        })
        .then(res => res.json())
        .then(data => {
            console.log('Post successful', data);
        })
    }

    return (
        <div>
            <h1>Add Inventory to sell more....</h1>
            <button  >Add Inventory</button>
        </div>
    );
};

export default Inventory;