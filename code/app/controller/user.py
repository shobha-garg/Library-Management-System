from ..models import User
from ..models import db

def createUser(data={}):
    try:
        new_user = User(
            name=data['name'], 
            email=data['email'], 
            password=data['password'], 
            active=data['active'],
            role=data['role']
        )
        db.session.add(new_user)
    except:
        db.session.rollback()
        raise Exception('DB error.')
    else:
        db.session.commit()
        return new_user

def deleteUser(id=''):
    User.query.filter_by(id=id).delete()
    db.session.commit()
    return True

def editUser(data={}):
    try:
        user = getUser(id=data['id'])
        del data['id']
        for key in data:
            setattr(user, key, data[key])
    except:
        db.session.rollback()
        raise Exception('DB error.')
    else:
        db.session.commit()
        return True

def getAllUsers():
    return db.session.query(User).all()

def getUser(uid='', email=''):
    user = db.session.query(User).filter((User.id == uid) | (User.email == email)).first()
    return user

def edit_profile(user):
    db.session.commit()