/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createS3FileMessage = /* GraphQL */ `
  mutation CreateS3FileMessage($input: CreateS3FileInput!) {
    createS3FileMessage(input: $input) {
      id_concat
      key_name
      bucket_name
      last_modified
      size
      tenant_id
      url
      user_id
    }
  }
`;
export const updateS3FileMessage = /* GraphQL */ `
  mutation UpdateS3FileMessage($input: UpdateS3FileInput!) {
    updateS3FileMessage(input: $input) {
      id_concat
      key_name
      bucket_name
      last_modified
      size
      tenant_id
      url
      user_id
    }
  }
`;
export const deleteS3FileMessage = /* GraphQL */ `
  mutation DeleteS3FileMessage($input: DeleteS3FileInput!) {
    deleteS3FileMessage(input: $input) {
      id_concat
      key_name
      bucket_name
      last_modified
      size
      tenant_id
      url
      user_id
    }
  }
`;
export const createS3File = /* GraphQL */ `
  mutation CreateS3File(
    $input: CreateS3FileInput!
    $condition: ModelS3FileConditionInput
  ) {
    createS3File(input: $input, condition: $condition) {
      id_concat
      key_name
      bucket_name
      last_modified
      size
      tenant_id
      url
      user_id
    }
  }
`;
export const updateS3File = /* GraphQL */ `
  mutation UpdateS3File(
    $input: UpdateS3FileInput!
    $condition: ModelS3FileConditionInput
  ) {
    updateS3File(input: $input, condition: $condition) {
      id_concat
      key_name
      bucket_name
      last_modified
      size
      tenant_id
      url
      user_id
    }
  }
`;
export const deleteS3File = /* GraphQL */ `
  mutation DeleteS3File(
    $input: DeleteS3FileInput!
    $condition: ModelS3FileConditionInput
  ) {
    deleteS3File(input: $input, condition: $condition) {
      id_concat
      key_name
      bucket_name
      last_modified
      size
      tenant_id
      url
      user_id
    }
  }
`;
