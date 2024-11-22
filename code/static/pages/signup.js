import { getUserTypes, signup } from "../methods.js"
import { store_user } from "../utils.js"

export default {
    template: `
    <div>
        <div class="mb-3 p-5 bg-light">
            
            <div class="form-floating mb-3">
                <input type="text" class="form-control" id="name" placeholder="Name" v-model="payload.name">
                <label for="name">Name</label>
            </div>

            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="payload.email">
                <label for="email">Email address</label>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" placeholder="Password" id="password" v-model="payload.password">
                <label for="password">Password</label>
            </div>

            
            <div class="form-floating my-3">
                <select class="form-select" id="role" v-model="payload.role">
                    <option v-for="role in roles" v-bind:value="role.id">{{ role.name }}</option>
                </select>
                <label for="role">Role</label>
            </div>

            <button class="btn btn-primary mt-2" @click='signupMethod'>Sign up</button>

            <div class="alert alert-danger alert-dismissible fade show mt-5" role="alert" v-if="error">
                <h6>An error occurred</h6>
                <div>{{error}}</div>
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click='clearError'></button>
            </div>
        </div> 
    </div>
    `,
    data() {
        return {
            payload: {
                name: null,
                email: null,
                password: null,
                role: null,
            },
            roles: [],
            error: null,
        }
    },
    created() {
        getUserTypes().then((res) => {
            this.roles = [...res.data]
        })
    },
    methods: {
        clearError() {
            this.error = ''
        },
        signupMethod() {
            signup(this.payload)
            .then((res) => {
                store_user({...res.data})
                this.$router.push({ path: '/' })
                
            })
        },
    },
}
