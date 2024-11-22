import { editBook, getSectionsForAdmin } from '../methods.js'

export default {
    template: `
        <div class="modal fade" v-bind:id="'editBook' + payload.id" tabindex="-1" aria-labelledby="editBookLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5">Edit Book</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" placeholder="title" v-model="payload.title">
                            <label for="name">Title</label>
                        </div>
                
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" placeholder="author" v-model="payload.author">
                            <label for="author">Author</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" placeholder="description" v-model="payload.description">
                            <label for="description">Description</label>
                        </div>

                        <div class="form-floating my-3">
                            <select class="form-select" v-model="payload.section_id">
                                <option v-for="section in sections" v-bind:value="section.id">{{ section.name }}</option>
                            </select>
                            <label for="section">Section</label>
                        </div>
                
                        <div class="form-floating mb-3">
                            <input type="datetime-local" class="form-control" name="date_created" placeholder="date_created on" v-model="payload.date_created">
                            <label for="date_created">Date Created </label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" v-bind:checked="payload.available" @click="toggleActiveMethod">
                            <label class="form-check-label" for="activeBool">Display on / off</label>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="editBookMethod" data-bs-dismiss="modal">Edit</button>
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
            payload: {
                id: Number(),
                title: String(), 
                author: String(), 
                description: String(), 
                date_created: Date.now(), 
            },
            sections: [],
        }
    },
    created() {
        this.payload = {...this.p}
        getSectionsForAdmin()
        .then((res) => {
            this.sections = [...res.data]
        })
    },
    methods: {
        editBookMethod() {
            editBook(this.payload)
            .then((res) => {
                console.log(res)
                alert(res.message)
            })
            .finally(() => {
                this.$emit('request-refresh')
            })
        },
        toggleActiveMethod() {
            this.payload.active = !this.payload.active
        },
    },
}
