import firebase_admin
from firebase_admin import firestore
import threading
from google.cloud.firestore_v1.base_query import FieldFilter

# Application Default credentials are automatically created.
app = firebase_admin.initialize_app()
db = firestore.client()

class Api:
	def __init__(self):
		...


print("logged in fine", db)
doc_ref = db.collection("leaderboards").document("default")
default_collection = doc_ref.collection("leaderboard")
default_collection.document("2").set({"name":"john","score":410,"time":firestore.SERVER_TIMESTAMP})

# Create an Event for notifying main thread.
callback_done = threading.Event()

# Create a callback on_snapshot function to capture changes
def on_snapshot(doc_snapshot, changes, read_time):
    for doc in doc_snapshot:
        print(f"Received document snapshot: {doc.id}")
    callback_done.set()

# Watch the document
doc_watch = doc_ref.on_snapshot(on_snapshot)

query = (
	default_collection
	.order_by('score', direction=firestore.Query.DESCENDING)
	.limit(10)
)

# Create an Event for notifying main thread.
callback_done = threading.Event()

# Create a callback on_snapshot function to capture changes
def on_snapshot(col_snapshot, changes, read_time):
    print("Callback received query snapshot.")
    for doc in col_snapshot:
        print(f"{doc.id}")
    callback_done.set()

# Watch the collection query
query_watch = query.on_snapshot(on_snapshot)
while True:
	...
# print([d.to_dict() for d in docs])