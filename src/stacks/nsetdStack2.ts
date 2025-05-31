import { StackProps, RemovalPolicy, NestedStack, CfnResource, NestedStackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';

export class MyNestedStack2 extends NestedStack {
  readonly table: Table;
  constructor(scope: Construct, id: string, props: NestedStackProps = {}) {
    super(scope, id, props);

    this.table = new Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY, // Only for dev/test environments
      billingMode: BillingMode.PAY_PER_REQUEST, // On-demand billing mode
    });

    // CloudFormationの論理IDを明示的に上書き
    const cfnResource = this.node.defaultChild as CfnResource;
    if (cfnResource) {
      cfnResource.overrideLogicalId('MyNestedStack2');
    }
  }
}