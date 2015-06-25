xunit:
	@# check if reports folder exists, if not create it
	@test -d reports || mkdir reports
	XUNIT_FILE="reports/TESTS-xunit.xml" $(MOCHA) -R xunit-file $(TESTS)
