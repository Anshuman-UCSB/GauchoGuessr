from api import Api

class Game:
	def __init__(self, size = 5):
		self.a = Api()
		self.stages = self.a.getImages(size)
		self.score = 0
		self.stageScores = [None]*size
		self.stageTimes = [None]*size
	def getLink(self, stage):
		return self.stages[stage]['img']
	def calcScore(self, dx, dy, time):
		l2 = (dx**2 + dy**2)**.5 * 111320
		return int(min(max(10000-200*l2**.5, 8000-500*l2**.3),9500) + max(500-time,0))

	def guess(self, time, lat, lon, stage):
		rlat = self.stages[stage]['lat']
		rlon = self.stages[stage]['lon']
		score = self.calcScore(rlat-lat, rlon-lon, time)
		if self.stageScores[stage] == None:
			self.stageScores[stage] = score
		else:
			print("something fishy is going on...")
		self.stageTimes[stage] = time
		self.score=sum([v for v in self.stageScores if v is not None])