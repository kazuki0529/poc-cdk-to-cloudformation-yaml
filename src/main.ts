import { App, Stack, StackProps } from 'aws-cdk-lib';
import { MyStack } from './stacks/rootStack';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

new MyStack(app, 'poc-cdk-to-cloudformation-yaml-dev', { env: devEnv });
// new MyStack(app, 'poc-cdk-to-cloudformation-yaml-prod', { env: prodEnv });

app.synth();