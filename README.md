# Auto Deploy

## Run locally for development
- Create backend configuration file in `src/config/env/.local.json` with structure as below

```json
{
    "PORT": 3000,
    "baseUrl": "http://localhost:3000",
    "redis": {
      "host": "localhost",
      "port": 6379,
      "db": 0
    },
    "mysql": {
        "host": "mysql",
        "port": 3306,
        "database": "QPAIRDEP",
        "username": "root",
        "password": ""
    },
    "jwt": {
        "issuer": "Auto Deploy",
        "secret": "jwt_secret_key"
    },
    "google": {
        "clientID": "google_client_id",
        "clientSecret": "google_client_secret"
    },
    "facebook": {
        "clientID": "facebook_client_id",
        "clientSecret": "facebook_client_secret"
    },
    "mailer": {
        "from": "Admin <admin@codedeploy.com>",
        "transport": {
            "service": "SES",
            "auth": {
                "user": "ses_auth_user",
                "pass": "ses_sec_password"
            }
        }
    }
}
```
- Build the front-end scripts: cd to `src` folder, run `grunt`
- Start the app: cd to `src` folder, run `npm start`
- Open app at `http://localhost:3000`

## Deploy to remote server
- Install docker and docker-compose
- Create data folder `mkdir -p $HOME/data`
- Copy `grafana` folder to home directory `cp -R grafana $HOME/data`
- Create configuration file in `src/config/env/.deploy.json`, here is example content

```json
{
    "PORT": 3000,
    "NODE_ENV": "production",
    "baseUrl": "http://ec2-34-193-250-103.compute-1.amazonaws.com",
    "redis": {
      "host": "redis",
      "port": 6379,
      "db": 0
    },
    "mysql": {
        "host": "mysql_rds_host",
        "port": 3306,
        "database": "QPAIRDEP",
        "username": "codedeploy",
        "password": "codedeploy"
    },
    "jwt": {
        "issuer": "codedeploy",
        "secret": "jwt_secret_key"
    },
    "google": {
        "clientID": "google_client_id",
        "clientSecret": "google_client_secret"
    },
    "facebook": {
        "clientID": "facebook_client_id",
        "clientSecret": "facebook_client_secret"
    },
    "mailer": {
        "from": "Admin <admin@codedeploy.com>",
        "transport": {
            "service": "SES",
            "auth": {
                "user": "ses_auth_user",
                "pass": "ses_sec_password"
            }
        }
    }
}
```

- Run and app using `docker-compose up -d`

# Social Login

Currently we support Google and Facebook authentication and registration, please create each of them for
codedeploy web app then update clientId and clientSecret to the config above

For more information please see these link:

- Google: https://developers.google.com/identity/sign-in/web/devconsole-project
- Facebook: https://developers.facebook.com/docs/apps/register

## Setup InfluxDB and Grafana
- Create influxdb database named `jmeter` (Same name as `INFLUX_DATABASE` config env)
- Open grafana and create datasource named `jmeter` point to above influx db
