# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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


class Grade(models.Model):
    grade = models.IntegerField()
    instructorid = models.OneToOneField('Registrirani', models.DO_NOTHING, db_column='instructorid', primary_key=True)
    learnerid = models.ForeignKey('Registrirani', models.DO_NOTHING, db_column='learnerid')
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
    firstname = models.CharField(max_length=-1)
    lastname = models.CharField(max_length=-1)
    username = models.CharField(unique=True, max_length=-1)
    useravatar = models.CharField(max_length=-1)
    password = models.CharField(max_length=-1)
    email = models.CharField(unique=True, max_length=-1)
    created = models.DateField()

    class Meta:
        managed = False
        db_table = 'registrirani'


class Replies(models.Model):
    replyid = models.AutoField(primary_key=True)
    replytext = models.CharField(max_length=1000)
    replycreated = models.DateField()
    statusvalue = models.CharField(max_length=-1)
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
