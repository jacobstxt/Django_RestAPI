from django.core.management.base import BaseCommand

from topics import seed_topics


class Command(BaseCommand):
    help = "Заповнює базу даних заготовленими топіками (Topic)."

    def handle(self, *args, **options):
        seed_topics.run()
