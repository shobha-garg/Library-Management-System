import { createEBook,getSectionsForAdmin } from '../methods.js'

export default {
    template: `
    <div>

        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createEBook">
            Add new book
        </button>

        <div class="modal fade" id="createEBook" tabindex="-1" aria-labelledby="createBookLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="createBookLabel">Your shopping cart</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="title" placeholder="title" v-model="payload.title">
                            <label for="name">Title</label>
                        </div>
                
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="author" placeholder="author" v-model="payload.author">
                            <label for="author">Author</label>
                        </div>

                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="description" placeholder="description" v-model="payload.description">
                            <label for="description">Description</label>
                        </div>

                        <div class="form-floating my-3">
                            <select class="form-select" id="section" v-model="payload.section">
                                <option v-for="section in sections" v-bind:value="section.id">{{ section.name }}</option>
                            </select>
                            <label for="section">Section</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="file" @change="handlePDFUpload"/>
                        </div>
                
                        <div class="form-floating mb-3">
                            <input type="datetime-local" class="form-control" id="date_created" name="date_created" placeholder="date_created on" v-model="payload.date_created">
                            <label for="date_created">Date Created </label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="activeBool" v-bind:checked="payload.available" @click="toggleActiveMethod">
                            <label class="form-check-label" for="activeBool">Display on / off</label>
                        </div>

                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="createEBookMethod" data-bs-dismiss="modal">Create</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    emits: ['book-created'],
    data() {
        return {
            payload: {
                title: String(), 
                author: String(), 
                description: String(), 
                date_created: Date.now(), 
                available: Boolean(),
                doc: null,
            },
            sections: [],
        }
    },
    created() {

        getSectionsForAdmin()
        .then((res) => {
            this.sections = [...res.data]
        })

    },
    methods: {
        handlePDFUpload(event) {
            this.payload.doc = event.target.files[0];
            // Add more logic here to handle the file
            this.convertToBase64(this.payload.doc)
            .then((res) => {
                this.payload.doc = res
            })
        },
        convertToBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        createEBookMethod() {
            createEBook(this.payload)
            .then((res) => {
                console.log(res)
                window.alert('Book created')
            })
            .finally(() => {
                this.$emit('book-created')
            })
        },
        toggleActiveMethod() {
            this.payload.active = !this.payload.active
        },
    },
}
