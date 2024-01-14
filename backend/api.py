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
		for cat in ("all_jpeg",):
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
		latlons = []
		for c,t in self.images.items():
			latlons.extend([(v['lat'],v['lon']) for v in t])
		# print(len(latlons))
		if (lat,lon) in latlons:
			print("already exists")
			return
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
		# print(categories)
		images = []
		for cat in categories:
			images.extend(self.images[cat])
		return sample(images, n)
		


if __name__=="__main__":
	a = Api()
	# a.storeImage("https://imgur.com/IzcTUg8", 34.4097920, -119.8540924, "street")
	# a.storeImage("https://imgur.com/VDQIARh",34.4101267, -119.8544833, "street")
	# a.storeImage("https://imgur.com/xdPyAmu",34.4122311, -119.8574505, "store")
	# a.storeImage("https://imgur.com/UDY4o3P",34.4107781, -119.8569044,  "street")
	# a.incrementUsers()
	# print(a.getImages(2))
	raw="""
34.4101267, -119.8544833 ,		https://imgur.com/wK19FIx
34.4097920, -119.8540924 ,		https://imgur.com/eZm8cdn
34.4107781, -119.8569044 ,		https://imgur.com/IYOzls4
34.4110129, -119.8570717 ,		https://imgur.com/Mbvt7yt
34.4113974, -119.8573365 ,		https://imgur.com/6Kb7uri
34.4122311, -119.8574505 ,		https://imgur.com/9Dd1yOr
34.4122692, -119.8576882 ,		https://imgur.com/X2L9Ulm
34.4127682, -119.8577412 ,		https://imgur.com/dw688n4
34.4127334, -119.8573245 ,		https://imgur.com/tNAzDwd
34.4128501, -119.8572440 ,		https://imgur.com/AyfDK9G
34.4106763, -119.8559498 ,		https://imgur.com/ypERJeU
34.4131242, -119.8532619 ,		https://imgur.com/Gf4lcXo
34.4123782, -119.8510971 ,		https://imgur.com/ias35mm
34.4119481, -119.8510883 ,		https://imgur.com/Q0Mczvo
34.4112367, -119.8500091 ,		https://imgur.com/qTgqXFi
34.4116997, -119.8486888 ,		https://imgur.com/zbHrWBo
34.4095889, -119.8475971 ,		https://imgur.com/7RRBrdy
34.4089740, -119.8460297 ,		https://imgur.com/s584ntF
34.4092542, -119.8450842 ,		https://imgur.com/BYJgnNW
34.4100487, -119.8444593 ,		https://imgur.com/TPs9qZU
34.4104279, -119.8431339 ,		https://imgur.com/bk9fsbv
34.4120460, -119.8419826 ,		https://imgur.com/zrDVZ3P
34.4135325, -119.8413502 ,		https://imgur.com/RkSG7OJ
34.4136326, -119.8411554 ,		https://imgur.com/ozF9whK
34.4136019, -119.8421318 ,		https://imgur.com/Y51yOzx
34.4148640, -119.8427182 ,		https://imgur.com/pQnJd52
34.4148554, -119.8446748 ,		https://imgur.com/OAJE8fX
34.4155784,	-119.8450899 ,	https://imgur.com/1bGQa0V
34.4140583,	-119.846263	 ,https://imgur.com/nWNeHs4
34.4134049,	-119.8456378 ,	https://imgur.com/0crLEqe
34.4135383,	-119.8455207 ,	https://imgur.com/w3MXjNw
34.4125218,	-119.8478378 ,	https://imgur.com/tfHh8Nb
34.4116906,	-119.8470013 ,	https://imgur.com/kxSonVU
34.4114203,	-119.8473534 ,	https://imgur.com/DXlS24D
34.4128692,	-119.8499447 ,	https://imgur.com/IQvZv3O
34.4111114,	-119.8538319 ,	https://imgur.com/LX3Kqyn
	"""
	for l in raw.strip().splitlines():
		lat,lon,link = map(lambda x: x.strip(), l.split(','))
		link+='.jpeg'
		link=link.replace('//img','//i.img')
		print(lat, lon, link)
		a.storeImage(link,float(lat), float(lon), "all_jpeg")