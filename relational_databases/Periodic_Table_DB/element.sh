#Script that takes in as input either the name,symbol,or atomic_number of an element that is on the included list and searches the db and retrieves that info

# !bin/bash
PSQL="psql -X --username=freecodecamp --dbname=periodic_table -t --no-align -c"

MAIN(){
  INPUT=$1

  if [[ $INPUT =~ ^[0-9]+$ ]]
  then
    SEARCH_PSQL=$($PSQL "SELECT * FROM properties FULL JOIN types USING(type_id) FULL JOIN elements USING(atomic_number) WHERE symbol='$INPUT' OR name='$INPUT' OR atomic_number=$INPUT")
  else
    SEARCH_PSQL=$($PSQL "SELECT * FROM properties FULL JOIN types USING(type_id) FULL JOIN elements USING(atomic_number) WHERE symbol='$INPUT' OR name='$INPUT'")
  fi

  if [[ -z $SEARCH_PSQL ]]
  then
    echo "I could not find that element in the database."
  else
    IFS='|' read -ra SEARCH_RESULTS_ARRAY <<< "$SEARCH_PSQL"
    A_NUM=${SEARCH_RESULTS_ARRAY[0]}
    TYPE_ID=${SEARCH_RESULTS_ARRAY[1]}
    A_MASS=${SEARCH_RESULTS_ARRAY[2]}
    M_POINT=${SEARCH_RESULTS_ARRAY[3]}
    B_POINT=${SEARCH_RESULTS_ARRAY[4]}
    TYPE=${SEARCH_RESULTS_ARRAY[5]}
    SYMBOL=${SEARCH_RESULTS_ARRAY[6]}
    NAME=${SEARCH_RESULTS_ARRAY[7]}

    echo "The element with atomic number $A_NUM is $NAME ($SYMBOL). It's a $TYPE, with a mass of $A_MASS amu. $NAME has a melting point of $M_POINT celsius and a boiling point of $B_POINT celsius."
  fi
}

if [[ -z $1 ]]
then 
  echo Please provide an element as an argument.
else
  MAIN $1
fi
