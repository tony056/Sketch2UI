from mongoengine import connect
DB_NAME= 'sk2ui'

def db_connect(db_name=DB_NAME):
    print('connecting-------')
    connect(db_name)
    print('connection established---------')

__all__ = ['db_connect',]
