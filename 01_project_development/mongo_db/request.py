import pymongo

uri = "mongodb://gengar-dev-db:O2luu6FF0NMuh0Q4aMGVwFEhTCAKsQwUn9g9Fg0K0um70ClMCprnhwm9qvHD6THBvXUjiOtg0eLiunCUslsl8w==@gengar-dev-db.documents.azure.com:10255/?ssl=true&replicaSet=globaldb"
client = pymongo.MongoClient(uri)

database = client[ "ep002" ]
people_collection = database[ "people_collection" ]
#result=people_collection.insert_one({"name" : "Joe Drumgoole"})
print(people_collection.find_one())
