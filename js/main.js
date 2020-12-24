class ProductsList {
    constructor(container = '.products'){
        this.container = container;
        this.goods = [];
        this.allProducts = [];
        this._fetchProducts();
    }

    _fetchProducts() {
        this.goods = [
            {id: 1, title: 'Notebook', price: 2000},
            {id: 2, title: 'Mouse', price: 20},
            {id: 3, title: 'Keyboard', price: 200},
            {id: 4, title: 'Gamepad', price: 50},
        ];
    }
    render() {
        const block = document.querySelector(this.container);
        for(let product of this.goods){
            const productObj = new ProductItem(product);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend',productObj.render())
        }
    }
    getSum() {
        /*let sum = 0;
        for(let product of this.goods){
            sum += product.price;
        }*/
        //reduce используется для последовательной обработки каждого элемента массива с сохранением промежуточного результата.
        let res = this.allProducts.reduce((sum, item) => sum += item.price, 0);
        alert(res);
    }
}


class ProductItem {
	constructor(product, img = 'https://placehold.it/200x150'){
		this.title = product.title;
		this.price = product.price;
		this.id = product.id;
		this.img = img;

	}

	render() {
		 return `<div class="product-item" data-id="${this.id}">
                <img src="${this.img}" alt="Some img">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
	}
}

let list = new ProductsList();
list.render();


class Basket {
    constructor() {
        this.basket = {};
    }

    addGoods() {

    }
    removeGoods() {

    }
    changeGoods() {

    }
}

class ElemBasket {

}

// Домашнее задание

let productsForBasket = new Basket();

fetch('https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json')
  .then(text => text.json())
  .then(data => productsForBasket.data = data)

function renderBasket(){
    document.querySelector('header').insertAdjacentHTML("afterend", '<div class="basket"></div>')
    for (let prod in productsForBasket.data.contents){
            let line = `<div class="basket-item" data-id="${productsForBasket.data.contents[prod].id_product}">
            <p>${productsForBasket.data.contents[prod].product_name}<p>
            <p>${productsForBasket.data.contents[prod].price}</p>
            <p>${productsForBasket.data.contents[prod].quantity}</p>
            <button class="basket-del">Удалить</button>
            <button class="basket-add">Добавить</button>
            </div>`
            document.querySelector('.basket').insertAdjacentHTML("beforeend" , line);
    }

    let finalLine = `<div class="basket-final">
    Товаров ${productsForBasket.data.countGoods} на сумму ${productsForBasket.data.amount}
    </div>`;

    document.querySelector('.basket').insertAdjacentHTML("beforeend" , finalLine);
}


document.querySelector('.btn-cart').addEventListener('click', (e) => {
    renderBasket();
})

for (let i of document.querySelectorAll('.basket-add')){
    i.addEventListener('click', (e) => {
        for (let prod in productsForBasket.data.contents){
            if (productsForBasket.data.contents[prod].id_product == e.target.parentElement.dataset.id){
                productsForBasket.data.contents[prod].quantity += 1;
                productsForBasket.data.amount += productsForBasket.data.contents[prod].price;
                productsForBasket.data.countGoods +=1;
                console.log(productsForBasket.data.countGoods);
                console.log(productsForBasket.data.amount);
            }

        }
        renderBasket();
    })
}
