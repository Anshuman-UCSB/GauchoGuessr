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
	def guess(self, time, lat, lon, stage):
		rlat = self.stages[stage]['lat']
		rlon = self.stages[stage]['lon']
		print(self.stages[stage])
		self.stageScores[stage] = 1
		self.stageTimes[stage] = time
		self.score=sum([v for v in self.stageScores if v is not None])