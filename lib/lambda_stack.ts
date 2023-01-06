import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as path from 'path';
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Role } from 'aws-cdk-lib/aws-iam';

export interface LambdaStackProps extends cdk.StackProps {
    readonly stage: string;
    readonly bucketAccessRole: Role;
}

export class LambdaStack extends cdk.Stack {

    constructor(scope: Construct, id: string, props: LambdaStackProps) {
        super(scope, id, props);

        const getPhotosLambda = new Function(this, 'get-photos', {
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(path.join(__dirname, "..", "api", "get-photos", "dist")),
            handler: 'index.getPhotos',
            environment: {
                ENV: props.stage
            },
            role: props.bucketAccessRole
        });
    }
}