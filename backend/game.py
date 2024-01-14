from api import Api

class Game:
	def __init__(self, size = 5):
		self.a = Api()
		self.stages = self.a.getImages(size)
		self.score = 0
		self.stageScores = [None]*size
	def getLink(self, stage):
		return self.stages[stage]['img']
	def guess(self, time, lat, lon, stage):
		stage = self.stages[stage]
		print(stage)
		self.stageScores[stage] = 1
		self.score=sum(self.stageScores)