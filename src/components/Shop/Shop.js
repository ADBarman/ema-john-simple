import React, { useState, useEffect } from 'react';
//import fakeData from '../../fakeData';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';


const Shop = () => {
    
    //const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    //const [products, setProducts] = useState(first10);
    const [cart, setCart] = useState([]);
    
    useEffect(() => {
        fetch('https://gentle-citadel-46995.herokuapp.com/products')
        .then(res => res.json())
        .then(data => {
            //console.log('Data From Database', data);
            setProducts(data);
        })
    }, [])
    
    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        if(products.length > 0){
            const previousCart = productKeys.map(existingKey =>{
                const product = products.find(pd => pd.key === existingKey);
                product.quantity = savedCart[existingKey];
                return product;
                //console.log(existingKey, savedCart[existingKey]);
            })
            setCart(previousCart);
            //console.log(previousCart);
        }
    }, [])


    const handleAddProduct = (product) =>{
        const toBeAddeddKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddeddKey);
        let count =1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddeddKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key,count);
    }
    
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    products.map(pd => <Product 
                        key = {pd.key}
                        showAddToCart = {true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }
                
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review order</button>
                    </Link>
                </Cart>
            </div>            
        </div>
    );
};

export default Shop;