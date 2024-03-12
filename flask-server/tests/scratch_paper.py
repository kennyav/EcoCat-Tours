from pymongo import MongoClient

# Create a MongoClient to the running mongod instance
client = MongoClient('mongodb://localhost:27017/')

# Get a list of database names
dbs = client.list_database_names()
print(dbs)

# delete db (proceed with caution)
# client.drop_database('demo_db')

dbs = client.list_database_names()
print(dbs)