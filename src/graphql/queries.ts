/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getS3File = /* GraphQL */ `
  query GetS3File($id_concat: String!) {
    getS3File(id_concat: $id_concat) {
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
export const listS3Files = /* GraphQL */ `
  query ListS3Files(
    $filter: ModelS3FileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listS3Files(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id_concat
        key_name
        bucket_name
        last_modified
        size
        tenant_id
        url
        user_id
      }
      nextToken
    }
  }
`;
