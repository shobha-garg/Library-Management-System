from datetime import datetime as dt
from ...controller import getIssuedBooks, getBooks
from jinja2 import Template
import os
from tempfile import TemporaryFile
from csv import DictWriter
import io

basedir = os.path.abspath(os.path.dirname(__file__))

def generate_librarian_monthly_report():
    current_month = dt.now().month
    current_year = dt.now().year
    
    issued_books = getIssuedBooks()
    i_ = []
    for book in issued_books: 
        issue_date = dt.fromisoformat(book.issue_date)
        issue_month = issue_date.month
        issue_year = issue_date.year
        if issue_month == current_month and issue_year == current_year:
            i_.append(book)

    f = open(os.path.join(basedir, "_templates/activity.html"), 'r') 
    template = Template(f.read())

    return template.render(issued_books=i_, month=current_month, year=current_year)

def draft_monthly_report_email( pdf_base64):
    f= open(os.path.join(basedir, "_templates/monthly_report.html"), 'r') 
    template = Template(f.read())
    return template.render(pdf=pdf_base64)

def generate_admin_csv():
    books = getBooks() 

    f = io.StringIO()

    headers = [
        'title', 'author', 'description', 'avg_rating',
        'available', 'date_created', 'doc'
    ]

    writer = DictWriter(f, headers)
    writer.writeheader()

    for book in books:
        writer.writerow({
            'title': book.title,
            'author': book.author,
            'description': book.description,
            'avg_rating': book.avg_rating,
            'available': book.available,
            'date_created': book.date_created,
            'doc': book.doc
        })

    mem = io.BytesIO()
    mem.write(f.getvalue().encode())
    mem.seek(0)
    f.close()

    return mem
