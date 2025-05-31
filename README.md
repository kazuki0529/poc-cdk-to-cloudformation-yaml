# poc-cdk-to-cloudformation-yaml

このリポジトリは、**CloudFormationのYAML形式でしかデプロイできない環境**向けに、AWS CDKの記法を極力そのまま活かしつつ、`cdk synth -q` 実行時に親スタック・NestedStack すべてのテンプレートをYAMLファイルとして出力する実験的なプロジェクトです。

## 特徴

- AWS CDK(TypeScript)で通常通りスタック・リソースを記述
- `main.ts` のカスタム処理により、`cdk synth` 時に `dist/` フォルダへCloudFormation YAMLテンプレートを自動生成
- NestedStackも自動で個別YAMLファイルとして出力し、親テンプレートの `TemplateURL` を相対パスで参照
- これにより、SAM CLIや手動アップロードなどYAML限定環境でも柔軟にデプロイ可能

## 使い方

1. 依存インストール
   ```bash
   yarn install
   ```
2. テンプレート生成
   ```bash
   yarn cdk synth -q
   # または
   yarn ts-node src/main.ts
   ```
3. `dist/` フォルダに `MyStack.yaml` および各NestedStackのYAMLが出力されます

## ディレクトリ構成例

```
dist/
  MyStack.yaml
  MyNestedStack1.yaml
  ...
src/
  stacks/
    rootStack.ts
    subStack.ts
    ...
```

## 注意点

- CDKの一部メタ情報やBootstrap関連リソースはYAMLにも出力されます。不要な場合は適宜除去してください。
- 本リポジトリは「CDKの記法で書きたいが、YAMLしか受け付けない環境」向けの実験的なものです。
- 本番利用時は十分な検証を推奨します。

## ライセンス

MIT
