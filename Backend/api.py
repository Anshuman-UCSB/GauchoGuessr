import firebase_admin
from firebase_admin import firestore
import threading
from google.cloud.firestore_v1.base_query import FieldFilter
import time
# Application Default credentials are automatically created.

class Api:
	def __init__(self):
		try:
			firebase_admin.get_app()
		except ValueError:
			firebase_admin.initialize_app()
		self.db = firestore.client()
		self.data = {}
		print("logged in fine")

	def registerLeaderboard(self, name):
		if name not in ("default",):
			print("Invalid leaderboard",name)
			return False
		if name in self.data:
			print("Already registered",name)
			return False
		doc_ref = self.db.collection("leaderboards").document(name)
		lb_col = doc_ref.collection("leaderboard")

		# default_collection.document("2").set({"name":"john","score":410,"time":firestore.SERVER_TIMESTAMP})
		query = (
			lb_col
			.order_by('score', direction=firestore.Query.DESCENDING)
			.limit(10)
		)

		def on_snapshot(col_snapshot, changes, read_time):
			print("Callback received query snapshot.")
			self.data[name]=[v.to_dict() for v in col_snapshot]
			self.data[name].sort(key=lambda x: -x['score'])
			callback_done.set()

		callback_done = threading.Event()
		query_watch = query.on_snapshot(on_snapshot)
		callback_done.wait()
		return True

	def getLeaderboard(self, name):
		if name not in self.data and self.registerLeaderboard(name) == False:
			raise Exception("Trying to read from bad leaderboard "+name)
			return None
		return self.data[name]
	
	def setScore(self, leaderboard, name, score):
		lb_col = self.db.collection("leaderboards").document(name).collection("leaderboard")
		lb_col.add({"name":name, "score":score, "time":firestore.SERVER_TIMESTAMP})
if __name__=="__main__":
	a = Api()
	print(a.getLeaderboard("default"))