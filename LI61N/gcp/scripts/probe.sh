for i in `seq 1 100000`; do
  curl -s http://35.246.89.56/api/hello
  printf "\n"
done

