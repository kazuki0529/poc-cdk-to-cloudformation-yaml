import { S3Event, Handler } from 'aws-lambda';

/**
 * S3イベントを受け取り、内容をログ出力するLambda関数。
 */
export const handler: Handler<S3Event> = async (event: S3Event) => {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};