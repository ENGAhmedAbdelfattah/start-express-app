#! /usr/bin/env node
const repoName = process.argv[2];
const gitCheckoutCommand = `git clone --depth 1 `; 