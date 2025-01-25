#!/bin/bash

if [[ $1 == "test" ]]
then
  PSQL="psql --username=sebosuar --dbname=worldcuptest -t --no-align -c"
else
  PSQL="psql --username=sebosuar --dbname=worldcup -t --no-align -c"
fi

#Do not change code above this line. Use the PSQL variable above to query your database.

$PSQL "TRUNCATE TABLE teams, games;"
$PSQL "ALTER SEQUENCE teams_team_id_seq RESTART;"
$PSQL "ALTER SEQUENCE games_game_id_seq RESTART;"

echo -e "\nEntering Data\n"
while IFS="," read -r year round winner opponent winner_goals opponent_goals
do
  if [[ $year == "year" ]]; 
  then
    continue
  fi
  $PSQL "INSERT INTO teams(name) SELECT '$winner' WHERE NOT EXISTS (SELECT 1 FROM teams WHERE name = '$winner');"
  $PSQL "INSERT INTO teams(name) SELECT '$opponent' WHERE NOT EXISTS (SELECT 1 FROM teams WHERE name = '$opponent');"
done < "games.csv"

cur_game=1;
while IFS="," read -r year round winner opponent winner_goals opponent_goals
do
  if [[ $year == "year" ]]; 
  then
     continue
   fi
   $PSQL "INSERT INTO games(year, round, winner_goals, opponent_goals) VALUES($year, '$round', $winner_goals, $opponent_goals);"
   $PSQL "UPDATE games SET winner_id = (SELECT team_id FROM teams WHERE name = '$winner'), opponent_id = (SELECT team_id FROM teams WHERE name = '$opponent') WHERE game_id = $cur_game;"
  ((cur_game++))
 done < "games.csv"


