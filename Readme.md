# BWM Backend

This repository consists of 2 projects:

- Rest API project which can be accessed via:
  http://bwm-backend-env.eba-ixrmfxsb.us-east-1.elasticbeanstalk.com

- Lambda function

## How to run - Rest API

although it is not common to upload .env file to source control, i did commit that to git for the purpose of the test.

The .env file consists of the default params used on dev environment.

There is also a docker-compose file, if you want to wire a local database

1. open docker, and run on terminal

```bash
docker-compose up
```

2. install dependencies

```bash
pnpm install
npm install
yarn
```

3. to run the environment in development configuration (after you attached a local DB, either via docker (1) or in other form

```bash
pnpm dev
npm run dev
yarn dev
```

API base url - http://bwm-backend-env.eba-ixrmfxsb.us-east-1.elasticbeanstalk.com
API logs - http://bwm-backend-env.eba-ixrmfxsb.us-east-1.elasticbeanstalk.com/api/logs

you can apply filters:

severity = INFO / WARNING / ERROR / DEBUG - default = none

sort = DESC / ASC - default = DESC

http://bwm-backend-env.eba-ixrmfxsb.us-east-1.elasticbeanstalk.com/api/logs?severity=INFO&sort=DESC

## How to run - Lambda function

no need to run lambda function ;)
