/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateS3FileInput = {
  id_concat: string,
  key_name: string,
  bucket_name?: string | null,
  last_modified?: string | null,
  size?: number | null,
  tenant_id?: string | null,
  url?: string | null,
  user_id?: string | null,
};

export type ModelS3FileConditionInput = {
  id_concat?: ModelStringInput | null,
  key_name?: ModelStringInput | null,
  bucket_name?: ModelStringInput | null,
  last_modified?: ModelStringInput | null,
  size?: ModelIntInput | null,
  tenant_id?: ModelStringInput | null,
  url?: ModelStringInput | null,
  user_id?: ModelStringInput | null,
  and?: Array< ModelS3FileConditionInput | null > | null,
  or?: Array< ModelS3FileConditionInput | null > | null,
  not?: ModelS3FileConditionInput | null,
};

export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export type UpdateS3FileInput = {
  id_concat?: string | null,
  key_name?: string | null,
  bucket_name?: string | null,
  last_modified?: string | null,
  size?: number | null,
  tenant_id?: string | null,
  url?: string | null,
  user_id?: string | null,
};

export type DeleteS3FileInput = {
  id_concat: string,
  key_name: string,
};

export type ModelS3FileFilterInput = {
  id_concat?: ModelStringInput | null,
  key_name?: ModelStringInput | null,
  bucket_name?: ModelStringInput | null,
  last_modified?: ModelStringInput | null,
  size?: ModelIntInput | null,
  tenant_id?: ModelStringInput | null,
  url?: ModelStringInput | null,
  user_id?: ModelStringInput | null,
  and?: Array< ModelS3FileFilterInput | null > | null,
  or?: Array< ModelS3FileFilterInput | null > | null,
  not?: ModelS3FileFilterInput | null,
};

export type CreateS3FileMutationVariables = {
  input: CreateS3FileInput,
  condition?: ModelS3FileConditionInput | null,
};

export type CreateS3FileMutation = {
  createS3File:  {
    __typename: "S3File",
    id_concat: string,
    key_name: string,
    bucket_name: string | null,
    last_modified: string | null,
    size: number | null,
    tenant_id: string | null,
    url: string | null,
    user_id: string | null,
  } | null,
};

export type UpdateS3FileMutationVariables = {
  input: UpdateS3FileInput,
  condition?: ModelS3FileConditionInput | null,
};

export type UpdateS3FileMutation = {
  updateS3File:  {
    __typename: "S3File",
    id_concat: string,
    key_name: string,
    bucket_name: string | null,
    last_modified: string | null,
    size: number | null,
    tenant_id: string | null,
    url: string | null,
    user_id: string | null,
  } | null,
};

export type DeleteS3FileMutationVariables = {
  input: DeleteS3FileInput,
  condition?: ModelS3FileConditionInput | null,
};

export type DeleteS3FileMutation = {
  deleteS3File:  {
    __typename: "S3File",
    id_concat: string,
    key_name: string,
    bucket_name: string | null,
    last_modified: string | null,
    size: number | null,
    tenant_id: string | null,
    url: string | null,
    user_id: string | null,
  } | null,
};

export type GetS3FileQueryVariables = {
  id_concat: string,
};

export type GetS3FileQuery = {
  getS3File:  {
    __typename: "S3File",
    id_concat: string,
    key_name: string,
    bucket_name: string | null,
    last_modified: string | null,
    size: number | null,
    tenant_id: string | null,
    url: string | null,
    user_id: string | null,
  } | null,
};

export type ListS3FilesQueryVariables = {
  filter?: ModelS3FileFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListS3FilesQuery = {
  listS3Files:  {
    __typename: "ModelS3FileConnection",
    items:  Array< {
      __typename: "S3File",
      id_concat: string,
      key_name: string,
      bucket_name: string | null,
      last_modified: string | null,
      size: number | null,
      tenant_id: string | null,
      url: string | null,
      user_id: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateS3FileSubscription = {
  onCreateS3File:  {
    __typename: "S3File",
    id_concat: string,
    key_name: string,
    bucket_name: string | null,
    last_modified: string | null,
    size: number | null,
    tenant_id: string | null,
    url: string | null,
    user_id: string | null,
  } | null,
};

export type OnUpdateS3FileSubscription = {
  onUpdateS3File:  {
    __typename: "S3File",
    id_concat: string,
    key_name: string,
    bucket_name: string | null,
    last_modified: string | null,
    size: number | null,
    tenant_id: string | null,
    url: string | null,
    user_id: string | null,
  } | null,
};

export type OnDeleteS3FileSubscription = {
  onDeleteS3File:  {
    __typename: "S3File",
    id_concat: string,
    key_name: string,
    bucket_name: string | null,
    last_modified: string | null,
    size: number | null,
    tenant_id: string | null,
    url: string | null,
    user_id: string | null,
  } | null,
};
