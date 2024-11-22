from flask import current_app as app, request, send_file
from flask_security import auth_required, roles_required
from ..controller import getUser, getAllSections, createSection, editSection, getSection, deleteSection, getAllUsers, getBooks, createBook, editBook, deleteBook, getBook, getIssuedBook, getIssuedBooks, deleteIssuedBook, delete_expired_books, getBooksBySection
from ..utils import datastore, db, request_ok, request_not_found, request_error, marshal_section, marshal_user, marshal_book, marshal_issued_book
from datetime import datetime as dt
from datetime import timedelta
from ..services import generate_admin_csv

@app.route('/admin/csv', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_csv():

    csv = generate_admin_csv()
    return send_file(csv, as_attachment=True, mimetype="text/csv", download_name=f"admin.csv")

@app.route('/admin/users', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_users():
    user_role = datastore.find_role("user")
    
    users = getAllUsers()

    u = []

    for user in users:
        if user.has_role(user_role):
            u.append(user)

    return request_ok(payload=marshal_user(u))

@app.route('/admin/section', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_section():
    sections = getAllSections()

    if sections is not None:
        payload = marshal_section(sections)
        return request_ok(payload=payload)
    else:
        return request_error()


@app.route('/admin/section/create', methods=['POST'])
@auth_required('token')
@roles_required("admin")
def admin_section_create():
    data = request.get_json()

    createData = {
        'name': data.get('name'),
        'description': data.get('description'),
        'date_created': data.get('date_created'),
        'active': data.get('active'),
        'isRequest': 0,
    }

    section = createSection(createData)


    payload = marshal_section(section)

    return request_ok(message="Section created", payload=payload)

@app.route('/admin/section/edit/<id>', methods=['POST'])
@auth_required('token')
@roles_required("admin")
def admin_section_edit(id):

    data = request.get_json()

    editData = {
        'id': id,
        'name': data.get('name'),
        'description': data.get('description'),
        'date_created': data.get('date_created'),
        'active': data.get('active')
    }

    edited = editSection(editData)

    if edited:
        if editData['active']:
            books = getBooksBySection(id)
            for book in books:
                book['available'] = True
                editBook(book)
        else:
            books = getBooksBySection(id)
            for book in books:
                book['available'] = False
                editBook(book)      
        return request_ok(message="Section edited")
    else:
        return request_error()

@app.route('/admin/section/delete/<id>', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_section_delete(id):

    deleted = deleteSection(id=id)
    for book in getBooksBySection(id):
        deleteBook(book.id)
    if deleted:
        return request_ok(message="Section deleted")


@app.route('/admin/book', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_book():
    books = getBooks()

    if books is not None:
        payload = marshal_book(book=books)
        return request_ok(payload=payload)
    else:
        return request_error()


@app.route('/admin/books/create', methods=['POST'])
@auth_required('token')
@roles_required("admin")
def admin_book_create():
    data = request.get_json()

    createData = {
        'title': data.get('title'),
        'author': data.get('author'),
        'date_created': data.get('date_created'),
        'description': data.get('description'),
        'available': data.get('available'),
        'section_id': data.get('section'),
        'doc': data.get('doc'),
        'avg_rating': 0
    }

    book = createBook(createData)


    payload = marshal_section(book)

    return request_ok(message="Book created", payload=payload)

@app.route('/admin/book/edit', methods=['POST'])
@auth_required('token')
@roles_required("admin")
def admin_book_edit():

    data = request.get_json()

    editData = {
        'id' : data.get('id'),
        'title': data.get('title'),
        'author': data.get('author'),
        'description': data.get('description'),
        'date_created': data.get('date_created'),
        'section_id': data.get('section_id'),
        'available': data.get('available'),
        'request': data.get('request'),
        'doc': data.get('doc'),
        'avg_rating': data.get('avg_rating')
    }

    edited = editBook(editData)

    if edited:
        return request_ok(message="Book edited")
    else:
        return request_error()
@app.route('/admin/book/issued', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_book_issued():
    books = getIssuedBooks()

    payload = marshal_issued_book(books)

    return request_ok(payload=payload)

@app.route('/admin/book/approve/<id>', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_book_request_approve(id):
    
    issue_book = getIssuedBook(id=id)
    book_id= issue_book.book_id
    book = getBook(id=book_id)
    book.available = False
    issue_book.request = False
    issue_book.is_returned = False
    
    issue_book.issue_date = dt.isoformat(dt.now())
    issue_date_dt = dt.fromisoformat(issue_book.issue_date)
    return_date_dt = issue_date_dt + timedelta(days=7)
    issue_book.return_date = dt.isoformat(return_date_dt)
    
    db.session.commit()
    
    return request_ok(message="Book approved")

@app.route('/admin/book/restrict/<id>', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_book_restrict(id):
    
    issue_book = getIssuedBook(id=id)
    issue_book.book.available = True
    issue_book.is_returned = True
    
    db.session.commit()
    
    return request_ok(message="Book restricted")

@app.route('/admin/book/delete_expired', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def delete_expired_books_route():
    delete_expired_books()
    return request_ok(message="Expired books deleted")

@app.route('/admin/book/available/<id>', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_book_available(id):
    
    book = getBook(id=id)
    book.available = True
    # if book.issue_book:
    #     book.issue_book.is_returned = True
    db.session.commit()
    deleteIssuedBook(id=id)
    
    return request_ok(message="Book available")

@app.route('/admin/book/unavailable/<id>', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_book_unavailable(id):
    
    book = getBook(id=id)
    book.available = False
    # if book.issue_book:
    #     book.issue_book.is_returned = False
    db.session.commit()
    
    return request_ok(message="Book unavailable")

@app.route('/admin/book/delete/<id>', methods=['GET'])
@auth_required('token')
@roles_required("admin")
def admin_book_delete(id):

    deleted = deleteBook(id=id)

    if deleted:
        return request_ok(message="Book deleted")

