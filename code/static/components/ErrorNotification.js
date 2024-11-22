export default {
    template: `
    <div v-if="message">
        <div class="alert alert-danger alert-dismissible fade show mt-5" role="alert">
            <h6>An error occurred</h6>
            <div>{{error}}</div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" @click='clearError'></button>
        </div>
    </div>
    `,
    props: ['error'],
    data() {
        return {
            message: this.error
        }
    },
    methods: {
        clearError() {
            this.error = null
        }
    },
}
