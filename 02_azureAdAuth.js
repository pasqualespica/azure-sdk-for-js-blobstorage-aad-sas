// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

/*
  ONLY AVAILABLE IN NODE.JS RUNTIME
  Setup :
    - Reference - Authorize access to blobs and queues with Azure Active Directory from a client application 
      - https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-app
 
    - Register a new AAD application and give permissions to access Azure Storage on behalf of the signed-in user
      - Register a new application in the Azure Active Directory(in the azure-portal) - https://docs.microsoft.com/en-us/azure/active-directory/develop/quickstart-register-app
      - In the `API permissions` section, select `Add a permission` and choose `Microsoft APIs`. 
      - Pick `Azure Storage` and select the checkbox next to `user_impersonation` and then click `Add permissions`. This would allow the application to access Azure Storage on behalf of the signed-in user.
    - Grant access to Azure Blob data with RBAC in the Azure Portal 
      - RBAC roles for blobs and queues - https://docs.microsoft.com/en-us/azure/storage/common/storage-auth-aad-rbac-portal.
      - In the azure portal, go to your storage-account and assign **Storage Blob Data Contributor** role to the registered AAD application from `Access control (IAM)` tab (in the left-side-navbar of your storage account in the azure-portal). 
    
    - Environment setup for the sample
      - From the overview page of your AAD Application, note down the `CLIENT ID` and `TENANT ID`. In the "Certificates & Secrets" tab, create a secret and note that down.
      - Make sure you have AZURE_TENANT_ID, AZURE_CLIENT_ID, AZURE_CLIENT_SECRET as environment variables to successfully execute the sample(Can leverage process.env).
*/

const { BlobServiceClient } = require('@azure/storage-blob');
const { DefaultAzureCredential } = require('@azure/identity');
const { AbortController } = require('@azure/abort-controller');

// Load the .env file if it exists
require('dotenv').config();

const ONE_MINUTE = 60 * 1000;

async function main() {
  const aborter = AbortController.timeout(30 * ONE_MINUTE);

  // Enter your storage account name
  const account = process.env.ACCOUNT_NAME || '';

  // Azure AD Credential information is required to run this sample:
  if (
    !process.env.AZURE_TENANT_ID ||
    !process.env.AZURE_CLIENT_ID ||
    !process.env.AZURE_CLIENT_SECRET
  ) {
    console.warn(
      'Azure AD authentication information not provided, but it is required to run this sample. Exiting.'
    );
    return;
  }

  // ONLY AVAILABLE IN NODE.JS RUNTIME
  // DefaultAzureCredential will first look for Azure Active Directory (AAD)
  // client secret credentials in the following environment variables:
  //
  // - AZURE_TENANT_ID: The ID of your AAD tenant
  // - AZURE_CLIENT_ID: The ID of your AAD app registration (client)
  // - AZURE_CLIENT_SECRET: The client secret for your AAD app registration
  //
  // If those environment variables aren't found and your application is deployed
  // to an Azure VM or App Service instance, the managed service identity endpoint
  // will be used as a fallback authentication source.
  const defaultAzureCredential = new DefaultAzureCredential();

  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`,
    defaultAzureCredential
  );

  // Create a container
  // const containerName = `daje1newcontainer${new Date().getTime()}`;
  // const createContainerResponse = await blobServiceClient
  //   .getContainerClient(containerName)
  //   .create();
  // console.log(`Created container ${containerName} successfully`, createContainerResponse.requestId);

  // List blobs
  const containerName = 'psp1';
  const containerClient = blobServiceClient.getContainerClient(containerName);

  console.log('4:>>>      List blobs ...');
  i = 1;
  for await (const blob of containerClient.listBlobsFlat()) {
    console.log(`Blob ${i++}: ${blob.name}`);
  }

  console.log('...');
  console.log('...');
  console.log('...');

  // Get blob
  // const downloadBlockBlobResponse = await blobServiceClient
  //   .getContainerClient(`psp1`)
  //   .getBlobClient(`FL_insurance_sample.csv`)
  //   .download(0);
  // console.log(
  //   "Downloaded blob content",
  //   await streamToString(downloadBlockBlobResponse.readableStreamBody)
  // );

  // Get blob content from position 0 to the end
  // In Node.js, get downloaded data by accessing downloadBlockBlobResponse.readableStreamBody
  // In browsers, get downloaded data by accessing downloadBlockBlobResponse.blobBody
  const blobName = 'FL_insurance_sample.csv';
  blockBlobClient = containerClient.getBlockBlobClient(blobName);

  console.time('download-blob');
  const downloadResponse = await blockBlobClient.download(0, aborter);
  const downloadedContent = await streamToString(
    downloadResponse.readableStreamBody
  );
  console.log(`Downloaded blob content: "${downloadedContent}"`);
  console.timeEnd('download-blob');
}

async function streamToString(readableStream) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    readableStream.on('data', (data) => {
      chunks.push(data.toString());
    });
    readableStream.on('end', () => {
      resolve(chunks.join(''));
    });
    readableStream.on('error', reject);
  });
}

main().catch((err) => {
  console.error('Error running sample:', err.message);
});
