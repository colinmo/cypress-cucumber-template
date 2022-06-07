test-gherk:
	docker run --rm -i \
		--env USERNAME="${ECOUSER}" --env PASSWORD="${ECOPASS}" \
		-v ${PWD}/feature:/cypress/integrations/ \
		-v ${PWD}/output/videos:/cypress/videos \
		-v ${PWD}/output/screens:/cypress/screenshots \
		--entrypoint /startup-gherkin.sh \
		-t cypress2

test-cypress:
	docker run --rm -i \
		--env USERNAME="${ECOUSER}" --env PASSWORD="${ECOPASS}" \
		-v ${PWD}/cypress:/cypress/integrations/ \
		-v ${PWD}/output/videos:/cypress/videos \
		-v ${PWD}/output/screens:/cypress/screenshots \
		--entrypoint /startup-basic.sh \
		-t cypress2

vid:
	open output/*.mp4

interactive:
	docker run --rm -i \
		--env USERNAME="${ECOUSER}" --env PASSWORD="${ECOPASS}" \
		-v ${PWD}/feature:/cypress/integrations/ \
		-v ${PWD}/output/videos:/cypress/videos \
		-v ${PWD}/output/screens:/cypress/screenshots \
		--entrypoint /bin/bash \
		-t cypress2
