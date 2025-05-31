import { S3Event, Handler } from 'aws-lambda';

export const handler: Handler<S3Event> = async (event: S3Event) => {
  console.log('Received S3 event:', JSON.stringify(event, null, 2));
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};