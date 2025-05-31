import { RemovalPolicy, NestedStackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { MyNestedStack } from '../construct/MyNestedStack';

export class MyNestedStack2 extends MyNestedStack {
  readonly table: Table;
  constructor(scope: Construct, id: string, props: NestedStackProps = {}) {
    super(scope, id, props);

    this.table = new Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY, // Only for dev/test environments
      billingMode: BillingMode.PAY_PER_REQUEST, // On-demand billing mode
    });
  }
}