# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class Category(models.Model):
    idkategorije = models.AutoField(primary_key=True)
    categoryname = models.CharField(max_length=100)
    courseid = models.ForeignKey('Course', models.DO_NOTHING, db_column='courseid')

    class Meta:
        managed = False
        db_table = 'category'


class Course(models.Model):
    courseid = models.AutoField(primary_key=True)
    coursename = models.CharField(max_length=100)
    kraticacourse = models.CharField(max_length=100)
    programmeid = models.ForeignKey('StudyProgramme', models.DO_NOTHING, db_column='programmeid')

    class Meta:
        managed = False
        db_table = 'course'


class Deletedoglas(models.Model):
    explanation = models.CharField(max_length=1000)
    deletoruserid = models.ForeignKey('Moderator', models.DO_NOTHING, db_column='deletoruserid')
    oglasid = models.OneToOneField('Oglas', models.DO_NOTHING, db_column='oglasid', primary_key=True)

    class Meta:
        managed = False
        db_table = 'deletedoglas'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Grade(models.Model):
    grade = models.IntegerField()
    instructorid = models.OneToOneField('Registrirani', models.DO_NOTHING, db_column='instructorid', primary_key=True)
    learnerid = models.ForeignKey('Registrirani', models.DO_NOTHING, db_column='learnerid', related_name='learner')
    oglasid = models.ForeignKey('Oglas', models.DO_NOTHING, db_column='oglasid')

    class Meta:
        managed = False
        db_table = 'grade'
        unique_together = (('instructorid', 'learnerid', 'oglasid'),)


class Moderator(models.Model):
    userid = models.OneToOneField('Registrirani', models.DO_NOTHING, db_column='userid', primary_key=True)

    class Meta:
        managed = False
        db_table = 'moderator'


class Oglas(models.Model):
    oglasid = models.AutoField(primary_key=True)
    oglastitle = models.CharField(max_length=100)
    oglasdescription = models.CharField(max_length=100)
    dateofcreation = models.DateField()
    vrstaoglasa = models.CharField(max_length=100)
    creatoruserid = models.ForeignKey('Registrirani', models.DO_NOTHING, db_column='creatoruserid')
    idkategorije = models.ForeignKey(Category, models.DO_NOTHING, db_column='idkategorije')

    class Meta:
        managed = False
        db_table = 'oglas'


class Registrirani(models.Model):
    userid = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=100)
    lastname = models.CharField(max_length=100)
    username = models.CharField(unique=True, max_length=100)
    useravatar = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    email = models.CharField(unique=True, max_length=100)
    created = models.DateField()

    class Meta:
        managed = False
        db_table = 'registrirani'


class Replies(models.Model):
    replyid = models.AutoField(primary_key=True)
    replytext = models.CharField(max_length=1000)
    replycreated = models.DateField()
    statusvalue = models.CharField(max_length=100)
    replycreatorid = models.ForeignKey(Registrirani, models.DO_NOTHING, db_column='replycreatorid')
    oglasid = models.ForeignKey(Oglas, models.DO_NOTHING, db_column='oglasid')

    class Meta:
        managed = False
        db_table = 'replies'


class StudyProgramme(models.Model):
    programmeid = models.AutoField(primary_key=True)
    programename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'study_programme'
