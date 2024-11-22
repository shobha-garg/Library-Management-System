from ..models import Section
from ..utils import db
from datetime import datetime as dt

def createSection(data={}):
    try:
        new_section = Section(
            name=data['name'], 
            description=data['description'],
            date_created=dt.isoformat(dt.now()),
            active= data['active'],
            isRequest= data['isRequest']
        )
        db.session.add(new_section)
    except:
        db.session.rollback()
        raise Exception('DB error.')
    else:
        db.session.commit()
        return new_section

def deleteSection(id=''):
    Section.query.filter_by(id=id).delete()
    db.session.commit()
    return True

def editSection(data={}):
    try:
        section = getSection(id=data['id'])
        del data['id']
        for key in data:
            setattr(section, key, data[key])
    except:
        db.session.rollback()
        raise Exception('DB error.')
    else:
        db.session.commit()
        return True

def getAllSections():
    return db.session.query(Section).all()

def getActiveSections():
    return db.session.query(Section).filter(Section.active == 1).all()

def getRequestedSections():
    return db.session.query(Section).filter(Section.isRequest == 1).all()

def getSection( id=''):
    section = db.session.query(Section).filter((Section.id == id)).first()
    return section

def section_by_name(name=''):
    section = db.session.query(Section).filter((Section.name.ilike(f'%{name}%'))).first()
    return section