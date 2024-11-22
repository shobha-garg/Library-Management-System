export default {
    template: `
    <div>

        <h1>Welcome Librarian</h1>
        <p class="text-muted mt-4 mb-5">Pick an action</p>
        <hr />

        <div class="row">
            <div class="col-md-4 pt-5">
                <div class="card rounded-4 shadow-sm border-0 hover hover-shadow p-4 bg-body-tertiary h-100">
                    <div class="card-body">
                        <h5 class="card-title">Manage Users</h5>
                        <p class="card-text">View user details</p>
                        <router-link class="stretched-link" to="/admin/users"></router-link>
                    </div>
                </div>
            </div>
            <div class="col-md-4 pt-5">
                <div class="card rounded-4 shadow-sm border-0 hover hover-shadow p-4 bg-body-tertiary h-100">
                    <div class="card-body">
                        <h5 class="card-title">Manage EBook</h5>
                        <p class="card-text">Create, view and delete book details and perform actions to restrict / unrestrict access</p>
                        <router-link class="stretched-link" to="/admin/book"></router-link>
                    </div>
                </div>
            </div>

            <div class="col-md-4 pt-5">
                <div class="card rounded-4 shadow-sm border-0 hover hover-shadow p-4 bg-body-tertiary h-100">
                    <div class="card-body">
                        <h5 class="card-title">Manage Issued Books</h5>
                        <p class="card-text">View issued books details and perform actions to restrict / unrestrict access</p>
                        <router-link class="stretched-link" to="/admin/issued_books"></router-link>
                    </div>
                </div>
            </div>

            <div class="col-md-4 pt-5">
                <div class="card rounded-4 shadow-sm border-0 hover hover-shadow p-4 bg-body-tertiary h-100">
                    <div class="card-body">
                        <h5 class="card-title">Manage Sections</h5>
                        <p class="card-text">Create, view and delete sections, and perform actions to restrict / unrestrict public view</p>
                        <router-link class="stretched-link" to="/admin/section"></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    data() {
        return {}
    },
    methods: {},
}
