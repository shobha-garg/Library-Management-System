from celery import Celery, Task
from .config import CeleryConfig

def celery_init_app(app):
    class FlaskTask(Task):
        def __call__(self, *args: object, **kwargs: object) -> object:
            with app.app_context():
                return self.run(*args, **kwargs)

    celery_app = Celery(app.name)
    celery_app.config_from_object(CeleryConfig)
    celery_app.Task = FlaskTask
    return celery_app