import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket, BucketEncryption } from 'aws-cdk-lib/aws-s3';

export interface StorageStackProps extends cdk.StackProps {
    readonly stage: string;
}

export class StorageStack extends cdk.Stack {

    public readonly bucket: Bucket

    constructor(scope: Construct, id: string, props?: StorageStackProps) {
        super(scope, id, props);

        this.bucket = new Bucket(this, 'ReactAppBucket', {
            encryption: BucketEncryption.S3_MANAGED
        });
    }
}