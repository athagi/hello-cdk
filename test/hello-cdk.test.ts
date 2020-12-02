import { expect as expectCDK, haveResource, haveResourceLike, countResources } from '@aws-cdk/assert';
import * as jest from '@aws-cdk/assert/jest';
import * as cdk from '@aws-cdk/core';
import * as ecr from '@aws-cdk/aws-ecr';
import * as HelloCdk from '../lib/hello-cdk-stack';


test('SQS Queue Created', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new HelloCdk.HelloCdkStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(haveResource("AWS::SQS::Queue",{
      VisibilityTimeout: 300
    }));
});

test('SNS Topic Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new HelloCdk.HelloCdkStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(haveResource("AWS::SNS::Topic"));
});

test('ECR project Created', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new HelloCdk.HelloCdkStack(app, 'MyTestStack');
  // THEN



  expectCDK(stack).to(haveResource("AWS::ECR::Repository", {
    
    RepositoryName: "hogehoge",
    ImageScanningConfiguration: {
      scanOnPush: true
    },
  }));
});


test('ECR repository count', () => {
  const app = new cdk.App();
  // WHEN
  const stack = new HelloCdk.HelloCdkStack(app, 'MyTestStack');
  // THEN
  expectCDK(stack).to(countResources("AWS::ECR::Repository", 1))
   
});
