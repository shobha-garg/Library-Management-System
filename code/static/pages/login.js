import { login } from '../methods.js'
import { store_user } from '../utils.js'
import ErrorNotification from '../components/ErrorNotification.js'

export default {
    template: `
    <div>
        <div class="mb-3 p-5 bg-light">

            <div class="form-floating mb-3">
                <input type="email" class="form-control" id="email" placeholder="name@example.com" v-model="payload.email">
                <label for="email">Email address</label>
            </div>

            <div class="form-floating mb-3">
                <input type="password" class="form-control" placeholder="Password" id="password" v-model="payload.password">
                <label for="password">Password</label>
            </div>

            <button class="btn btn-primary mt-2" @click='loginMethod'>Login</button>
            
        </div>
        
        <ErrorNotification :error="error" /> 
    </div>
    `,
    data() {
        return {
            payload: {
                email: null,
                password: null,
            },
            error: null,
        }
    },
    components: {
        ErrorNotification
    },
    methods: {
        loginMethod() {
            login(this.payload)
            .then((res) => {
                store_user({...res.data})
                this.$router.push({ path: '/' })
            })
            .catch((e) => {
                this.error = e.message
            })
        },
    },
}
