import * as cdk from 'aws-cdk-lib';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import * as path from 'path';
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Effect, ManagedPolicy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { CodePipeline, CodePipelineSource, ShellStep, Step } from 'aws-cdk-lib/pipelines';
import { ManualApprovalStep } from 'aws-cdk-lib/pipelines';
import { PipelineStage } from './pipeline_stage';

export class ReactAppUsingCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new CodePipeline(this, 'Pipeline', {
      pipelineName: 'TestPipeline',
      synth: new ShellStep('Synth', {
        input: CodePipelineSource.gitHub('shreyanshj12/reactAppUsingCDK', 'main'),
        installCommands: ['npm i -g npm@global'], // update npm
        commands: [
          'npm ci && cd api/get-photos && npm ci && cd ../.. && npm ci',
          'npm run build',
          'npx cdk synth']
      })
    });

    //add test stage
    // const testingStage = pipeline.addStage(new PipelineStage(this, "test", {
    //   env: { account: "157559436467", region: "us-east-1" }
    // }));


    // testingStage.addPre(new ShellStep("Run Unit Tests", { commands: ['npm install', 'npm test'] }));
    // testingStage.addPost(new ManualApprovalStep('Manual approval before production'));

    // const prodStage = pipeline.addStage(new PipelineStage(this, "prod", {
    //   env: { account: "157559436467", region: "us-east-1" }
    // }));

    //1. create s3 bucket
    // const bucket = new Bucket(this, 'ReactAppBucket', {
    //   encryption: BucketEncryption.S3_MANAGED
    // })

    //12. role to access bucket

    // const bucketAccessRole = new Role(this, `BucketAccessRole`, {
    //   assumedBy: new ServicePrincipal("lambda.amazonaws.com")
    // });

    // const bucketAccessPolicy = new ManagedPolicy(this, "BucketAccessPolicy", {
    //   managedPolicyName: "BucketAccessPolicy",
    //   statements: [
    //     new PolicyStatement({
    //       effect: Effect.ALLOW,
    //       actions: ['s3:GetObject', 's3:PutObject'],
    //       resources: [
    //         `${bucket.bucketArn}/*`
    //       ],
    //     }),
    //   ]
    // });

    // bucketAccessRole.addManagedPolicy(bucketAccessPolicy);

    //11. create lambda in cdk
    //path.join work correctly on all OS - mac, windows and linux
    // const getPhotosLambda = new Function(this, 'get-photos', {
    //   runtime: Runtime.NODEJS_16_X,
    //   code: Code.fromAsset(path.join(__dirname, "..", "api", "get-photos", "dist")),
    //   handler: 'index.getPhotos',
    //   environment: {
    //     BUCKET_NAME: bucket.bucketName
    //   },
    //   role: bucketAccessRole
    // })

  }
}
