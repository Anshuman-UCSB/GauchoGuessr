from typing import Union
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from api import Api
import json, typing
from starlette.responses import Response

# Run with: uvicorn main:app --reload 
# or just call this file
app = FastAPI()

api = Api()
print("registering api")
api.registerLeaderboard("default")

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

@app.get("/leaderboard/{leaderboard_name}", status_code=200, response_class=PrettyJSONResponse)
def getLeaderboard(leaderboard_name: str):
    return api.getLeaderboard(leaderboard_name)
    # return {i:v for i,v in enumerate(api.getLeaderboard(leaderboard_name))}
@app.post("/leaderboard/{leaderboard_name}", status_code=200, response_class=PrettyJSONResponse)
def setScore(leaderboard_name: str, name:str, score:int):
    api.setScore(leaderboard_name, name, score)
    return {i:v for i,v in enumerate(api.getLeaderboard(leaderboard_name))}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", reload=True)