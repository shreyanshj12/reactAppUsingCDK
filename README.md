# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

Setup the project:

1. mkdir cdk-session
2. cd cdk-session
3. cdk init app --language typescript (it may take a while depending on the internet speed because there are a few npm dependencies)
4. delete default package.json and package.lock files because there are compatibility problems with 2.9.x version - change aws-cdk and aws-cdk-lib to 2.41.0 or 2.8.0

Development:

1. create s3 bucket
2. create bucket output so that we can reference the name/value
3. run: npm install @aws-cdk/aws-lambda because we are going to create the lambda in our infrastructure
4. add "esModuleInterop": true to tsconfig.json
5. create /api/get-photos/index.ts
6. cd /api/get-photos and run npm init -y (creating a node project within our project)
7. install dependencies : npm install -D @types/aws-lambda aws-sdk
8. go to package.json in get-photos and change script to typescript compiler
9. Define code for lambda fun inside /api/get-photos/index.ts
10. cd ../../ -- to the react app folder
11. create the lambda function inside our infra
12. add bucket to environment vars in lambda and define iam role for accessing
13. Add trigger to lambda : Install apigatewayv2 - npm install @aws-cdk/aws-apigatewayv2
14. Create new HttpApi for get photo
