var mysqlx = require('mysqlx').mysqlx;

function validateMember(memberList, member){
	if (memberList.indexOf(member) != -1){
		print(member + ": OK\n");
	}
	else{
		print(member + ": Missing\n");
	}
}

var  uri = os.getenv('MYSQL_URI');

//@ Session: validating members
var session = mysqlx.getSession(uri);
var sessionMembers = dir(session);

validateMember(sessionMembers, 'close');
validateMember(sessionMembers, 'createSchema');
validateMember(sessionMembers, 'getDefaultSchema');
validateMember(sessionMembers, 'getSchema');
validateMember(sessionMembers, 'getSchemas');
validateMember(sessionMembers, 'getUri');
validateMember(sessionMembers, 'setFetchWarnings');
validateMember(sessionMembers, 'defaultSchema');
validateMember(sessionMembers, 'schemas');
validateMember(sessionMembers, 'uri');

//@ Session: accessing Schemas
var schemas = session.getSchemas();
print(schemas.mysql);
print(schemas.information_schema);

//@ Session: accessing individual schema
var schema;
schema = session.getSchema('mysql');
print(schema.name);
schema = session.getSchema('information_schema');
print(schema.name);

//@ Session: accessing schema through dynamic attributes
print(session.mysql.name)
print(session.information_schema.name)

//@ Session: accessing unexisting schema
schema = session.getSchema('unexisting_schema');

//@ Session: create schema success
var ss; 

try{
	// Ensures the session_schema does not exist
	ss = session.getSchema('session_schema');
	ss.drop();
}
catch(err)
{
}

ss = session.createSchema('session_schema');
print(ss);

//@ Session: create schema failure
var sf = session.createSchema('session_schema');
ss.drop();

//@ Closes the session
session.close();

//@ NodeSession: validating members
var nodeSession = mysqlx.getNodeSession(uri);
var nodeSessionMembers = dir(nodeSession);
validateMember(nodeSessionMembers, 'close');
validateMember(nodeSessionMembers, 'createSchema');
validateMember(nodeSessionMembers, 'getCurrentSchema');
validateMember(nodeSessionMembers, 'getDefaultSchema');
validateMember(nodeSessionMembers, 'getSchema');
validateMember(nodeSessionMembers, 'getSchemas');
validateMember(nodeSessionMembers, 'getUri');
validateMember(nodeSessionMembers, 'setCurrentSchema');
validateMember(nodeSessionMembers, 'setFetchWarnings');
validateMember(nodeSessionMembers, 'sql');
validateMember(nodeSessionMembers, 'defaultSchema');
validateMember(nodeSessionMembers, 'schemas');
validateMember(nodeSessionMembers, 'uri');
validateMember(nodeSessionMembers, 'currentSchema');


//@ NodeSession: accessing Schemas
var schemas = nodeSession.getSchemas();
print(schemas.mysql);
print(schemas.information_schema);

//@ NodeSession: accessing individual schema
var schema;
schema = nodeSession.getSchema('mysql');
print(schema.name);
schema = nodeSession.getSchema('information_schema');
print(schema.name);

//@ NodeSession: accessing schema through dynamic attributes
print(nodeSession.mysql.name)
print(nodeSession.information_schema.name)

//@ NodeSession: accessing unexisting schema
schema = nodeSession.getSchema('unexisting_schema');

//@ NodeSession: current schema validations: nodefault
var dschema;
var cschema;
dschema = nodeSession.getDefaultSchema();
cschema = nodeSession.getCurrentSchema();
print(dschema);
print(cschema);

//@ NodeSession: create schema success
var ss;
try{
	// Ensures the session_schema does not exist
	ss = nodeSession.getSchema('node_session_schema');
	ss.drop();
}
catch(err)
{
}

ss = nodeSession.createSchema('node_session_schema');
print(ss)

//@ NodeSession: create schema failure
var sf = nodeSession.createSchema('node_session_schema');
ss.drop();

//@ Current schema validations: nodefault, mysql
nodeSession.setCurrentSchema('mysql');
dschema = nodeSession.getDefaultSchema();
cschema = nodeSession.getCurrentSchema();
print(dschema);
print(cschema);

//@ NodeSession: current schema validations: nodefault, information_schema
nodeSession.setCurrentSchema('information_schema');
dschema = nodeSession.getDefaultSchema();
cschema = nodeSession.getCurrentSchema();
print(dschema);
print(cschema);

//@ NodeSession: current schema validations: default 
nodeSession.close()
nodeSession = mysqlx.getNodeSession(uri + '/mysql');
dschema = nodeSession.getDefaultSchema();
cschema = nodeSession.getCurrentSchema();
print(dschema);
print(cschema);

//@ NodeSession: current schema validations: default, information_schema
nodeSession.setCurrentSchema('information_schema');
dschema = nodeSession.getDefaultSchema();
cschema = nodeSession.getCurrentSchema();
print(dschema);
print(cschema);

//@ NodeSession: setFetchWarnings(false)
nodeSession.setFetchWarnings(false);
var result = nodeSession.sql('drop database if exists unexisting').execute();
print(result.warningCount);

//@ NodeSession: setFetchWarnings(true)
nodeSession.setFetchWarnings(true);
var result = nodeSession.sql('drop database if exists unexisting').execute();
print(result.warningCount);
print(result.warnings[0].Message);

//@ NodeSession: quoteName no parameters
print(nodeSession.quoteName());

//@ NodeSession: quoteName wrong param type
print(nodeSession.quoteName(5));

//@ NodeSession: quoteName with correct parameters
print(nodeSession.quoteName('sample'));
print(nodeSession.quoteName('sam`ple'));
print(nodeSession.quoteName('`sample`'));
print(nodeSession.quoteName('`sample'));
print(nodeSession.quoteName('sample`'));

//@ Closes the nodeSession
nodeSession.close();