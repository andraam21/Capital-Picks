# Variables
PORT ?= 3000

.PHONY: all setup install start dev test clean help

## start: Runs the Express server
start:
	@echo "Starting server on port $(PORT)..."
	node server.js

## test: Sends a sample cURL request to test the API endpoint
test:
	@echo "Testing API endpoint with France..."
	@curl -s -X POST http://localhost:$(PORT)/api/get-attractions \
		-H "Content-Type: application/json" \
		-d '{"country": "France"}' | json_pp || curl -s -X POST http://localhost:$(PORT)/api/get-attractions \
		-H "Content-Type: application/json" \
		-d '{"country": "France"}'
	@echo ""

