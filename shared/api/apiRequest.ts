// shared/api/apiRequest.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { handleError } from './handleError';

export type RetryConfig = {
    retry?: boolean;
    retryCount?: number;
    retryDelay?: number;
    retryCondition?: (error: any) => boolean;
}

export type ApiRequestConfig = AxiosRequestConfig & RetryConfig

export async function apiRequest<T = any>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string,
  config: ApiRequestConfig = {}
): Promise<T> {
  const {
    retry = false,
    retryCount = 2,
    retryDelay = 1000,
    retryCondition = () => false,
    ...axiosConfig
  } = config;

  let attempts = 0;
  let lastError: any;

  while (attempts <= retryCount) {
    try {
      const response: AxiosResponse<T> = await axios({
        method,
        url,
        ...axiosConfig,
      });

      return response.data;
    } catch (error: any) {
      lastError = error;

      const shouldRetry = retry && retryCondition(error);
      const isLastAttempt = attempts === retryCount;

      if (!shouldRetry || isLastAttempt) {
        return handleError(error, method, url);
      }

      attempts++;
      await new Promise((res) => setTimeout(res, retryDelay));
    }
  }

  throw lastError;
}
