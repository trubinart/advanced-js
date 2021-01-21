
import search from './SearchComponent.js';
import basket from './BasketComponent.js';
import products from './ProductComponent.js';

//import json from '../getProducts.json';

import '../css/normalize.css';
import '../css/style.css';

//const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        products: [],
        productFix: [],
        basket: [],
        textBasket: 'Корзина',
        showBasket:false,
        summBasket: 0,
        countBasket:0,
        searchWord: '',
        imgCatalog: 'img/not-found.jpg',
        catalogUrl: '/catalogData.json',
    },
    components:{
        search,
        basket,
        products
    },
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },

        closeBasket(){
            this.showBasket = false;
        },


        addProduct(product){

            let flag = 0;
            for (let el of this.basket){
                if (el.id_product == product.id_product){
                    el.quantity++;
                    flag = 1;
                }
            }
            if (flag == 0){

                const prod = Object.assign({quantity: 1}, product);
                this.basket.push(prod);
            }
            this.countBasket = this.countProductsInBasket();
            this.textBasket = 'Корзина(' + this.countBasket + ')';
            this.summBasket = this.summProductsInBasket();
        },

        delProduct(product){
            for (let el of this.basket){
                if (el.id_product == product.id_product){
                    el.quantity--;
                    if (el.quantity < 0){
                        el.quantity = 0;
                    }
                }
            }
            this.countBasket = this.countProductsInBasket();
            this.textBasket = 'Корзина(' + this.countBasket + ')';
            this.summBasket = this.summProductsInBasket();
            this.clearBasket();
        },
        
        search(mess){
            this.products = [...this.productFix];
          let arr = [];

            for (let el of this.products){
                let product_name = el.product_name.toUpperCase();
                mess = mess.toUpperCase();
                if (product_name.indexOf(mess) > -1){
                    arr.push(el);
                }
            }
            this.products = [...arr];
        },

        countProductsInBasket(){
            let summProducts = 0;
            for (let el of this.basket){
                summProducts+=el.quantity;
            }
            return summProducts;
        },

        clearBasket(){
            let arr = [];
            for (let el of this.basket){
                if (el.quantity != 0){
                    arr.push(el);
                };
            }
            this.basket = [...arr];
        },

        summProductsInBasket(){
            let summProducts = 0;
            for (let el of this.basket){
                summProducts+=el.quantity*el.price;
            }
            return summProducts;
        }

    },
    mounted(){

     /*   this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.productFix.push(el);
                }
            });*/
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.productFix.push(el);
                }
            });
    }

})

/*
const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
    {id: 5, title: 'Phone', price: 99},
    {id: 6, title: 'TV', price: 1255},
    {id: 7, title: 'Refrigeration', price: 2550},
];



//Функция для формирования верстки каждого товара
const renderProduct = (item) => {
    return `<div class="product-item">
                <h3>${item.title}</h3>
                <img src="img/not-found.jpg" width="200">
                <p class="product-item-price">Цена: ${item.price} руб.</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    productsList.forEach(item => document.querySelector('.products').innerHTML += item);
    //document.querySelector('.products').innerHTML = productsList;
};

renderPage(products); */