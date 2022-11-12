from django.contrib import admin
from .models import Oglas, Moderator, Registrirani
from .models import *

admin.site.register(Oglas)
admin.site.register(Moderator)
admin.site.register(Registrirani)
admin.site.register(Replies)
admin.site.register(StudyProgramme)
admin.site.register(Grade)
admin.site.register(Deletedoglas)
admin.site.register(Course)
admin.site.register(Category)
