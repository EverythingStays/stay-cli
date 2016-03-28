#! /bin/sh

if ipfs id 2>/dev/null; then
  echo "## Publishing dependency"

  mv node_modules .node_modules 2>/dev/null

  HASH=$(ipfs add . -r | tail -n 1 | cut -d ' ' -f 2)

  mv .node_modules node_modules 2>/dev/null

  echo "Published as $HASH"
else
  echo "## Could not publish dependency to IPFS, doing the good'ol 'fetch from npm registry' way"
  echo "Either 'ipfs' doesn't exists in PATH or you haven't run 'ipfs daemon' before running the command"
  exit 0
fi
