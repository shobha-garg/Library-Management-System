import Home from './pages/Home.js'
import Login from './pages/login.js'
import Signup from './pages/signup.js'
import AdminUsers from './pages/AdminUsers.js'
import AdminBooks from './pages/AdminBooks.js'
import AdminSections from './pages/AdminSections.js'
import AdminIssuedBooks from './pages/AdminIssuedBooks.js'

const routes = [
    { path: '/', component: Home, name: 'Home' },
    { path: '/login', component: Login, name: 'Login' },
    { path: '/signup', component: Signup, name: 'Sign up' },
    { path: '/admin/users', component: AdminUsers, name: 'Admin user dashboard' },
    { path: '/admin/section', component: AdminSections, name: 'Admin section dashboard' },
    { path: '/admin/issued_books', component: AdminIssuedBooks, name: 'Admin issued books dashboard' },
    {path: '/admin/book', component: AdminBooks, name: 'Admin book dashboard'}
]

const router = new VueRouter({routes})

export default router