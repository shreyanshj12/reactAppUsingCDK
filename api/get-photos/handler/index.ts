//8. Define code for lambda fun inside /api/get-photos/index.ts

import {
    APIGatewayProxyEventV2,
    Context,
    APIGatewayProxyResultV2,
} from "aws-lambda";

export async function getPhotos(
    event: APIGatewayProxyEventV2,
    context: Context
): Promise<APIGatewayProxyResultV2> {
    console.log("React app bucket name is: " + process.env.BUCKET_NAME);
    return {
        statusCode: 200,
        body: "Hello from lambda, it is alive!",
    };
}
