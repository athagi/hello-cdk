import * as sns from '@aws-cdk/aws-sns';
import * as subs from '@aws-cdk/aws-sns-subscriptions';
import * as sqs from '@aws-cdk/aws-sqs';
import * as ecr from '@aws-cdk/aws-ecr';
import * as cdk from '@aws-cdk/core';
import { RemovalPolicy } from '@aws-cdk/core';

export class HelloCdkStack extends cdk.Stack {
  constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const queue = new sqs.Queue(this, 'HelloCdkQueue', {
      visibilityTimeout: cdk.Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'HelloCdkTopic');

    topic.addSubscription(new subs.SqsSubscription(queue));

    const ecrLifecycleRule: ecr.LifecycleRule = {
      description: "this is test",
      maxImageCount: 10,
      rulePriority: 1,
      tagStatus: ecr.TagStatus.ANY
    }

    const ecrRepository = new ecr.Repository(this, 'Repo', {
      imageScanOnPush: true,
      repositoryName: "hogehoge",
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    ecrRepository.addLifecycleRule(ecrLifecycleRule);

  }
}

