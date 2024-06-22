import axios from 'axios';
import {Alert, NativeEventEmitter, Platform} from 'react-native';
// import moment from 'moment';
import RNFS from 'react-native-fs';
import { logger, fileAsyncTransport } from "react-native-logs";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showSnackbar } from '../utils/helper';
import { API_Key, API_Uri } from './constant';

let errorLogsPath = "";

if (Platform.OS == 'android') {
  errorLogsPath = RNFS.ExternalDirectoryPath + '/Error logs';
} else {
  errorLogsPath = RNFS.DocumentDirectoryPath + '/Error logs';
}

RNFS.exists(errorLogsPath).then(async (isExist:any) => {
  //If dir not exsist then create directory
  if (!isExist) {
    await RNFS.mkdir(errorLogsPath);
  }
})

const eventEmitter = new NativeEventEmitter();

let today = new Date();
let date = today.getDate();
let month = today.getMonth() + 1;
let year = today.getFullYear();

const errorLogsFileName = `utwin_logs_${date}-${month}-${year}.${'txt'}`;

export const getAccessToken = async () => {
  try {
    const tokenDataStr = API_Key
    if (tokenDataStr !== null) {
      return `Bearer ${tokenDataStr}`;
    } else {
      return null;
    }
  } catch (err) {
  }
};

const authClient = axios.create({
  baseURL: API_Uri,
  headers: {
    Accept: 'application/json',
    'x-api-key': API_Key,
    // lastSyncTime: moment().format('yyyy-MM-DD HH:mm:ss'),
  },
  // data:{}
});
const formDataAuthClient = axios.create({
  baseURL: API_Uri,
  headers: {
    Accept: 'application/json',
    'Content-Type': "multipart/form-data"
    // lastSyncTime: moment().format('yyyy-MM-DD HH:mm:ss'),
  },
  // data:{}
});

const getAuthClient = async () => {
  authClient.defaults.headers.common.Authorization = await getAccessToken();
  return authClient;
};
const getFormDataAuthClient = async () => {
  formDataAuthClient.defaults.headers.common.Authorization = await getAccessToken();
  return formDataAuthClient;
};

function getUrl(config:any) {
  if (config?.baseURL) {
    return config.url.replace(config.baseURL, '');
  }
  return config?.url;
}
let isRefreshing = false;
let failedQueue:[] = [];

