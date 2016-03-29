#! /bin/sh


if ipfs &>/dev/null; then
  echo "## Getting dependencies from IPFS"

  DEPS_CMD='var deps = require("./package.json").esDependencies;if (!deps) { process.exit(1) } var keys = Object.keys(deps);keys.forEach((key) => console.log(key, deps[key]))'

  MODULES=$(node -e "$DEPS_CMD")

  if [ $? -ne 0 ]; then
    echo "No esDependencies found in package.json"
    exit 0
  fi

  echo "Downloading dependencies..."

  while read -r line; do
      NAME=$(echo "$line" | cut -d ' ' -f 1)
      HASH=$(echo "$line" | cut -d ' ' -f 2)
      echo "Getting $NAME@$HASH"
      ipfs get $HASH --output node_modules/$NAME

      chmod +x node_modules/$NAME/get-deps.sh &> /dev/null
  done <<< "$MODULES"
else
  echo "## Could not get dependencies from IPFS, doing the good'ol 'fetch from npm registry' way"
  echo "Either 'ipfs' doesn't exists in PATH or you haven't run 'ipfs daemon' before running the command"
  exit 0
fi
