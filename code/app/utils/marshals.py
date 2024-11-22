from flask_restful import fields, marshal

UserMarshalFields = {
    "id": fields.Integer,
    "name": fields.String,
    "email": fields.String,
    "role": fields.String(attribute=lambda x: x.roles[0].name),
    "active": fields.Boolean,
    "restricted": fields.Boolean
}

RoleMarshalFields = {
    "id": fields.Integer,
    "name": fields.String,
}

SectionMarshalFields = {
    "id": fields.Integer,
    "name": fields.String,
    "description": fields.String,
    'date_created': fields.String,
    "active": fields.Boolean,
    "isRequest": fields.Boolean,
}

BookMarshalFields = {
    "id": fields.Integer,
    "title": fields.String,
    "author": fields.String,
    "date_created": fields.String,
    "available": fields.Boolean,
    "doc": fields.String,
    "description": fields.String,
    "section_id": fields.Integer,
    "avg_rating": fields.Float,
    "user_id": fields.Integer,
    "section": fields.Nested(SectionMarshalFields)
}

RatingMarshalFields = {
    "id": fields.Integer,
    "rating": fields.Integer,
    "book_id": fields.Integer,
    "user_id": fields.Integer,
    "comment": fields.String,
    "book": fields.Nested(BookMarshalFields),
}

RequestMarshalFields = {
    "id": fields.Integer,
    "book_id": fields.Integer,
    "user_id": fields.Integer,
    "date_requested": fields.Integer,
    "status": fields.String
}

IssuedBookMarshalFields = {
    "id": fields.Integer,
    "user_id": fields.Integer,
    "book_id": fields.Integer,
    "issue_date": fields.String,
    "return_date": fields.String,
    "is_returned": fields.Boolean,
    "request": fields.Boolean,
    "book": fields.Nested(BookMarshalFields),
    "user":fields.Nested(UserMarshalFields)
}
    
def marshal_user(user):
    return marshal(user, UserMarshalFields)

def marshal_role(role):
    return marshal(role, RoleMarshalFields)

def marshal_section(section):
    return marshal(section, SectionMarshalFields)

def marshal_book(book):
    return marshal(book, BookMarshalFields)

def marshal_rating(rating):
    return marshal(rating, RatingMarshalFields)

def marshal_request(request):
    return marshal(request, RequestMarshalFields)

def marshal_issued_book(issued_book):
    return marshal(issued_book, IssuedBookMarshalFields)