from ..utils import db 

class Rating(db.Model):
    __tablename__ = 'ratings'
    
    id = db.Column(db.Integer, autoincrement=True, unique=True, primary_key=True, nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer(), db.ForeignKey('users.id'), nullable=False)
    book_id = db.Column(db.Integer(), db.ForeignKey('books.id'), nullable= False)
    comment = db.Column(db.String(255), nullable=False)
    
    