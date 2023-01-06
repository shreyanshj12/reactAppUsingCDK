import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Effect, ManagedPolicy, PolicyStatement, Role, ServicePrincipal } from 'aws-cdk-lib/aws-iam';

export interface IamStackProps extends cdk.StackProps {
    readonly stage: string;
    readonly bucketArn: string
}

export class IamStack extends cdk.Stack {
    public readonly bucketAccessRole: Role;
    constructor(scope: Construct, id: string, props: IamStackProps) {
        super(scope, id, props);

        this.bucketAccessRole = new Role(this, `BucketAccessRole`, {
            assumedBy: new ServicePrincipal("lambda.amazonaws.com")
        });

        const bucketAccessPolicy = new ManagedPolicy(this, "BucketAccessPolicy", {
            managedPolicyName: "BucketAccessPolicy",
            statements: [
                new PolicyStatement({
                    effect: Effect.ALLOW,
                    actions: ['s3:GetObject', 's3:PutObject'],
                    resources: [
                        `${props.bucketArn}/*`
                    ],
                }),
            ]
        });

        this.bucketAccessRole.addManagedPolicy(bucketAccessPolicy);
    }
}