from ..utils import db
from datetime import datetime

class Book(db.Model):
    __tablename__ = 'books'
    
    id = db.Column(db.Integer, autoincrement=True, unique=True, primary_key=True, nullable=False)
    title = db.Column(db.String(255), nullable=False)
    author = db.Column(db.String(255), nullable=False)
    date_created = db.Column(db.String, nullable=False)
    available = db.Column(db.Boolean, nullable=False, default=True)
    description = db.Column(db.String(255), nullable=False)
    avg_rating = db.Column(db.String, nullable=True)
    section_id = db.Column(db.Integer, db.ForeignKey('sections.id'))
    doc= db.Column(db.String(255), nullable=False)

    ratings= db.relationship('Rating', backref='book', lazy=True)
    issued_books = db.relationship('IssuedBook', back_populates='book', cascade="all, delete-orphan")