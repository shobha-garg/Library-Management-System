import { searchBook, getUserHome } from "../methods.js"
import Book from './EBook.js'

export default {
    template: `
    <div class="w-100">
        <div class="row">
            <div class="col-md-4">
                <div class="form-floating">
                    <select class="form-select" id="filter" v-model="payload.filter">
                        <option value="book">Book name</option>
                        <option value="section">Section name</option>
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
            <Book v-for="book in books" :p="book" />
        </div>
    </div>
    `,
    data() {
        return {
            books: [],
            payload: {
                search: null,
                filter: 'book',
            },
            error: null,
            message: '',
        }
    },
    created() {
        getUserHome().then((res) => {
            this.books = res.data
        })
    },
    components: {
        Book
    },
    methods: {
        searchMethod() {
            this.books = []
            searchBook(this.payload).then((res) => {
                this.books = res.data
                this.message = res.message
            })
        },
        clearMessage() {
            this.message = ''
        },
        issueBookMethod() {

    }
    }
}

