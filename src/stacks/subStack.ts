import { StackProps, RemovalPolicy, NestedStack, CfnResource, NestedStackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class MySubStack extends NestedStack {
  readonly bucket: s3.Bucket;
  constructor(scope: Construct, id: string, props: NestedStackProps = {}) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'MyBucket', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY, // Only for dev/test environments
      autoDeleteObjects: true, // Only for dev/test environments
    });

    // CloudFormationの論理IDを明示的に上書き
    const cfnResource = this.node.defaultChild as CfnResource;
    if (cfnResource) {
      cfnResource.overrideLogicalId('MySubStack');
    }
  }
}