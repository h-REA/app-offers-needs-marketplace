#!/usr/bin/env bash
#
# Clean module files
#
# @package: ValueFlows offers & needs marketplace app
# @since:   2020-07-21
#
##

rm -Rf node_modules

for DIR in **/node_modules; do
  rm -Rf "$DIR"
done
