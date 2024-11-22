import { getIssuedBooks, returnIssuedBook } from "../methods.js"

export default {
    template: `
    <div>

        <button type="button" class="btn btn-primary position-relative me-3 mb-sm-3 mb-lg-0" data-bs-toggle="modal" data-bs-target="#userWatchlist" @click="getWatchlistItemsMethod">
            <i class="bi bi-handbag"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ watchlist_items.length }}
                <span class="visually-hidden">items in cart</span>
            </span>
        </button>
        
        <div class="modal fade" id="userWatchlist" tabindex="-1" aria-labelledby="userWatchlistLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="userWatchlistLabel">Your Watchlist</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="table-responsive">

                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col" class="w-75">Title</th>
                                        <th scope="col" class="text-center">Author name</th>
                                        <th scope="col" style="width: 10%">Book Pdf</th>
                                        <th scope="col" style="width: 10%">Return Date</th>
                                        <th scope="col" style="width: 10%">Return</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-if="watchlist_items.length == 0">
                                        <td colspan="4" class="text-center text-muted p-5">
                                            No books in the watchlist yet.
                                        </td>
                                    </tr>
                                    <tr v-for="item in watchlist_items">
                                        <td>{{ item.book.title }}</td>
                                        <td>
                                            {{item.book.author}}
                                        </td>
                                        <td><a v-bind:href="item.book.doc" target="_blank" class="btn btn-primary">Click here</a></td>
                                        <td>{{ formatDate(item.return_date) }}</td>
                                        <td><button class="btn btn-danger" type="button" @click="returnIssuedBookMethod(item)">Return Book
                                                </button></td>
                                                
                                        <div class="input-group">
                                                <button class="btn btn-link" type="button" @click="returnIssuedBookMethod(item)">
                                                </button>
                                        </div>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    `,
    data() {
        return {
            watchlist_items: []
        }
    },
    created() {
        this.getWatchlistItemsMethod()
    },
    methods: {
        getWatchlistItemsMethod() {
            getIssuedBooks().then((res) => {this.watchlist_items = [...res.data]})
        },
        returnIssuedBookMethod(item) {
            returnIssuedBook(item.id)
            .then((res) => {})
            .finally(() => {this.getWatchlistItemsMethod()})
        },
        formatDate(date) {
            return date ? date.replace('T', ' ').replace(/\.\d{3}Z$/, '') : 'N/A';
        },
        deleteBookConfirmMethod() {
            deleteBook(this.deleteId)
            .then((res) => {
                console.log(res)
                window.alert('Book deleted.')
            })
            .finally(() => {
                this.$emit('request-refresh')
            })
        },
        }
    }
