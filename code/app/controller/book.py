from ..models import Book
from ..utils import db
from sqlalchemy.exc import SQLAlchemyError

def createBook(data={}):
    try:
        new_book = Book(
            title= data['title'],
            author= data['author'],
            date_created= data['date_created'],
            description=data['description'], 
            available=data['available'],
            avg_rating=data['avg_rating'],
            section_id= data['section_id'],
            doc= data['doc']
        )
        db.session.add(new_book)
    except SQLAlchemyError as e:
        db.session.rollback()
        
        raise Exception(f'DB error. {e}')
    else:
        db.session.commit()
        return new_book

def deleteBook(id=''):
    Book.query.filter_by(id=id).delete()
    db.session.commit()
    return True

def editBook(data={}):
    try:
        book = getBook(id=data['id'])
        del data['id']
        for key in data:
            setattr(book, key, data[key])
    except:
        db.session.rollback()
        raise Exception('DB error.')
    else:
        db.session.commit()
        return True

def getBooks():
    return db.session.query(Book).all()

def getBooksBySection(section_id=''):
    return db.session.query(Book).filter(Book.section_id == section_id).all()

def getBook(id=''):
    return db.session.query(Book).filter(Book.id == id).first()

def getBooksByTitle(title):
    books = Book.query.filter(Book.title.ilike(f'%{title}%')).all()
    return books


def getActiveBooks():
    return db.session.query(Book).filter(Book.active == True).all()

def getRequestedBooks():
    return db.session.query(Book).filter(Book.isRequest == 1).all()

def getBook( id=''):
    book = db.session.query(Book).filter((Book.id == id)).first()
    return book