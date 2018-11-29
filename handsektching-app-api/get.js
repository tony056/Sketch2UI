import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context) {
  const params = {
    TableName: "handsketchings",
    // 'Key' defines the partition key and sort key of the item to be retrieved
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    KeyConditionExpression: "userId = :userId",
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const task = event.pathParameters.id;
    const result = await dynamoDbLib.call("query", params);

    if (result) {
      // Return the retrieved item
      const filteredResult = result.Items.filter(({ attachment }) => attachment.toLowerCase().startsWith(`${task}_`));
      return success({ count: filteredResult.length });
    } else {
      return success({ count: 0 });
    }
  } catch (e) {
    return failure({ status: false });
  }
}