const processQueue = (error:any, token = null) => {
  failedQueue.forEach((prom:any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

// Intercept all requests
authClient.interceptors.request.use(
  (config) => {
    console.log(
      `## ${config?.method?.toUpperCase()} - [${getUrl(config)}] ==>`,
      config,
    );
    return config;
  },
  (error) => Promise.reject(error),
);
// Intercept all responses
authClient.interceptors.response.use(
  
  async (response) => {
    if (response.status === 401) {
      try {
        console.log('Auth Error');
      } catch (error) {
      }
    }
    
    console.log(
      `## ${response.status} - [${getUrl(response.config)}] ==> \n`,
      response?.data,
    );
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if(error.response?.status === 400){
      if(error.response?.data.code == 400){
        var sizeInbytes = parseInt(error.response?.data.data);
        var sizeInKb = Math.round((sizeInbytes / Math.pow(1024,1)));
      } 
    }
  
    if (error.response?.status === 429) {
      showSnackbar('Too many requests. Please try again later.');
    }

    if(error.response?.status === 401){
      showSnackbar('Your session is expired, Please login again');
      eventEmitter.emit("onSessionExpired", { sessionExpired: true  });
    }
    console.log(
      `>>>## ${error.response?.status} - [${getUrl(error.response?.config)}] ==>`,
      error.response,
    );

    // return all
    return Promise.reject(error);
  },
);
formDataAuthClient.interceptors.request.use(
  (config) => {
    console.log(
      `## ${config?.method?.toUpperCase()} - [${getUrl(config)}] ==>`,
      config,
    );
    return config;
  },
  (error) => Promise.reject(error),
);
// Intercept all responses
formDataAuthClient.interceptors.response.use(
  
  async (response) => {
    if (response.status === 401) {
      try {
        console.log('Auth Error');
      } catch (error) {
      }
    }
    
    console.log(
      `## ${response.status} - [${getUrl(response.config)}] ==> \n`,
      response?.data,
    );
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if(error.response?.status === 400){
      if(error.response?.data.code == 400){
        var sizeInbytes = parseInt(error.response?.data.data);
        var sizeInKb = Math.round((sizeInbytes / Math.pow(1024,1)));
      } 
    }
  
    if (error.response?.status === 429) {
      showSnackbar('Too many requests. Please try again later.');
    }

    if(error.response?.status === 401){
      showSnackbar('Your session is expired, Please login again');
      eventEmitter.emit("onSessionExpired", { sessionExpired: true  });
    }
    console.log(
      `>>>## ${error.response?.status} - [${getUrl(error.response?.config)}] ==>`,
      error.response,
    );

    // return all
    return Promise.reject(error);
  },
);

/**
 * description
 */
const httpClient = axios.create({
  baseURL: API_Uri,
  headers: {
    Accept: 'application/json',
    // lastSyncTime: moment().format('yyyy-MM-DD HH:mm:ss'),
  },
  
});
// Intercept all requests
httpClient.interceptors.request.use(
  (config) => {
    // console.log(
    //   `## ${config.method.toUpperCase()} - [${getUrl(config)}] =>>`,
    //   config.headers,
    // );
    return config;
  },
  (error) => Promise.reject(error),
);
// Intercept all responses
httpClient.interceptors.response.use(
  async (response) => {
    // console.log('### response >', response);
    if (response.status === 401) {
      try {
        // const value = await AsyncStorage.getItem('tokenData');
        // if (value !== null) {
        //   // We have data!!
        //   // AsyncStorage.clear();
        //   // NavigationService.navigate('AuthStackScreen');
        // }
      } catch (error) {
        // Error retrieving data
        // console.log('!!!->1', error);
        // console.log(error, 'logged in client error');
      }
    }
    // console.log(
    //   `### ${response.status} - [${getUrl(response.config)}] =>> \n`,
    //   response?.data,
    // );
    return response;
  },
  (error) => {
    // console.log('!!! -> 2', error?.response?.data, error?.response?.status);
    // console.log(
    //   `### ${error.status} - [${getUrl(response.config)}] =>> \n`,
    //   response?.data,
    // );
    // if (error?.response?.status === 400) {
    //   Alert.alert('Error.', error?.response?.data);
    // }
    if (error?.response?.status === 429) {
      showSnackbar('Too many requests. Please try again later.');
    }
    // console.log(
    //   `### ${error?.response?.status} - [${getUrl(error.response.config)}] ==>`,
    //   error.response,
    // );
    return Promise.reject(error);
  },
);
class ErrorObj extends Error {
  code: any;
  constructor(args:any) {
    super(args);
    this.name = 'ERROR';
    this.code = args?.code;
    this.message = args?.message;
  }
}

const ErrorLogsWrite = (errorInfo: any, params: any, caseId: any, res: any, url: any, source: string) => {
  const config = {
    severity: "debug",
      transport: fileAsyncTransport,
      transportOptions: {
        FS: RNFS,
        filePath: errorLogsPath,
        fileName: errorLogsFileName,
      },
  };

  var log = logger.createLogger(config);
  if(source){
    log.info("[" + source + "]");
  }
  if(url){
    log.info("API URL: ", url); 
  }
  if(caseId){
    log.info("CASE ID: ", caseId);
  }
  if(params){
    log.info("REQUEST: ", params);
  }
  if(res){
    log.info("RESPONSE: ", res);
  }
  if(errorInfo){
    log.info(errorInfo);
  }

  log.info("\n\n");
}

function globalErrHandler(err: any) {
  console.error(">>> globalErrHandler before process: ", err);
  ErrorLogsWrite(err, null, null, null, null, "<ERROR> globalErrHandler before process");
  let error = err?.response?.data;
  if (err.response && err.response?.data?.hasOwnProperty('message')) {
    error = err?.response?.data;
  } else if (!err.hasOwnProperty('message')) {
    error = err.toJSON();
  }
  console.error(">>> globalErrHandler after process: ", error);
  ErrorLogsWrite(error, null, null, null, null, "<ERROR> globalErrHandler after process");
  return new ErrorObj(error);
}

export {httpClient, authClient, getAuthClient, globalErrHandler, ErrorLogsWrite, errorLogsPath, errorLogsFileName, getFormDataAuthClient};
