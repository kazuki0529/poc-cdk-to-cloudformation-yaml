import { RemovalPolicy, NestedStackProps } from 'aws-cdk-lib';
import { AttributeType, BillingMode, Table } from 'aws-cdk-lib/aws-dynamodb';
import { Construct } from 'constructs';
import { MyNestedStack, MyNestedStackProps } from '../construct/MyNestedStack';

/**
 * DynamoDBテーブルを作成するNestedStack。
 * パーティションキーや課金モードなど、開発・検証用途向けの設定が含まれます。
 */
export class MyNestedStack2 extends MyNestedStack {
  /**
   * このNestedStackで作成されるDynamoDBテーブル
   */
  readonly table: Table;

  /**
   * コンストラクタ
   * @param scope 親Construct
   * @param id スタックID
   * @param props NestedStackのプロパティ
   */
  constructor(scope: Construct, id: string, props: MyNestedStackProps = {}) {
    super(scope, id, props);

    this.table = new Table(this, 'MyTable', {
      partitionKey: { name: 'id', type: AttributeType.STRING },
      removalPolicy: RemovalPolicy.DESTROY, // Only for dev/test environments
      billingMode: BillingMode.PAY_PER_REQUEST, // On-demand billing mode
    });
  }
}