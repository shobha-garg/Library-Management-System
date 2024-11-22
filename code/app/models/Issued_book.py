from datetime import datetime as dt
from ..models import db

class IssuedBook(db.Model):
    __tablename__ = 'issued_books'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer, db.ForeignKey('books.id'), nullable=False)
    issue_date = db.Column(db.String, nullable=True)
    return_date = db.Column(db.String, nullable=True)
    request = db.Column(db.Boolean, default=False, nullable=False)
    is_returned = db.Column(db.Boolean, default=False, nullable=False)

    user = db.relationship("User", back_populates="issued_books")
    book = db.relationship("Book", back_populates="issued_books")