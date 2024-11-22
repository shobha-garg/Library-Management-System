from ..models import IssuedBook
from ..utils import db
from datetime import datetime as dt

def createIssuedBook(data={}):
    try:
        new_issued_book = IssuedBook(
            user_id=data['user_id'], 
            book_id= data['book_id'],
            issue_date= data['issue_date'],
            return_date= data['return_date'],
            is_returned= data['is_returned'],
            request= data['request']
        )
        db.session.add(new_issued_book)
    except:
        db.session.rollback()
        raise Exception('DB error.')
    else:
        db.session.commit()
        return new_issued_book
    
def deleteIssuedBook(id=''):
    IssuedBook.query.filter_by(id=id).delete()
    db.session.commit()
    return True

def editIssuedBook(data={}):
    try:
        issued_book = getIssuedBook(id=data['id'])
        del data['id']
        for key in data:
            setattr(issued_book, key, data[key])
    except:
        db.session.rollback()
        raise Exception('DB error.')
    else:
        db.session.commit()
        return True
    
def getIssuedBooks():
    return db.session.query(IssuedBook).all()

def getUserIssuedBooks( user_id=''):
    issued_book = db.session.query(IssuedBook).filter((IssuedBook.user_id == user_id) & (IssuedBook.request== 0) & (IssuedBook.is_returned== 0)).all()
    return issued_book

def getIssuedBook( id=''):
    issued_book = db.session.query(IssuedBook).filter((IssuedBook.id == id)).first()
    return issued_book
    
def delete_expired_books():
    current_time = dt.utcnow()
    expired_books = IssuedBook.query.filter(IssuedBook.return_date <= current_time).all()
    
    for issue_book in expired_books:
        issue_book.book.available = True
        issue_book.is_returned = True
    
    db.session.commit()
