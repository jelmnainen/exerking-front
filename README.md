# exerking-front 
[![Build status](https://travis-ci.org/jelmnainen/exerking-front.svg?branch=master)](https://travis-ci.org/jelmnainen/exerking-front)

An exercise marking system frontend

[Heroku](http://exerking.herokuapp.com/)

[Travis](https://travis-ci.org/jelmnainen/exerking-front)

## Architectural documentation
[archidoc.md](https://github.com/jelmnainen/exerking-front/blob/master/ARCHIDOC.md)

## Testing documentation
[testingdoc.md](https://github.com/jelmnainen/exerking-front/blob/master/TESTINGDOC.md)

## Installation
After cloning, go to folder and run 

    npm install

## Running server
For development, you can just do (this expects a API at localhost:3000 and opens up a server in localhost:8080)

    npm start

For production, do 

    NODE_ENV=production API_URL=insertYourApiUrlHere npm run postinstall
    NODE_ENV=production PORT=insertPortHere npm start
