import { RemovalPolicy, NestedStackProps } from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import { Construct } from 'constructs';
import { MyNestedStack, MyNestedStackProps } from '../construct/MyNestedStack';

/**
 * S3バケットを作成するNestedStack。
 * バージョニングや自動削除など、開発・検証用途向けの設定が含まれます。
 */
export class MyNestedStack1 extends MyNestedStack {
  /**
   * このNestedStackで作成されるS3バケット
   */
  readonly bucket: s3.Bucket;

  /**
   * コンストラクタ
   * @param scope 親Construct
   * @param id スタックID
   * @param props NestedStackのプロパティ
   */
  constructor(scope: Construct, id: string, props: MyNestedStackProps = {}) {
    super(scope, id, props);

    this.bucket = new s3.Bucket(this, 'MyBucket', {
      versioned: true,
      removalPolicy: RemovalPolicy.DESTROY, // Only for dev/test environments
      autoDeleteObjects: true, // Only for dev/test environments
    });
  }
}