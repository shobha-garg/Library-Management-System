import { get_user, delete_user} from "../utils.js";
import { edit,logout } from "../methods.js";

export default {
  template: `
    <div>
        <button type="button" class="btn btn-primary position-relative me-3 mb-sm-3 mb-lg-0" data-bs-toggle="modal" data-bs-target="#userDetails" @click="fetchUserDetails">
            <i class="bi bi-person"></i>
        </button>
        <div class="modal fade" id="userDetails" tabindex="-1" aria-labelledby="userDetailsLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="userDetailsLabel">Your Profile</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="card" style="min-width: 20rem; width: 100%; max-width: 20rem;">
                        <div class="card-body">
                            <form @submit.prevent="saveUserDetails">
                                <div class="mb-3">
                                    <label for="name" class="form-label">Name</label>
                                    <input type="text" class="form-control" id="name" v-model="user.name" required>
                                </div>
                                <div class="mb-3">
                                    <label for="email" class="form-label">Email</label>
                                    <input type="email" class="form-control" id="email" v-model="user.email" required>
                                </div>
                                <button type="submit" class="btn btn-primary">Save Details</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
  data() {
    return {
      user: {
        name: "",
        email: "",
        // password: "",
      },
    };
  },
  created() {
    this.fetchUserDetails();
  },
  methods: {
    fetchUserDetails() {
      const userDetails = get_user();
      this.user.name = userDetails.name;
      this.user.email = userDetails.email;
    },
    saveUserDetails() {
          edit(this.user)
              .then(() => {
                  // const myModal = new bootstrap.Modal('#userDetails', {});
                  // myModal.hide();
                  alert("User details updated successfully.");
                  delete_user()
                  logout().then((res) => this.$router.push({ path: '/login' }))
                }
              )
              .catch(err => {
                  console.error("Failed to update user details:", err);
                  alert("An error occurred while updating user details.");
              });
      
    },
  },
};
