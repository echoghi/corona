// this adds custom jest matchers from jest-dom
import '@testing-library/jest-dom/extend-expect';
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();
