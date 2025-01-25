#!/bin/bash
PSQL="psql --username=freecodecamp --dbname=guessing_game -t --no-align -c"

echo "Enter your username: "
read USERNAME
USERNAME_SEARCH=$($PSQL "SELECT username FROM users WHERE username='$USERNAME'")

if [[ -z $USERNAME_SEARCH ]]
then
  echo -e "Welcome, $USERNAME! It looks like this is your first time here."
  ADD_USER_TO_DB=$($PSQL "INSERT INTO users(username) VALUES('$USERNAME')")
else
  GAMES_PLAYED=$($PSQL "SELECT games_played FROM users WHERE username='$USERNAME'")
  BEST_GAME=$($PSQL "SELECT best_game FROM users WHERE username='$USERNAME'")

  echo "Welcome back, $USERNAME! You have played $GAMES_PLAYED games, and your best game took $BEST_GAME guesses."
fi

UPDATE_GAMES_PLAYED=$($PSQL "UPDATE users SET games_played = games_played + 1 WHERE username='$USERNAME'")

SECRET_NUMBER=$((1 + $RANDOM % 1000))
declare -i NUMBER_OF_GUESSES=0

echo -e "\nGuess the secret number between 1 and 1000: "
read GUESS

while true
do
  if [[ $GUESS =~ ^[0-9]+$ ]]
  then
    if (( GUESS < SECRET_NUMBER ))
    then
      echo -e "\nIt's higher than that, guess again:"
    elif (( GUESS > SECRET_NUMBER ))
    then
      echo -e "\nIt's lower than that, guess again:"
    else
      echo -e "\nYou guessed it in $NUMBER_OF_GUESSES tries. The secret number was $SECRET_NUMBER. Nice job!"
      break
    fi
  else
    echo -e "\nThat is not an integer, guess again:"
  fi
  read GUESS
  ((NUMBER_OF_GUESSES++))
done

UPDATE_BEST_SCORE=$($PSQL "UPDATE users SET best_game = $NUMBER_OF_GUESSES WHERE username='$USERNAME' AND ($NUMBER_OF_GUESSES < best_game OR best_game=-1)")
