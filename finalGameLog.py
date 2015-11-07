import csv
import operator
import os

path = 'players/2015/'
header = []
for filename in os.listdir(path):

	if filename != '.DS_Store' and filename != 'alllogs.csv':
		print filename

		with open(path + filename, 'rU') as l:
			data = [row for row in csv.reader(l)]
			header = data[0]

			final_list = []
			for row in data:
				if row[0] != 'Rk':
					final_list.append(row)


		with open('players/2015/alllogs.csv', 'a') as log:
			print 'added log'
			writer = csv.writer(log)
			writer.writerows(final_list)


# TODO: write header row to alllogs.csv


