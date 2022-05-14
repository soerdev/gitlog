#!/usr/local/bin/fish

scp -P $SSH_PORT ./projects.json $SSH_USER@$SSH_HOST:$SSH_WWW_PATH/gitlog
