from typing import Union
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware

# Run with: uvicorn main:app --reload 
# or just call this file
app = FastAPI()

@app.get("/", status_code=200)
def index(res: Response):
    return "hello"

@app.post("/post", status_code=200)
def post(res: Response):
    

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", reload=True)