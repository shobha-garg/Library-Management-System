import { get_user_role } from "../utils.js"
import EditBook from "./editBook.js"
import DeleteBookConfirm from "./deleteBook.js"
import rating from "./rating.js"
import { addNewIssuedBook, availableBook,unavailableBook  } from "../methods.js"
export default {
    template: `
<div>        <div class="card" style="min-width: 20rem; width: 100%;max-width: 20rem;">
            <div class="card-body">
                <h5 class="card-title">{{ book.title }}</h5>
                <p class="card-text text-muted">Author: {{ book.author }}</p>
                <p class="card-text text-muted">Section name: {{ book.section.name }}</p>
                <div>
                    
                    <span class="badge text-bg-danger" v-if="!book.available">Not available</span>
                    <span class="badge text-bg-success" v-if="book.available">Available</span>
                </div>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item"><b>Description:</b> {{ book.description }} </li>
                <li class="list-group-item"><b>Average rating:</b> {{ displayAvgRating }}</li>
                <li class="list-group-item"><b>Date created</b>: {{ book.date_created.replace('T', ' ') }}</li>
            </ul>

            <div class="card-footer">
                <button type="button" class="btn btn-primary" @click="issueBookMethod" v-if="role=='user'" :disabled="!canIssueBook">Issue Book</button>
                <button type="button" class="btn btn-success" data-bs-toggle="modal" v-if="role=='user'" v-bind:data-bs-target="'#rating' + book.id">Rate</button>
                <div class="btn-group w-100" role="group" v-if="role=='admin'">
                    <a v-bind:href="book.doc" target="_blank" class="btn btn-primary">Book pdf</a>
                    <button type="button" class="btn btn-warning" data-bs-toggle="modal" v-bind:data-bs-target="'#editBook' + book.id">Edit</button>

                    <button type="button" class="btn btn-danger" data-bs-toggle="modal" v-bind:data-bs-target="'#deleteBook' + book.id">Delete</button>

                    <button type="button" class="btn btn-info" v-if="book.available" @click="deactivateBookMethod">Make unavailable</button>
                    <button type="button" class="btn btn-info" v-if="!book.available" @click="activateBookMethod">Make available</button>
                </div>
            </div>
        </div>
        <rating v-if="role=='user'" :p="book.id" v-on:request-refresh="emitRefresh()" />
        <EditBook v-if="role=='admin'" :p="book" v-on:request-refresh="emitRefresh()" />
        <DeleteBookConfirm v-if="role=='admin'" :p="book.id" v-on:request-refresh="emitRefresh()" />

    </div>
    `,
    props: ['p'],
    emits: ['book-created'],
    data() {
        return {
            book: {
            },
            payload: {
                book: 0
            },
            canIssueBook: true,
            error: null,
            role: get_user_role()
        }
    },
    created() {
        this.book = {...this.p}
        this.payload.book = this.p.id
        this.canIssueBook= this.p.available
    },
    components: {
        EditBook,
        DeleteBookConfirm,
        rating
    },
    computed: {
        displayAvgRating() {
          return this.book.avg_rating === null ? 0 : this.book.avg_rating;
        }
      },
    methods: {
        emitRefresh() {
            this.$emit('book-created')
        },
        addBookMethod() {
            this.payload.quantity = Number(this.payload.quantity) + 1
        },
        activateBookMethod() {
            availableBook(this.book.id)
            .then((res ) => {})
            .finally(() => {
                this.$emit('book-created')
            })
        },
        deactivateBookMethod() {
            unavailableBook(this.book.id)
            .then((res ) => {})
            .finally(() => {
                this.$emit('book-created')
            })
        },
        issueBookMethod() {
            addNewIssuedBook(this.payload)
            .then((res) => {
                this.canIssueBook = false
            })
            .catch((err) => {
                window.alert("Can't issue more books.")
            })
    },
}}
