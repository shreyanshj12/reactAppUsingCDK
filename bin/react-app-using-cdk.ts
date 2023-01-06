#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ReactAppUsingCdkStack } from '../lib/react-app-using-cdk-stack';

const app = new cdk.App();

new ReactAppUsingCdkStack(app, 'ReactAppUsingCdkStack', { env: { account: '157559436467', region: 'us-east-1' } });