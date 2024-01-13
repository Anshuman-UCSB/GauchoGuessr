import firebase_admin
from random import sample
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
		print("logged in fine")
		self.db = firestore.client()
		self.data = {}
		# self.leaderboards = list(self.db.collection("leaderboards").stream())
		self.leaderboards = ["default","blitz"]
		for l in self.leaderboards:
			self.registerLeaderboard(l)
		print("loaded leaderboards")

		self.images = {}
		for cat in ('street',):
			self.images[cat]=[v.to_dict() for v in self.db.collection("images").document("categories").collection(cat).stream()]
		print("loaded images")

	def registerLeaderboard(self, name):
		if name not in self.leaderboards:
			print("Invalid leaderboard",name)
			return False
		if name in self.data:
			print("Already registered",name)
			return True
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
		if leaderboard in self.data or self.registerLeaderboard(name):
			lb_col = self.db.collection("leaderboards").document(leaderboard).collection("leaderboard")
			lb_col.add({"name":name, "score":score, "time":firestore.SERVER_TIMESTAMP})
			return "success"
		else:
			return "error: invalid leaderboard"

	def storeImage(self, imgur, lat, lon, category):
		cat_col = self.db.collection("images").document("categories").collection(category)
		cat_col.add({"img":imgur, "lat":lat, "lon":lon})

	def incrementUsers(self):
		stats = self.db.collection("stats").document("users")
		n = stats.get().to_dict()['number']
		stats.set({"number":n+1})
	
	def getUsers(self):
		stats = self.db.collection("stats").document("users")
		n = stats.get().to_dict()['number']
		return n
	
	def getImages(self, n, categories=None):
		categories = categories or self.images.keys()
		images = []
		for cat in categories:
			images.extend(self.images[cat])
		return sample(images, n)
		


if __name__=="__main__":
	a = Api()
	# a.storeImage("https://imgur.com/IzcTUg8", 34.4097920, -119.8540924, "street")
	# a.storeImage("https://imgur.com/VDQIARh",34.4101267, -119.8544833, "street")
	# a.incrementUsers()
	print(a.getImages(2))