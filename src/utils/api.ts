import axios, { AxiosRequestConfig } from 'axios';
import { apiBaseUrl } from '../config';

export default (function() {
  const partitionType = "db_nosql";

  return {
    getNewToken: async (user_id: string, tenant_id: string, headers?: object) => {
      const url = `${apiBaseUrl}/token`;
      const config = {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'x-tenant-id': tenant_id,
          'x-user-id': user_id,
          'Access-Control-Allow-Origin': '*',
        }
      };
      console.log(config);
      
      return axios.get(url, config);
    },
    putObject: async (object: File, headers?: object) => {
      console.log(object);
      const fileName = object.name;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(object);

      fileReader.onload = () => {
        // console.log("fileReader result", fileReader.result as string);

        const url = `${apiBaseUrl}/object?partition=${partitionType}`;

        const data = {
          key: fileName,
          value: fileReader.result?.toString().replace(/data:\w+\/\w+;base64,/, ''),
          content_type: object.type,
        };
        // console.log(data);
  
        const config = {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        };
        console.log(config);
  
        return axios.put(url, data, config);
      }
    },
    getObject: async (object: File, headers?: object) => {
      console.log(object);
      const fileName = object.name;

      const fileReader = new FileReader();
      fileReader.readAsDataURL(object);

      fileReader.onload = () => {
        // console.log("fileReader result", fileReader.result as string);

        const url = `${apiBaseUrl}/object?partition=${partitionType}`;

        const data = {
          key: fileName,
          value: fileReader.result?.toString().replace(/data:\w+\/\w+;base64,/, ''),
          content_type: object.type,
        };
        // console.log(data);
  
        const config = {
          headers: {
            ...headers,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          }
        };
        console.log(config);
  
        return axios.put(url, data, config);
      }
    },
    getObjectList: async (headers?: object) => {
      const url = `${apiBaseUrl}/object?partition=${partitionType}`;
      // console.log(data);

      const config = {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      };
      console.log(config);

      return axios.get(url, config);
    },
    downloadFile: (bucket_name: string, key_name: string, headers?: object) => {
      const url = `${apiBaseUrl}/download`;
      const config: AxiosRequestConfig = {
        headers: {
          ...headers,
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        params: {
          'bucket_name': bucket_name,
          'key_name': key_name,
        }
      };
      console.log(config);
      
      return axios.get(url, config);
    }
  }

}());
