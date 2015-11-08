import csv
import operator
import os

path = 'players/2015/logs/'
header = []

open('players/2015/logs/alllogs.csv', 'w').close()

for filename in os.listdir(path):

	if filename != '.DS_Store' and filename != 'alllogs.csv':
		print filename

		with open(path + filename, 'rU') as l:
			data = [row for row in csv.reader(l)]
			header = data[0]
			data = data[1:]

			final_list = []
			for row in data:
				if row[0] != 'Rk':
					final_list.append(row)


		with open('players/2015/logs/alllogs.csv', 'a') as log:
			writer = csv.writer(log)
			writer.writerows(final_list)
			print 'added log'


#Need to add header back
with open('players/2015/logs/alllogs.csv') as f:
    r = csv.reader(f)
    data = [line for line in r]
with open('players/2015/logs/alllogs.csv','w') as f:
    w = csv.writer(f)
    w.writerow(header)
    w.writerows(data)
    print 'added header'


