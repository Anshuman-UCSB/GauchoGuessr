from api import Api

class Game:
	def __init__(self, size = 2):
		self.a = Api()
		self.stages = self.a.getImages(size)
	def getLink(self, stage):
		return self.stages[stage]['img']