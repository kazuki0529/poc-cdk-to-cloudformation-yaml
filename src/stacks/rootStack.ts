import { Stack, StackProps, RemovalPolicy, NestedStack } from 'aws-cdk-lib';
import { Runtime, RuntimeManagementMode } from 'aws-cdk-lib/aws-lambda';
import { CfnFunction } from 'aws-cdk-lib/aws-sam';
import { Construct } from 'constructs';
import { MySubStack } from './subStack';

export class MyStack extends Stack {
  readonly nestedStacks: NestedStack[] = [];
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const subStack = new MySubStack(this, 'MySubStack');
    this.nestedStacks.push(subStack);

    // Lambda関数をCfnFunctionで定義
    const func = new CfnFunction(this, 'MyFunction', {
      handler: 'hello-world.handler',
      runtime: Runtime.NODEJS_22_X.name,
      codeUri: 'src/lambda',
      environment: {
        variables: {
          BUCKET_NAME: subStack.bucket.bucketName,
        },
      },
    });
  }
}