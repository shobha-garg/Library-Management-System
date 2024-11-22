import { getBooksforAdmin} from "../methods.js"
import CreateEBook from "../components/createBook.js"
import Book from "../components/EBook.js"

export default {
    template: `
    <div class="w-100 p-5 mt-3">
        <div class="my-4 d-flex justify-content-between">
            <CreateEBook v-on:book-created="fetchBooks()" />
        </div>
        <div>
            <div class="my-4 d-flex flex-wrap justify-content-around">
                <Book v-for="book in books" :p="book" v-on:book-created="fetchBooks()" />
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            books: [],
            payload: {
                title: '',
                author: '',
            }
        }
    },
    created() {
        this.fetchBooks()
    },
    components: {
        CreateEBook,
        Book
    },
    methods: {
        fetchBooks() {
            getBooksforAdmin().then((res) => {this.books = [...res.data]})
        },
    },
}
