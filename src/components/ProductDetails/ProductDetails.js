import React from 'react';
import { useParams } from 'react-router-dom';
//import fakeData from '../../fakeData';
import Product from '../Product/Product';
import { useState } from 'react';
import { useEffect } from 'react';

const ProductDetails = () => {
    const {productKey} = useParams();
    const [product, setProduct] = useState(null);
    useEffect(() => {
        fetch('https://gentle-citadel-46995.herokuapp.com/product/'+productKey)
        .then(res => res.json())
        .then(data => {
            setProduct(data);
        })
    }, [])
    //const product = fakeData.find(pd => pd.key === productKey);

    return (
        <div>
            <h3>Your Product Details</h3>
            {
                product && <Product showAddToCart={false} product={product}></Product>
            }
        </div>
    );
};

export default ProductDetails;