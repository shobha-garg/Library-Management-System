from ..models import Rating
from ..utils import db
from sqlalchemy.sql import func

def createRating(data={}):
    try:
        new_Rating = Rating(
            rating=data['rating'], 
            user_id=data['user_id'], 
            book_id=data['book_id'], 
            comment=data['comment']
        )
        db.session.add(new_Rating)
    except:
        db.session.rollback()
        raise Exception('DB error.')
    else:
        db.session.commit()
        return new_Rating
    
def deleteRating(id=''):
    Rating.query.filter_by(id=id).delete()
    db.session.commit()
    return True

def editRating(data={}):
    try:
        rating = getRating(id=data['id'])
        del data['id']
        for key, value in data.items():
            setattr(rating, key, value)
        db.session.add(rating)
    except:
        db.session.rollback()
        raise Exception('DB error.')
    else:
        db.session.commit()
        return True
    
def getAllRatings():
    return db.session.query(Rating).all()

def getRating(id=''):
    rating = db.session.query(Rating).filter((Rating.id == id)).first()
    return rating

def getAvgRating(book_id=''):
    return db.session.query(func.avg(Rating.rating).label('avg_rating')).filter((Rating.book_id == book_id)).first()

def getUserRating(user_id='', book_id=''):
    return db.session.query(Rating).filter((Rating.user_id == user_id) & (Rating.book_id == book_id)).first()
