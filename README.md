# README #

This README would normally document whatever steps are necessary to get your application up and running.

## Project configuration
* First, add a new user to Icinga2 API and a new Icingaweb2 user.
* Change Icinga2 address and API credentials in Node.js Backend:
```
Icinga2 server address                          -   Line 10 ./utilities/utilities.js
Icinga2 API username/password                   -   Line 12 ./utilities/utilities.js
```

* Change Icinga2 address and icingaweb2 credentials in Node.js Backend:
```
Icingaweb2 username                             -   Line 9 ./routes/api.js
Icingaweb2 password                             -   Line 10 ./routes/api.js
Icingaweb2 address                              -   Line 14 ./routes/api.js
```

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
nodemon server
```