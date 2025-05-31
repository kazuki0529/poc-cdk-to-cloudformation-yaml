import { RemovalPolicy, NestedStackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { MyNestedStack } from '../construct/MyNestedStack';

export class MyNestedStack1 extends MyNestedStack {
  readonly bucket: s3.Bucket;
  constructor(scope: Construct, id: string, props: NestedStackProps = {}) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'MyBucket', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY, // Only for dev/test environments
      autoDeleteObjects: true, // Only for dev/test environments
    });
  }
}