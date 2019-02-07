from mongoengine import connect
DB_NAME= 'sk2ui'

def db_connect(db_name=DB_NAME):
    connect(db_name)

__all__ = ['db_connect',]
