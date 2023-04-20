#!/bin/bash

# Initalize
rm -rf ./src/$1

# Generate module
echo "Generating module $1"
nest g module $1
nest g controller $1
nest g service $1

# Generate default components
mkdir ./src/$1/schema
mkdir ./src/$1/dto

# Generate default files
touch ./src/$1/schema/$1.schema.ts
touch ./src/$1/dto/create-$1.dto.ts
touch ./src/$1/dto/update-$1.dto.ts

if [ "$2" == "-nt" ]; then
  echo "Deleting test files"
  rm -rf ./src/$1/$1.*.spec.ts
fi

echo "Done"