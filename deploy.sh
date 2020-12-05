setupenv () {
	printf "\e[1m\e[39mIntroduce the mango db url (Format: mongodb://user:pwd@server:port/db):\e[22m\n"
	read userandpwd

	printf "\e[1m\e[39mIntroduce the salt that will be used for passwords. Leave the field empty to autogenerate a SALT:\e[22m\n"
	read salt

	if [ -z "$salt" ]
	then
		printf "Generating a salt for you...\n"
		salt=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 16)
		printf "The generated salt is $salt and will be saved in your .env file.\n"
	fi

	printf "\e[1m\e[39mIntroduce the JWT token secret that will be used for access tokens. Leave the field empty to autogenerate a TOKEN_SECRET:\e[22m\n"
	read token_secret

	if  [ -z "$token_secret" ]
	then
		printf "Generating a token secret for you...\n"
		token_secret=$(tr -dc A-Za-z0-9 </dev/urandom | head -c 32)
		printf "The generated token secret is $token_secret and will be saved in your .env file.\n";
	fi

	printf "USERANDPWD=$userandpwd\n" >> .env
	printf "SALT=$salt\n" >> .env
	printf "TOKEN_SECRET=$token_secret\n" >> .env

	printf "\e[1m\e[36mSuccesfully generated .env file!\e[22m\n\n"
}

printf "\e[1m\e[36m - Welcome to the setup wizard for DnDmin.\e[22m\n"
printf "\e[95mThis wizard will now ask you to input the values that are kept secret in the .env file.\n"
printf "\n"

if [[ ! -a ".env"  ]]
then
	setupenv
else
	printf "\e[1m\e[36mThere is an .env file in this folder. Do you wish to replace it? (y/n): \e[22m"
	read opt
	if [ "$opt" == "y" ] || [ "$opt" == "Y" ]
	then
		printf "Deleting the .env file\n"
		rm .env
		setupenv
	fi
fi
read -p "Do you wish to install all npm packages? (y/n): " opt

if [ "$opt" == "y" ] || [ "$opt" == "Y" ]
then
	printf "Installing the required packages...\n\n"
	npm install --save
fi

printf "\e[1m\e[36mThe API should be ready to run!\nYou can just do \e[95mnpm run start\e[36m to run the API\n"