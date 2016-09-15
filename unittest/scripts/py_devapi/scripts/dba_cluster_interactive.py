# Assumptions: ensure_schema_does_not_exist is available
# Assumes __uripwd is defined as <user>:<pwd>@<host>:<plugin_port>
# validateMemer and validateNotMember are defined on the setup script

#@<OUT> Cluster: get_cluster with interaction
cluster = dba.get_cluster('devCluster');

all_members = dir(cluster)

# Remove the python built in members
members = []
for member in all_members:
  if not member.startswith('__'):
    members.append(member)

#@ Cluster: validating members
print "Cluster Members: %d" % len(members)
validateMember(members, 'name');
validateMember(members, 'get_name');
validateMember(members, 'admin_type');
validateMember(members, 'get_admin_type');
validateMember(members, 'add_instance');
validateMember(members, 'remove_instance');
validateMember(members, 'rejoin_instance');
validateMember(members, 'describe');
validateMember(members, 'status');
validateMember(members, 'help');
validateMember(members, 'dissolve');

#@# Cluster: add_instance errors
cluster.add_instance()
cluster.add_instance(5,6,7,1)
cluster.add_instance(5, 5)

#@# Cluster: add_instance errors: missing host interactive, cancel
cluster.add_instance('', 5)

#@# Cluster: add_instance errors 2
cluster.add_instance( 5)

#@# Cluster: add_instance errors: invalid attributes, cancel
cluster.add_instance({'host': 'localhost', 'schema': 'abs', 'user': 'sample', 'authMethod': 56});

#@# Cluster: add_instance errors: missing host interactive, cancel 2
cluster.add_instance({'port': __mysql_sandbox_port1});

#@# Cluster: add_instance with interaction, error
cluster.add_instance({'host': 'localhost', 'port':__mysql_sandbox_port1});

#@<OUT> Cluster: add_instance with interaction, ok
cluster.add_instance({'dbUser': 'root', 'host': 'localhost', 'port': __mysql_sandbox_port2});

#@<OUT> Cluster: describe1
cluster.describe()

#@<OUT> Cluster: status1
cluster.status()

#@# Cluster: remove_instance errors
cluster.remove_instance();
cluster.remove_instance(1,2);
cluster.remove_instance(1);
cluster.remove_instance({'host': 'localhost'});
cluster.remove_instance({'host': 'localhost', 'schema': 'abs', 'user': 'sample', 'authMethod': 56});
cluster.remove_instance("somehost:3306");

#@ Cluster: remove_instance
cluster.remove_instance({'host': 'localhost', 'port': __mysql_sandbox_port2})

#@<OUT> Cluster: describe2
cluster.describe()

#@<OUT> Cluster: status2
cluster.status()

#@<OUT> Cluster: dissolve error: not empty
cluster.dissolve()

#@ Cluster: dissolve errors
cluster.dissolve(1)
cluster.dissolve(1,2)
cluster.dissolve("")
cluster.dissolve({'enforce': True})
cluster.dissolve({'force': 1})

#@ Cluster: remove_instance last
cluster.remove_instance({'host': 'localhost', 'port': __mysql_sandbox_port1})

#@<OUT> Cluster: describe3
cluster.describe()

#@<OUT> Cluster: status3
cluster.status()

#@<OUT> Cluster: add_instance with interaction, ok 2
cluster.add_instance({'dbUser': 'root', 'host': 'localhost', 'port': __mysql_sandbox_port1});

#@<OUT> Cluster: add_instance with interaction, ok 3
cluster.add_instance({'dbUser': 'root', 'host': 'localhost', 'port': __mysql_sandbox_port2});

#@<OUT> Cluster: dissolve
cluster.dissolve({'force': True})

#@ Cluster: describe: dissolved cluster
cluster.describe()

#@ Cluster: status: dissolved cluster
cluster.status()