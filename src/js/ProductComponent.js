const product = {
    props: ['product'],
    template: `<div class="product-item">
<img :src=fullPath(product.path) alt="Some img" width="250">
<div class="desk">
<h3>{{ product.product_name }}</h3>
<p>{{ product.price }} $</p>
<button class="buy-btn" @click="$parent.$emit('add-product',product)">Купить</button>
</div>
</div>
`,
    methods:{
        fullPath(path){
            return 'img/' + path;
        }
    }
};

const products = {
    props: ['products', 'img'],
    components:{product},
    template: '<div class="products"><product v-for="item of products" :key="item.id_product" :product="item"></product></div>'
};

export default products