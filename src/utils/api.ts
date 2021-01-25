import axios from 'axios';
import { apiBaseUrl } from '../config';

const MasterControlAPI = (function() {
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
    uploadFile: async (file: File, headers?: object) => {
      console.log(file);
      const fileName = file.name;

      // const fileBuffer = await file.arrayBuffer();
      // var uint8View = new Uint8Array(fileBuffer);
      // console.log(uint8View);
      // // const fileData = String.fromCharCode.apply(null, new Uint8Array(fileBuffer) as any);
      // const fileData = new TextDecoder().decode(fileBuffer);
      // // console.log(fileData);

      // const url = `${apiBaseUrl}/object?partition=prefix`;

      // const data = {
      //   key: fileName,
      //   value: uint8View,
      // };
      // console.log(data);

      // const config = {
      //   headers: {
      //     ...headers,
      //     'Content-Type': 'application/json',
      //     'Access-Control-Allow-Origin': '*',
      //   }
      // };
      // console.log(config);

      // return axios.put(url, data, config);

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        // console.log("fileReader result", fileReader.result as string);

        const url = `${apiBaseUrl}/object?partition=db_nosql`;

        const data = {
          key: fileName,
          value: fileReader.result?.toString().replace(/data:\w+\/\w+;base64,/, ''),
          content_type: file.type,
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
  }

}());

export default MasterControlAPI;