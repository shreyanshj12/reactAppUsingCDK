import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { IamStack } from './iam_stack';
import { LambdaStack } from './lambda_stack';
import { StorageStack } from './storage_stack';


export class PipelineStage extends cdk.Stage {
    constructor(scope: Construct, stageName: string, props: cdk.StackProps) {
        super(scope, stageName, props);

        const storageStackProps = {
            stage: stageName,
        };
        const storageStack = new StorageStack(this, 'StorageStack', storageStackProps);

        const iamStackProps = {
            stage: stageName,
            bucketArn: storageStack.bucket.bucketArn,
        };
        const iamStack = new IamStack(this, `IamStack-${stageName}`, iamStackProps);

        const lambdaStackProps = {
            stage: stageName,
            bucketAccessRole: iamStack.bucketAccessRole,
        };
        const lambdaStack = new LambdaStack(this, 'LambdaStack', lambdaStackProps);
    }

}