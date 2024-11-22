import { deleteBook } from '../methods.js'

export default {
    template: `
    <div>
        <div class="modal fade" v-bind:id="'deleteBook' + deleteId" tabindex="-1" aria-labelledby="deleteBookConfirmLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="deleteBookConfirmLabel">Delete Book</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure about this? It can't be reversed.
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="deleteBookConfirmMethod" data-bs-dismiss="modal">Yes, do it</button>
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No, forget it</button>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    `,
    props: ['p'],
    emits: ['request-refresh'],
    data() {
        return {
            deleteId: Number(),
            sections: [],
        }
    },
    created() {
        this.deleteId = this.p
    },
    methods: {
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
    },
}
