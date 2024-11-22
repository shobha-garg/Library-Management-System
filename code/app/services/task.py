from celery import shared_task
import json
from httplib2 import Http
from ..controller import getUserIssuedBooks, getAllUsers, getBook
from ..utils import datastore, send_mail
from .reports import generate_librarian_monthly_report, draft_monthly_report_email
from weasyprint import HTML
from base64 import b64encode

@shared_task(ignore_result=True)
def daily_reminder():
    for user in getAllUsers():
        if len(user.issued_books) > 0:
            for book in user.issued_books:
                if not book.is_returned:
                    book_name= getBook(id= book.book_id).title
                    return_date= book.return_date

                    webhook_url = "https://chat.googleapis.com/v1/spaces/AAAAQFAcx14/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=r1-MWK6edBbPiyoAi58gteq8ZMngG-ciKOD0O9NHrjQ"

                    card_message = {
                        "cards": [
                            {
                                "header": {
                                    "title": "",
                                },
                                "sections": [
                                    {
                                        "widgets": [
                                            {
                                                "textParagraph": {
                                                    "text": f"<b><font color=\"#008080\">Dear {user.name},</font></b>"
                                                }
                                            },
                                            {
                                                "textParagraph": {
                                                    "text": f"Just a friendly reminder to return '{book_name}' by {return_date}. Thank you!"
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            
                        ]
                    }

                    message_headers = {"Content-Type": "application/json; charset=UTF-8"}

                    http_obj = Http()

                    response = http_obj.request(
                        uri=webhook_url,
                        method="POST",
                        headers=message_headers,
                        body=json.dumps(card_message),
                    )

                    if response[0].status == 200:
                        return "OK"
                    
                    return "No pending requests."

@shared_task(ignore_result=True)
def monthly_reminder():

    r = generate_librarian_monthly_report()
    pdf = HTML(string=r).write_pdf()
    encoded = f"data:application/pdf;base64,{b64encode(pdf).decode('utf-8')}"

    email_content = draft_monthly_report_email(encoded)

    send_mail("admin@admin.com", f"Monthly Activity Report | Librarian", email_content, pdf)

    return "done"