from flask import Flask , render_template
from flask_security import Security
from app.utils import FlaskConfigg as Config, db, celery_init_app, datastore, make_db
from celery.schedules import crontab
from app.services import daily_reminder, monthly_reminder
from app.utils import cache

app= Flask(__name__)

Config.DEBUG = True

app.config.from_object(Config)
app.security = Security(app, datastore)
db.init_app(app)
cache.init_app(app)
app.app_context().push()
celery_app = celery_init_app(app)

from app.views import *

@celery_app.on_after_configure.connect
def send_webhook_message(sender, **kwargs):
    sender.add_periodic_task(
        crontab(hour= 17,  minute=33),
        daily_reminder.s(),
    )
    sender.add_periodic_task(
        crontab(day_of_month=12, hour=17, minute= 33),
        monthly_reminder.s(),
    )

if __name__ == '__main__':
    make_db(app, datastore)
    app.run()
    
    # sudo service redis-server start
    # celery -A celery worker --loglevel=info
