import { searchProduct, getMarketplace } from "../methods.js"
import Product from './Product.js'

export default {
    template: `
    <div class="w-100">
        <div class="row">
            <div class="col-md-4">
                <div class="form-floating">
                    <select class="form-select" id="filter" v-model="payload.filter">
                        <option value="product">Product name</option>
                        <option value="category">Category name</option>
                    </select>
                    <label for="filter">Filter by</label>
                </div>
            </div>
            <div class="col-md-8">
                <div class="form-floating input-group">
                    <input class="form-control" id="search" name="search" type="text" placeholder="Search..." value="" v-model="payload.search" />
                    <button class="btn btn-outline-dark" type="submit" @click="searchMethod">Search</button>
                    <label for="search" class="form-label">Search...</label>
                </div>
            </div>
        </div>

        <div class="alert alert-warning alert-dismissible fade show mt-3" role="alert" v-if="message">
            {{ message }}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click="clearMessage"></button>
        </div>

        <div class="my-4 d-flex flex-wrap justify-content-around">
            <Product v-for="product in products" :p="product" />
        </div>
    </div>
    `,
    data() {
        return {
            products: [],
            payload: {
                search: null,
                filter: 'product',
            },
            error: null,
            message: '',
        }
    },
    created() {
        getMarketplace().then((res) => {
            this.products = [...res.data]
        })
    },
    components: {
        Product
    },
    methods: {
        searchMethod() {
            searchProduct(this.payload).then((res) => {
                this.products = [...res.data]
                this.message = res.message
            })
        },
        clearMessage() {
            this.message = ''
        }
    },
}
