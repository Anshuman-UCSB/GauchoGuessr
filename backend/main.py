from typing import Union
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from api import Api
from game import Game
import json, typing
import string
from random import choices
from starlette.responses import Response
import ssl


# Run with: uvicorn main:app --reload 
# or just call this file
app = FastAPI()
# ssl_context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
# ssl_context.load_cert_chain('/home/biggergig/.ssl/cert.pem', keyfile='/home/biggergig/.ssl/key.pem')

origins = [
    "*"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)        
        
api = Api()
print("registering api")
api.registerLeaderboard("default")

games = {}

class PrettyJSONResponse(Response):
    media_type = "application/json"

    def render(self, content: typing.Any) -> bytes:
        return json.dumps(
            content,
            ensure_ascii=False,
            allow_nan=False,
            indent=4,
            separators=(", ", ": "),
        ).encode("utf-8")

@app.get("/", status_code=200)
def index(res: Response):
    return "hello"

@app.get("/users", status_code=200, response_class=PrettyJSONResponse)
def getUsers(res: Response):
    return {"users":api.getUsers()}

@app.get("/leaderboard/{leaderboard_name}", status_code=200, response_class=PrettyJSONResponse)
def getLeaderboard(leaderboard_name: str,res: Response):
    return api.getLeaderboard(leaderboard_name)
    # return {i:v for i,v in enumerate(api.getLeaderboard(leaderboard_name))}

@app.post("/leaderboard/{leaderboard_name}", status_code=200, response_class=PrettyJSONResponse)
def setScore(leaderboard_name: str, name:str, score:int,res: Response):
    return api.setScore(leaderboard_name, name, score)

@app.put("/game/", status_code=201, response_class=PrettyJSONResponse)
def createGame(res: Response):
    gameid = "".join(choices(string.ascii_uppercase,k=4))
    while gameid in games:
        print("regenerating duplicate game id",gameid)
        gameid = "".join(choices(string.ascii_uppercase,k=4))
    games[gameid] = Game()
    return {"gameid":gameid}

@app.get("/game/{gameid}/", status_code=200, response_class=PrettyJSONResponse)
def getData(gameid: str, stage:int, res: Response):
    if gameid not in games:
        res.status_code = 404
        return "Game doesn't exist"
    else:
        game = games[gameid]
        return {"link":game.getLink(stage), "scores":game.stageScores, "times":game.stageTimes,"realCoords":{"lat":game.stages[stage]['lat'],"lng":game.stages[stage]['lon']}}

@app.post("/game/{gameid}/", status_code=200, response_class=PrettyJSONResponse)
def guess(gameid: str, time:int, lat:float, lon:float, stage:int, res: Response):
    game = games[gameid]
    game.guess(time, lat, lon, stage)
    return {"scores":game.stageScores, "times":game.stageTimes}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
       "main:app",
       host="0.0.0.0",
       reload=True,
       ssl_certfile="ssl/fullchain.pem",
       ssl_keyfile="ssl/privkey.pem",
       )