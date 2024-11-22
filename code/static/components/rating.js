import { rate } from "../methods.js";
export default {
    template: `
    <div>
        <div class="modal fade" v-bind:id="'rating' + payload.book_id" tabindex="-1" aria-labelledby="ratingLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="deleteBookConfirmLabel">Rate Book</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">Rate</h5>
                                <form @submit.prevent="rateMethod">
                                    <div class="form-group">
                                        <label for="rating">Rating</label>
                                        <input type="number" class="form-control" id="rating" v-model="payload.rating" required>
                                    </div>
                                    <div class="form-group">
                                        <label for="comment">Comment</label>
                                        <textarea class="form-control" id="comment" v-model="payload.comment" required>
                                        </textarea>                  
                                    </div>
                                    <button type="submit" class="btn btn-primary">Rate</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    `,
    data() {
        return {
            payload: {
                book_id: Number(),
                rating: 0,
                comment: ""
            }
        }
    }, 
    props: ['p'],
    created() {
        this.payload.book_id = this.p
    },
    methods: {
        rateMethod() {
            rate(this.payload)
            .then(() => {
                this.$emit('request-refresh')
            })
        }
    }
}