const search = {

    template: ` <div>
                <form action="#" class="search-form">
                    <input type="text" class="search-field" v-model="mess">
                    <button class="btn-search" type="submit" @click="$emit('searh', mess)">
                        <i class="fas fa-search"></i>
                    </button>
                </form>
            </div>`,
    data() {
        return {
            mess: ''
    }
    },
    methods:{
        sendInfo(){

        }
    }
};

export default search