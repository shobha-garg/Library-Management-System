import { getAllUsers, restrictUserById, unrestrictUserById } from "../methods.js"

export default {
    template: `
    <div class="w-100 p-3">
        <h2 class="my-4">Users details</h2>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col" class="w-50">Name</th>
                        <th scope="col" class="w-50">Email</th>
                        <th scope="col">Status</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in users">
                        <th scope="row">{{ user.id }}</th>
                        <td>{{ user.name }}</td>
                        <td>{{ user.email }}</td>
                        <td>
                            <span class="badge text-bg-success" v-if="user.active">Active</span>
                            <span class="badge text-bg-danger" v-if="!user.active">Inactive</span>
                            <span class="badge text-bg-danger" v-if="user.restricted">Restricted</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `,
    data() {
        return {
            users: [],
        }
    },
    created() {
        this.fetchUsersMethod()
    },
    methods: {
        fetchUsersMethod() {
            getAllUsers().then((res) => {this.users = [...res.data];console.log(res)})
        },
    },
}
