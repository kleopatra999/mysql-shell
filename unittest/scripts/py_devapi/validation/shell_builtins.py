#@# Testing require failures
||Module fail_wont_compile was not found
||my_object is not defined
||Module fail_empty is empty

#@ Testing require success
|Defined Members: 1|
|module imported ok|
|undefined|
|This is here because of JS|


#@# Shell registry add errors
||ArgumentError: Invalid number of arguments in ShellRegistry.add, expected 2 to 3 but got 0
||ArgumentError: ShellRegistry.add: Argument #1 expected to be a string
||ArgumentError: ShellRegistry.add: Argument #2 expected to be either a URI or a connection data map
||ArgumentError: ShellRegistry.add: The app name 'my sample' is not a valid identifier
||ArgumentError: ShellRegistry.add: The connection option host is mandatory
||ArgumentError: ShellRegistry.add: The connection option dbUser is mandatory
||ArgumentError: ShellRegistry.add: Argument #3 expected to be boolean


#@ Adding entry to the shell registry
|Added: True|
|Host: samplehost|
|Port: 44000|
|User: root|
|Password: pwd|
|Schema: sakila|


#@ Attempt to override connection without override
||ArgumentError: ShellRegistry.add: The app name 'my_sample' already exists

#@ Attempt to override connection with override=False
||ArgumentError: ShellRegistry.add: The app name 'my_sample' already exists

#@ Attempt to override connection with override=True
|Added: True|
|Host: localhost|
|User: admin|

#@# Shell registry update errors
||ArgumentError: Invalid number of arguments in ShellRegistry.update, expected 2 but got 0
||ArgumentError: ShellRegistry.update: Argument #1 expected to be a string
||ArgumentError: ShellRegistry.update: Argument #2 expected to be either a URI or a connection data map
||ArgumentError: ShellRegistry.update: The app name 'my sample' does not exist
||ArgumentError: ShellRegistry.update: The connection option host is mandatory
||ArgumentError: ShellRegistry.update: The connection option dbUser is mandatory

#@ Updates a connection
|Updated: True|
|User: guest|

#@# Shell registry remove errors
||ArgumentError: Invalid number of arguments in ShellRegistry.remove, expected 1 but got 0
||ArgumentError: ShellRegistry.remove: Argument #1 expected to be a string
||ArgumentError: ShellRegistry.remove: The app name 'my sample' does not exist

#@ Remove connection
|Removed: True|
