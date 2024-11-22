from flask_security import SQLAlchemyUserDatastore
from ..models import User, Role
from ..utils import db

datastore = SQLAlchemyUserDatastore(db, User, Role)