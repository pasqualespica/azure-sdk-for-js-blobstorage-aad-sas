# azure-sdk-for-js-blobstorage-aad-sas

- [azure-sdk-for-js-blobstorage-aad-sas](#azure-sdk-for-js-blobstorage-aad-sas)
  - [Prerequisites](#prerequisites)
  - [Get started](#get-started)
  - [Type of connections to Azure Blob Storage](#type-of-connections-to-azure-blob-storage)
    - [Basic](#basic)
    - [With connection string](#with-connection-string)
    - [With Azure AD](#with-azure-ad)
    - [Anonymous credentials (SAS) _shared access signature_](#anonymous-credentials-sas-shared-access-signature)
  - [How to run examples](#how-to-run-examples)

## Prerequisites

- [Node.js and npm](https://nodejs.org/en/) installed

## Get started

Copy and rename the `sample.env` file into `.env`.

Then change the values of the environment variables based on desired service (_see list below for details_) present on your [Azure portal account](https://azure.microsoft.com/it-it/account/).

After that in the folder where the file `package.json` is present, typing the following command :

```sh
npm i
```

## Type of connections to Azure Blob Storage

The following sections show the only necessary parameters (`.env`) for the [Azure blob storage](https://docs.microsoft.com/it-it/azure/storage/blobs/storage-blobs-introduction) services

### Basic

```js
ACCOUNT_NAME;
ACCOUNT_KEY;
```

### With connection string

```js
STORAGE_CONNECTION_STRING;
```

### With Azure AD

```js
ACCOUNT_NAME;
AZURE_TENANT_ID;
AZURE_CLIENT_ID;
AZURE_CLIENT_SECRET;
```

### Anonymous credentials (SAS) _shared access signature_

```js
ACCOUNT_NAME;
ACCOUNT_SAS;
```

## How to run examples

To run one of previous examples just typing the following command from the terminal where the script file `.js` is present :

```
node <file-name>.js
```
