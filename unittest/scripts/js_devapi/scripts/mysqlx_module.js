var mysqlx = require('mysqlx');

// The tests assume the next variables have been put in place
// on the JS Context
// __uri: <user>@<host>
// __host: <host>
// __port: <port>
// __user: <user>
// __uripwd: <uri>:<pwd>@<host>
// __pwd: <pwd>


//@ mysqlx module: exports
var exports = dir(mysqlx);
print('Exported Items:', exports.length);

print('getNodeSession:', typeof mysqlx.getNodeSession, '\n');
print('expr:', typeof mysqlx.expr, '\n');
print('dateValue:', typeof mysqlx.dateValue, '\n');
print('help:', typeof mysqlx.dateValue, '\n');
print('Type:', mysqlx.Type, '\n');
print('IndexType:', mysqlx.IndexType, '\n');


//@ mysqlx module: getNodeSession through URI
mySession = mysqlx.getNodeSession(__uripwd);

print(mySession, '\n');

if (mySession.uri == __displayuri)
	print('Session using right URI\n');
else
	print('Session using wrong URI\n');

mySession.close();

//@ mysqlx module: getNodeSession through URI and password
mySession = mysqlx.getNodeSession(__uri, __pwd);

print(mySession, '\n');

if (mySession.uri == __displayuri)
	print('Session using right URI\n');
else
	print('Session using wrong URI\n');

mySession.close();


//@ mysqlx module: getNodeSession through data
var data = { host: __host,
						 port: __port,
						 schema: __schema,
						 dbUser: __user,
						 dbPassword: __pwd };


mySession = mysqlx.getNodeSession(data);

print(mySession, '\n');

if (mySession.uri == __displayuridb)
	print('Session using right URI\n');
else
	print('Session using wrong URI\n');

mySession.close();

//@ mysqlx module: getNodeSession through data and password
var data = { host: __host,
						 port: __port,
						 schema: __schema,
						 dbUser: __user};


mySession = mysqlx.getNodeSession(data, __pwd);

print(mySession, '\n');

if (mySession.uri == __displayuridb)
	print('Session using right URI\n');
else
	print('Session using wrong URI\n');

mySession.close();

//@# mysqlx module: expression errors
var expr;
expr = mysqlx.expr();
expr = mysqlx.expr(5);

//@ mysqlx module: expression
expr = mysqlx.expr('5+6');
print(expr);
