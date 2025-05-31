import { CfnResource, NestedStack, NestedStackProps } from "aws-cdk-lib";
import { Construct } from "constructs";

interface MyNestedStackRequiredProps {
}
interface MyNestedStackOptionalProps {
}
export type MyNestedStackProps = MyNestedStackRequiredProps & MyNestedStackOptionalProps & NestedStackProps;

export class MyNestedStack extends NestedStack {
  constructor(scope: Construct, id: string, props: MyNestedStackProps = {}) {
    super(scope, id, props);

    // CloudFormationの論理IDを強制上書き
    const cfnResource = this.node.defaultChild as CfnResource;
    if (cfnResource) {
      cfnResource.overrideLogicalId(id);
    }
  }
}
