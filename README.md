## Data Science NBA Daily Fantasy Sports

Project by Sebastian Soler (http://the212.co)

## Data Proceedure

#### Scraping
* define 'letter' var in bball-ref.js
* run casperjs bball-ref.js (scrapes all 'letter' players and game logs for 2015 NBA season)

-------------------------

* define 'letter' var in bball-ref-ad.js
* run casperjs bball-ref-ad.js (scrapes all 'letter' players and advanced game logs for 2015 NBA season)


#### Data Clean/Concat
* define 'letter' var in cleanGameLogs.py
* run python cleanGameLogs.py
  * (cleans all gamelogs per 'letter' player and outputs single csv with cleaned game logs of all 'letter' players)

-------------------------

* run python finalGameLogs.py
  * (concats all player 'letter' gamelogs into single, clean alllogs file)

-------------------------

* define 'letter' var in mapNames.py
* run python mapNames.py
  * (might have to check for duplicate pnames caused by same purl (01, 02))

-------------------------

* run python finalNames.py
  * (concats all player 'letter' names into single, clean allnames file)


#### Pandas
* run gameLogs.ipynb (iPython notebook)

## TO-DO

* Incorporate Advanced Game Log (per player, start with casperjs... download both gamelog and advancedGameLog from player page.. join on pname?)

* Handle 2016 data (has extra DFS column, that 2015 and below doesn't have... DFS = DraftKings Points)

* Handle timeouts during player log scraping (currently skipping...)

* Automate 'letter' changes (a-z in single script run)

* package.json for dev dependencies


