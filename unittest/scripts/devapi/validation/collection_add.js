var tstRes = myColl.find().sort(['name']).execute();||
print(tstRes.next().name);|Mike|
print(tstRes.next().name);|Sakila|
print(tstRes.next().name);|Susanne|
myColl.drop();||