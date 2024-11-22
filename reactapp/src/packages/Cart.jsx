import React, { Component } from 'react'

function Cart(){
    return (
      <div className='main-cart'>
        <h1 className="zagalovok-cart"></h1>
            <div className="cart-info">
            </div>
                <div className="kol-cart">
                    <p className="p-cart-kol">КОЛИЧЕСТВО УЧАТНИКОВ</p>
                        <button calass="button-cart">Записаться</button>
              </div>
      </div>
    )
}
export default Cart