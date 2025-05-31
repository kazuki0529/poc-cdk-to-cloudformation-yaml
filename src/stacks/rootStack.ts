import { Stack, StackProps, RemovalPolicy, NestedStack } from 'aws-cdk-lib';
import { Runtime, RuntimeManagementMode } from 'aws-cdk-lib/aws-lambda';
import { CfnFunction } from 'aws-cdk-lib/aws-sam';
import { Construct } from 'constructs';
import { MyNestedStack1 } from './nsetdStack1';
import { MyNestedStack2 } from './nsetdStack2';

export class MyStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps = {}) {
    super(scope, id, props);

    const nestStack1 = new MyNestedStack1(this, 'MyNestedStack1');
    const nestStack2 = new MyNestedStack2(this, 'MyNestedStack2');


    // Lambda関数をCfnFunctionで定義
    new CfnFunction(this, 'MyFunction', {
      handler: 'hello-world.handler',
      runtime: Runtime.NODEJS_22_X.name,
      codeUri: 'src/lambda',
      environment: {
        variables: {
          BUCKET_NAME: nestStack1.bucket.bucketName,
          TABLE_NAME: nestStack2.table.tableName,
        },
      },
    });
  }
}