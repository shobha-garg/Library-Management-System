import { approveIssuedBook, getIssuedBooksforAdmin, restrictIssuedBook } from "../methods.js";

export default {
    template: `
    <div class="w-100 h-100">
        <h1>List of books</h1>
        
        <div class="modal fade" id="restrictIssuedBook" tabindex="-1" aria-labelledby="restrictIssuedBook" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="restrictIssuedBookLabel">Restrict Book</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure about this? This can't be reversed.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="restrictAccessMethod(restrictId)" data-bs-dismiss="modal">Yes, do it</button>
                        <button type="button" class="btn btn-secondary" @click="setRestrictId(null)" data-bs-dismiss="modal">No, forget it</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">User name</th>
                        <th scope="col">Issued Date</th>
                        <th scope="col">Return Date</th>
                        <th scope="col">Status</th>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="ibook in issued_books" :key="ibook.id">
                        <th scope="row">{{ ibook.id }}</th>
                        <td>{{ ibook.book.title }}</td>
                        <td>{{ ibook.user.name }}</td>
                        <td>{{ formatDate(ibook.issue_date) }}</td>
                        <td>{{ formatDate(ibook.return_date) }}</td>
                        <td>
                            <span class="badge text-bg-success" v-if="ibook.request">Request pending</span>
                            <span class="badge text-bg-danger" v-if="!ibook.request && !ibook.is_returned">Not returned</span>
                            <span class="badge text-bg-warning" v-if="!ibook.request && ibook.is_returned">Book returned</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-gear"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <button class="dropdown-item" @click="approveBookRequest(ibook.id)">Approve Request</button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item btn-danger" @click="setRestrictId(ibook.id)" data-bs-toggle="modal" data-bs-target="#restrictIssuedBook">Restrict Access</button>
                                    </li>
                                </ul>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data() {
        return {
            issued_books: [],
            restrictId: null
        }
    },
    created() {
        this.fetchIssuedBooks();
    },
    methods: {
        fetchIssuedBooks() {
            getIssuedBooksforAdmin()
            .then((res) => {
                this.issued_books = [...res.data];
            });
        },
        approveBookRequest(id) {
            approveIssuedBook(id)
            .finally(() => this.fetchIssuedBooks());
        },
        setRestrictId(id) {
            this.restrictId = id;
        },
        restrictAccessMethod(id) {
            restrictIssuedBook(id)
            .finally(() => this.fetchIssuedBooks());
        },
        formatDate(date) {
            return date ? date.replace(/\.\d{3}Z$/, '').replace('T', ' ') : 'N/A';
        }
    }
};
