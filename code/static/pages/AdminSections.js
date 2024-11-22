import { approveSectionRequest, createSectionForAdmin, deleteSectionForAdmin, getSectionsForAdmin, makeSectionActive, makeSectionInactive, editSectionForAdmin } from "../methods.js"

export default {
    template: `
    <div class="w-100 h-100">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createSection">
            Create Section
        </button>
        
        <div class="modal fade" id="deleteSectionConfirm" tabindex="-1" aria-labelledby="deleteConfirmLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="deleteSectionConfirmLabel">Delete section</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure about this? This can't be reversed.
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-danger" @click="deleteSectionMethod(deleteId)" data-bs-dismiss="modal">Yes, do it</button>
                        <button type="button" class="btn btn-secondary" @click="setDeleteId(null)" data-bs-dismiss="modal">No, forget it</button>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="createSection" tabindex="-1" aria-labelledby="createSectionLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="createSectionLabel">Create Section</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="name" placeholder="Name" v-model="payload.name">
                            <label for="name">Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="description" placeholder="Description" v-model="payload.description">
                            <label for="description">Description</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="activeBool" v-bind:checked="payload.active" @click="toggleActiveMethod">
                            <label class="form-check-label" for="activeBool">Display on / off</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="createSectionMethod">Create</button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="modal fade" id="editSection" tabindex="-1" aria-labelledby="editSectionLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="editSectionLabel">Edit Section</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="name" placeholder="Name" v-model="payload.name">
                            <label for="name">Name</label>
                        </div>
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="description" placeholder="Description" v-model="payload.description">
                            <label for="description">Description</label>
                        </div>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="activeBool" v-bind:checked="payload.active" @click="toggleActiveMethod">
                            <label class="form-check-label" for="activeBool">Display on / off</label>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-success" @click="editSectionMethod">Edit</button>
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
                        <th scope="col">Description</th>
                        <th scope="col">Date created</th>
                        <th scope="col">Status</th>
                        <td></td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="section in sections" :key="section.id">
                        <th scope="row">{{ section.id }}</th>
                        <td>{{ section.name }}</td>
                        <td>{{ section.description }}</td>
                        <td>{{ section.date_created.replace('T', ' ') }}</td>
                        <td>
                            <span class="badge text-bg-warning" v-if="section.isRequest">Request</span>
                            <span class="badge text-bg-success" v-if="section.active">Active</span>
                            <span class="badge text-bg-danger" v-if="!section.active">Inactive</span>
                        </td>
                        <td>
                            <div class="dropdown">
                                <button class="btn btn-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bi bi-gear"></i>
                                </button>
                                <ul class="dropdown-menu">
                                    <li v-if="section.active">
                                        <button class="dropdown-item" @click="deactivateSectionMethod(section)">Make inactive</button>
                                    </li>
                                    <li v-if="!section.active">
                                        <button class="dropdown-item" @click="activateSectionMethod(section)">Make active</button>
                                    </li>
                                    <li v-if="section.isRequest">
                                        <button class="dropdown-item" @click="approveRequestMethod(section.id)">Approve request</button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item btn-danger" @click="setDeleteId(section.id)" data-bs-toggle="modal" data-bs-target="#deleteSectionConfirm">Delete section</button>
                                    </li>
                                    <li>
                                        <button class="dropdown-item btn-info" @click="setEditing(section)" data-bs-toggle="modal" data-bs-target="#editSection">Edit section</button>
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
            sections: [],
            payload: {
                name: '',
                description: '',
                active: false
            },
            deleteId: null,
            editId: null
        }
    },
    created() {
        this.fetchSectionsMethod()
    },
    methods: {
        fetchSectionsMethod() {
            getSectionsForAdmin()
            .then((res) => {
                this.sections = [...res.data]
            })
        },
        setEditing(data) {
            this.payload = {...data}
        },
        toggleActiveMethod() {
            this.payload.active = !this.payload.active
        },
        editSectionMethod() {
            editSectionForAdmin({...this.payload})
            .then((res) => {
                console.log(res)
            })
            .finally(() => this.fetchSectionsMethod())
        },
        createSectionMethod() {
            createSectionForAdmin({...this.payload})
            .then((res) => {
                console.log(res)
            })
            .finally(() => this.fetchSectionsMethod())
        },
        deactivateSectionMethod(data) {
            makeSectionInactive({...data})
            .then((res) => {})
            .finally(() => this.fetchSectionsMethod())
        },
        activateSectionMethod(data) {
            makeSectionActive({...data})
            .finally(() => this.fetchSectionsMethod())
        },
        approveRequestMethod(id) {
            approveSectionRequest(id)
            .finally(() => this.fetchSectionsMethod())
        },
        setDeleteId(id) {
            this.deleteId = id
        },
        deleteSectionMethod(id) {
            deleteSectionForAdmin(id)
            .finally(() => this.fetchSectionsMethod())
        }
    },
}
