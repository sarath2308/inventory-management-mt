import {
  SSMClient,
  GetParametersByPathCommand,
  Parameter,
  GetParametersByPathCommandOutput,
} from "@aws-sdk/client-ssm";

const client = new SSMClient({ region: process.env.AWS_REGION || "ap-south-1" });

export async function loadConfigFromSSM() {
  const path = `/inventory-management/prod/`;
  const isProduction = process.env.NODE_ENV === "production";

  let nextToken: string | undefined = undefined;
  let allParams: Parameter[] = [];

  try {
    do {
      const command = new GetParametersByPathCommand({
        Path: path,
        WithDecryption: true,
        Recursive: true,
        NextToken: nextToken,
      });

      const response: GetParametersByPathCommandOutput = await client.send(command);

      if (response.Parameters) {
        allParams.push(...response.Parameters);
      }

      nextToken = response.NextToken;
    } while (nextToken);

    if (allParams.length === 0) {
      if (isProduction) {
        throw new Error(`No parameters found in SSM at path ${path}`);
      }
      console.warn(`⚠️  No SSM parameters found at ${path}. Using environment variables.`);
      return;
    }

    for (const param of allParams) {
      const key = param.Name!.split("/").pop()!;
      if (!process.env[key]) {
        process.env[key] = param.Value!;
      }
    }
    
    console.log(`✅ Loaded ${allParams.length} parameters from SSM`);
  } catch (err) {
    if (isProduction) {
      throw new Error(`Failed to load SSM params from ${path}: ${String(err)}`);
    }
    console.warn(`⚠️  Failed to load SSM params: ${String(err)}. Falling back to environment variables.`);
  }
}