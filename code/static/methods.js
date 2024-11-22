import {get, post} from './utils.js'

const login = (data={email: String(), password: String()}) => {
    return post('/auth/login', {...data})
}

const logout = () => {
    return get('/auth/logout')
}

const signup = (data={email: String(), password: String(), name: String(),}) => {
    return post('/auth/signup', {...data})
}

const profile = () => {
    return get('/profile')
}

const edit = (data={name: String(), email: String()}) => {
    return post('/profile', {...data})
}
const rate = (data={rating: Number(), Comment:String()}) => {
    return post('/user/rate', {...data})
}
const update_user_details = (data={name: String(), email: String(), password: String()}) => {
    return post('/profile', {...data})
}

const getUserTypes = () => {
    return get('/auth/user_types')
}

const getAllUsers = () => {
    return get('/admin/users')
}

const createEBook = (data={title: String(), author: String(), description: String(), date_issued: null, date_returned: null}) => {
    return post('/admin/books/create', {...data})
}
const approveBookRequest = (id) => {
    return get(`/admin/book/approve/${id}`)
} 

const deleteBook = (id) => {
    return get(`/admin/book/delete/${id}`)
} 

const editBook = (data={title: String(), author: String(), description: String(), date_issued: null, date_returned: null}) => {
    return post('/admin/book/edit', {...data})
}
const getBooksforAdmin = () => {
    return get('/admin/book')
}

const searchBook = (data={search: String(), filter: String()}) => {
    return post('/search', {...data})
}

const getSectionsForAdmin = () => {
    return get('/admin/section')
}

const createSectionForAdmin = (data={name: String(), description: String(), active: String()}) => {
    return post('/admin/section/create', {...data})
}

const editSectionForAdmin = (data={id: Number(), name: String(), description: String(), isRequest: Boolean(), active: Boolean()}) => {
    return post(`/admin/section/edit/${data.id}`, {...data})
}

const deleteSectionForAdmin = (id) => {
    return get(`/admin/section/delete/${id}`)
} 

const makeSectionActive = (data={id: Number(), name: String(), description: String(), isRequest: Boolean(), active: Boolean()}) => {
    return post(`/admin/section/edit/${data.id}`, {...data, active: true})
}

const makeSectionInactive = (data={id: Number(), name: String(), description: String(), isRequest: Boolean(), active: Boolean()}) => {
    return post(`/admin/section/edit/${data.id}`, {...data, active: false})
}

const approveSectionRequest = (id) => {
    return get(`/admin/section/approve/${id}`)
}

const getUserHome = () => {
    return get('/user/home')
}

const getIssuedBooks = () => {
    return get('/user/book/issued')
}

const getIssuedBooksforAdmin = () => {
    return get('/admin/book/issued')
}

const addNewIssuedBook = (data={book_id: Number(), user_id: Number(), date_issued: null, date_returned: null}) => {
    return post('/user/book/issue', {...data})
}

const returnIssuedBook = (id) => {
    return get(`/user/book/return/${id}`)
}

const watchlist= () =>{
    return get('/user/watchlist')
}

const approveIssuedBook = (id) => {
    return get(`/admin/book/approve/${id}`)
}
const restrictIssuedBook = (id) => {
    return get(`/admin/book/restrict/${id}`)
}

const availableBook = (id) => {
    return get(`/admin/book/available/${id}`)
}

const unavailableBook = (id) => {
    return get(`/admin/book/unavailable/${id}`)
}

const unrestrictUserById = (id) => {
    return get(`/admin/users/unrestrict/${id}`)
}

const restrictUserById = (id) => {
    return get(`/admin/users/restrict/${id}`)
}

const getAdminCSV = () => {
    return get('/admin/csv', {}, false)
}

export {
    login,
    logout,
    signup,
    profile,
    edit,
    rate,
    update_user_details,
    getUserTypes,
    getAllUsers,
    createEBook,
    approveBookRequest,
    deleteBook,
    editBook,
    searchBook,
    getBooksforAdmin,
    getSectionsForAdmin,
    createSectionForAdmin,
    editSectionForAdmin,
    deleteSectionForAdmin,
    makeSectionActive,
    makeSectionInactive,
    approveSectionRequest,
    getUserHome,
    getIssuedBooks,
    addNewIssuedBook,
    returnIssuedBook,
    getIssuedBooksforAdmin,
    watchlist,
    approveIssuedBook,
    restrictIssuedBook,
    availableBook,
    unavailableBook,
    unrestrictUserById,
    restrictUserById,
    getAdminCSV
}