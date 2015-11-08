import csv
import operator
import os

names = []
letter = 'd'
path = 'players/' + letter + '/'
for filename in os.listdir(path):

	if filename != '.DS_Store' and filename != '2015' and filename != 'names.csv':
		#print filename
		names.append(filename)


#print names

with open(path + 'names.csv', 'rU') as n:
	data = [row for row in csv.reader(n)]
	name_list = []

	csvComment = data[0]
	header = data[1]
	header.append('pname')
	data = data[2:]

	for row in data:
		#print row[0]

		if row[2] == '2015' or row[2] == '2016':

			fname = row[0].lower().split(' ')[0]
			lname = row[0].lower().split(' ')[1]

			purl = lname[:5] + fname[:2]

			for i, name in enumerate(names):
				if purl in name:
					print purl
					row.append(names[i])
					name_list.append(row)


	name_list.insert(0, header)

	#print name_list


with open('players/2015/names' + letter + '.csv', 'wb') as log:
	print 'final write'
	writer = csv.writer(log)
	writer.writerows(name_list)
		