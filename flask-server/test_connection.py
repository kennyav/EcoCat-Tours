from pymongo import MongoClient

# Create a MongoClient to the running mongod instance
client = MongoClient('mongodb://localhost:27017/')

# Get a reference to a database
db = client['test_database']

# Get a reference to a collection
collection = db['test_collection']

# Create a new document
document = {"name": "John", "age": 30, "city": "New York"}

# Insert the document into the collection
insert_result = collection.insert_one(document)

# Print the ID of the new document
print(insert_result.inserted_id)

# List all databases
print(client.list_database_names())

# show name in example document
print(document['name'])
