import * as fs from 'fs';
import * as path from 'path';
import yaml from 'yaml';
import { App, Stack, StackProps } from 'aws-cdk-lib';
import { MyStack } from './stacks/rootStack';


// for development, use account/region from cdk cli
const devEnv = {
  account: process.env.CDK_DEFAULT_ACCOUNT,
  region: process.env.CDK_DEFAULT_REGION,
};

const app = new App();

const stack = new MyStack(app, 'MyStack', { env: devEnv });
// new MyStack(app, 'poc-cdk-to-cloudformation-yaml-prod', { env: prodEnv });

const cloudAssembly = app.synth();

const parentStack = cloudAssembly.getStackByName('MyStack');
if (parentStack) {
  const parentTemplate = JSON.parse(JSON.stringify(parentStack.template));
  // ResourceキーとTemplateURLのマッピングを作成
  const nestedStackResourceMap: Record<string, string> = {};
  for (const [key, res] of Object.entries(parentTemplate.Resources ?? {})) {
    const resource = res as any;
    if (resource.Type === 'AWS::CloudFormation::Stack' && resource.Properties?.TemplateURL) {
      // ファイル名をResourceキー名.yamlに
      const fileName = `${key}.yaml`;
      resource.Properties.TemplateURL = `./${fileName}`;
      nestedStackResourceMap[key] = fileName;
    }
  }
  // NestedStackのテンプレートをResourceキー名で出力（cdk.outから直接取得）
  for (const [resourceKey, fileName] of Object.entries(nestedStackResourceMap)) {
    // cdk.out から NestedStack テンプレートファイルを探す
    const nestedJson = fs.readdirSync('cdk.out').find(f => f.endsWith('.nested.template.json') && f.includes(resourceKey));
    if (nestedJson) {
      const jsonPath = path.join('cdk.out', nestedJson);
      const jsonContent = fs.readFileSync(jsonPath, 'utf8');
      if (jsonContent.trim()) {
        const template = JSON.parse(jsonContent);
        const yamlStr = yaml.stringify(template);
        fs.mkdirSync('dist', { recursive: true });
        fs.writeFileSync(`dist/${fileName}`, yamlStr);
        console.log(`dist/${fileName} generated`);
      } else {
        console.warn(`${jsonPath} is empty.`);
      }
    } else {
      console.warn(`NestedStack template for ${resourceKey} not found.`);
    }
  }
  // 親テンプレートもYAMLで出力
  const yamlStr = yaml.stringify(parentTemplate);
  fs.mkdirSync('dist', { recursive: true });
  fs.writeFileSync('dist/MyStack.yaml', yamlStr);
  console.log('dist/MyStack.yaml generated');
}