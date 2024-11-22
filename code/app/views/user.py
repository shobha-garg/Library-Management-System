from flask import current_app as app, request
from flask_security import auth_required, roles_required, current_user
from ..controller import getBooks, getBooksByTitle, getBooksBySection, getBook, getActiveBooks, getRequestedBooks, getUserIssuedBooks, createIssuedBook,deleteIssuedBook, getIssuedBook, section_by_name, edit_profile, createRating, getAvgRating
from ..utils import request_error, request_ok, request_not_found, marshal_book, marshal_issued_book, marshal_user,marshal_rating, db
from ..utils import cache

@app.route('/search', methods=['POST'])
@auth_required('token')
@roles_required('user')
def user_search():
    data = request.get_json()

    title = data.get('search')
    filter = data.get('filter')

    books = []

    if filter == 'book':
        books = getBooksByTitle(title=title)
    elif filter == 'section':
        section= section_by_name(name=title)
        books = getBooksBySection(section_id= section.id)
        print(section.id)
    elif filter == 'title':
        books = getBooksByTitle(title=title)

    payload = marshal_book(books)

    return request_ok(payload=payload, message=f"Found {len(books)} results for {filter} named {title}")

@app.route('/user/home', methods=['GET'])
@auth_required('token')
@roles_required('user')
def user_home():

    books = getBooks()
    for book in books:
        book.avg_rating = getAvgRating(book_id=book.id).avg_rating
    payload = marshal_book(books)

    return request_ok(payload=payload)

@app.route('/profile', methods=['GET', 'POST'])
@auth_required('token')
@roles_required('user')
def user_profile():
    user = current_user

    if request.method == 'GET':
        payload = marshal_user(user)
        return request_ok(payload=payload)
    
    if request.method == 'POST':
        data = request.get_json()
        user.name = data.get('name', user.name)
        user.email = data.get('email', user.email)
        
        edit_profile(user)

        payload = marshal_user(user)
        return request_ok(payload=payload)

@app.route('/user/book/issued', methods=['GET'])
@auth_required('token')
@roles_required('user')
def user_issued_book():
    user_id=current_user.id
    books = getUserIssuedBooks(user_id=user_id)

    payload = marshal_issued_book(books)

    return request_ok(payload=payload)

@app.route('/user/book/issue', methods=['POST'])
@auth_required('token')
@roles_required('user')
def user_issue_book():
    data = request.get_json()
    user_id = current_user.id
    book_id = data.get('book')
    existing_book = getUserIssuedBooks(user_id=user_id)
    if len(existing_book) >= 5:
        return request_error(message="You can't issue more than 5 books.")
    else:
        books = createIssuedBook({
        'user_id': user_id,
        'book_id': book_id,
        'issue_date': None,
        'return_date': None,
        'is_returned': 0,
        'request': 1
        })
        payload = marshal_issued_book(books)

        return request_ok(payload=payload, message="Book issue request sent to admin for approval.")

@app.route('/user/book/return/<id>', methods=['GET'])
@auth_required('token')
@roles_required('user')
def user_return_book(id):
    issue_book = getIssuedBook(id=id)

    issue_book.book.available = True
    issue_book.is_returned = True
    db.session.commit()
    return request_ok(message="Book returned successfully")

@app.route('/user/watchlist', methods=['GET'])
@auth_required('token')
@roles_required('user')
@cache.cached(timeout=50)
def user_watchlist():
    user_id= current_user.id
    books= getUserIssuedBooks(user_id=user_id)
    
    payload = marshal_issued_book(books)
    
    return request_ok(payload=payload, message="Watchlist fetched successfully.")

@app.route('/user/rate', methods=['POST'])
@auth_required('token')
@roles_required('user')
def user_rating():
    data = request.get_json()
    createData= {
        'rating': data['rating'],
        'user_id': current_user.id,
        'book_id': data.get('book_id'),
        'comment': data['comment']
    }
    final_data= createRating(createData)
    payload = marshal_rating(final_data)

    return request_ok(message="Rating update successfully.", payload=payload)