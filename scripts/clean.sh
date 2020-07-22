#!/usr/bin/env bash
#
# Clean module files
#
# @package: ValueFlows offers & needs marketplace app
# @since:   2020-07-21
#
##
set +x

echo "Wiping nodejs module directories..."

rm -Rf node_modules

for DIR in $(find -type d -iname node_modules); do
  echo "  Remove $DIR"
  rm -Rf "$DIR"
done
