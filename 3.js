class Gamburger {

    _priceList = { big: 100, small: 50, cheese: 10, salad: 20, potato: 15, spice: 15, mayonnaise: 20 };

    _calories = { big: 40, small: 20, cheese: 20, salad: 5, potato: 10, spice: 0, mayonnaise: 5 };

    constructor(size, ingridients, ...additionals) {
        this.size = size;
        this.ingridients = ingridients;
        this.additionals = additionals;
        this.price = `Цена этого бургера ${this._totalPrice()} рублей`;
        this.callories = `Каллорийность этого бургера ${this._totalCallories()} каллорий`;
    }

    _totalPrice() {
        let resultPrice = 0;
        resultPrice += this._priceList[this.size];
        resultPrice += this._priceList[this.ingridients];

        if (this.additionals) {
            for (let i of this.additionals) {
                resultPrice += this._priceList[i];
            }
        }
        return resultPrice
    }

    _totalCallories() {
        let resultCallories = 0;
        resultCallories += this._calories[this.size];
        resultCallories += this._calories[this.ingridients];

        if (this.additionals) {
            for (let i of this.additionals) {
                resultCallories += this._calories[i];
            }
        }
        return resultCallories
    }
}

let order_1 = new Gamburger('small', 'cheese', 'spice', 'mayonnaise');
console.log(order_1.price);
console.log(order_1.callories);

let order_2 = new Gamburger('big', 'salad', 'mayonnaise');
console.log(order_2.price);
console.log(order_2.callories);
