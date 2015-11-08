## Read Me

Project by Sebastian Soler (http://the212.co)

## Data Proceedure

* define 'letter' var in bball-ref.js
* run casperjs bball-ref.js (scrapes all players and game logs for 2015 NBA season)

* define 'letter' var in cleanGameLogs.py
* create 'players/' + letter + '/2015/gamelogs.csv' file (TODO: fix to auto create file)
* run python cleanGameLogs.py (cleans all gamelogs per 'letter' player and outputs single csv with cleaned game logs of all 'letter' players)

* empty 'players/2015/logs/alllogs.csv'
* run python finalGameLogs.py
* manually add gamelog header as 1st row of alllogs.csv (TODO: add header with script)

* define 'letter' var in mapNames.py
* run python mapNames.py

* empty 'players/2015/names/allnames.csv'
* run python finalNames.py
* manually add names header as 1st row of allnames.csv (TODO: add header with script)


## TO-DO

* handle timeouts during player log scraping (currently skipping...)

* automate 'letter' changes (a-z in single script run)


