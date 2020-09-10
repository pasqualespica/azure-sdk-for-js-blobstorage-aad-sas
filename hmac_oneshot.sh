#!/bin/bash

SHAREDSECRET='my-super-secret-pwd1';
MYNESSAGE='abc1234566778';

echo -n $MYNESSAGE | openssl sha256 -hmac $SHAREDSECRET