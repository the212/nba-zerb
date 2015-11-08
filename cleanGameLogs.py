import csv
import operator
import os

letter = 'e'
path = 'players/' + letter + '/'
for dirname in os.listdir(path):

	if dirname != '.DS_Store' and dirname != '2015':

		plink = path + dirname + '/gamelog/2015/gamelog.csv'
		pname = plink.split('/')[2]
		data = []
		
		try:
			f = open(plink, 'rU')
		except IOError:
			print('error')
		else:
			with f:
				data = [row for row in csv.reader(f)]
				#get rid of <!-- Already CSV --> comment in data
				csvComment = data[0]
				header = data[1]
				header.append('pname')
				data = data[2:]

				new_list = []
				for row in data:
					if row[0] != 'Rk' and row[10] != 'Did Not Play' and row[10] != 'Inactive' and row[10] != 'Player Suspended':
						row.append(pname)
						new_list.append(row)

				new_list.insert(0, header)

				#print new_list


		with open('players/' + letter + '/2015/gamelogs.csv', 'a') as w:
			print 'writing!'
			writer = csv.writer(w)
			writer.writerows(new_list)


logs = 'players/' + letter + '/2015/gamelogs.csv'

with open(logs, 'rU') as l:
	data = [row for row in csv.reader(l)]
	header = data[0]
	data = data[1:]

	final_list = []
	for row in data:
		if row[0] != 'Rk':
			final_list.append(row)

	final_list.insert(0, header)
	#print final_list


with open('players/2015/logs/gamelogs' + letter + '.csv', 'wb') as log:
	print 'final write'
	writer = csv.writer(log)
	writer.writerows(final_list)
