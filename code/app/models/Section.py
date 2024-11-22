from ..utils import db

class Section(db.Model):
    __tablename__ = 'sections'
    id = db.Column(db.Integer, autoincrement=True, unique=True, primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False, unique= True)
    description = db.Column(db.String(255), nullable=False)
    date_created = db.Column(db.String, nullable=False)
    active = db.Column(db.Boolean, nullable=False) 
    isRequest = db.Column(db.Boolean(), nullable=False)
    
    books = db.relationship('Book', backref="section", lazy=True)