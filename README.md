### Getting Started

1. First clone the repository

		git clone https://github.com/triplea24/kntu-react-native-instagram.git
	
2. Then change directory to the project
	
		cd kntu-react-native-instagram
	
3. Install node packages
	
		yarn (install) || npm install
	
	
4. Run the project

		expo start || yarn start


### Run the server

1. Install [`json-server`](https://github.com/typicode/json-server) node module
		
		npm install -g json-server
		
2. Use `json-server` to start the server or you can use the pre-defined script with yarn

		yarn server || json-server server/db.json --watch