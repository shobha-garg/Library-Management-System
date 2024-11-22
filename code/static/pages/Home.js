import { get_user_role } from "../utils.js"
import UserHome from "../components/UserHome.js"
import AdminHome from "../components/AdminHome.js"

export default {
    template: `

    <div class="w-75">
        
        <UserHome v-if="role=='user'" />

        <AdminHome v-if="role=='admin'" />
    
        
    </div>

    `,
    data() {
        return {
            role: get_user_role()
        }
    },
    components: {AdminHome,UserHome},
    methods: {
        
    },
}
