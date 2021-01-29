/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateS3File = /* GraphQL */ `
  subscription OnCreateS3File {
    onCreateS3File {
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
export const onUpdateS3File = /* GraphQL */ `
  subscription OnUpdateS3File {
    onUpdateS3File {
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
export const onDeleteS3File = /* GraphQL */ `
  subscription OnDeleteS3File {
    onDeleteS3File {
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
export const onCreateS3FileMessage = /* GraphQL */ `
  subscription OnCreateS3FileMessage {
    onCreateS3FileMessage {
      tenant_id
    }
  }
`;
export const onUpdateS3FileMessage = /* GraphQL */ `
  subscription OnUpdateS3FileMessage {
    onUpdateS3FileMessage {
      tenant_id
    }
  }
`;
export const onDeleteS3FileMessage = /* GraphQL */ `
  subscription OnDeleteS3FileMessage {
    onDeleteS3FileMessage {
      tenant_id
    }
  }
`;
