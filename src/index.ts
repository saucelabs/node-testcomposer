import axios, {AxiosRequestConfig} from "axios";
import FormData from "form-data";
import * as stream from "stream";

// The Sauce Labs region.
export type Region = 'us-west-1' | 'us-east-4' | 'eu-central-1' | 'staging';

const apiURLMap = new Map<Region, string>([
    ['us-west-1', 'https://api.us-west-1.saucelabs.com/v1/testcomposer'],
    ['us-east-4', 'https://api.us-east-4.saucelabs.com/v1/testcomposer'],
    ['eu-central-1', 'https://api.eu-central-1.saucelabs.com/v1/testcomposer'],
    ['staging', 'https://api.staging.saucelabs.net/v1/testcomposer']
  ]
);

const appURLMap = new Map<Region, string>([
    ['us-west-1', 'https://app.saucelabs.com'],
    ['us-east-4', 'https://app.us-east-4.saucelabs.com'],
    ['eu-central-1', 'https://app.eu-central-1.saucelabs.com'],
    ['staging', 'https://app.staging.saucelabs.net']
  ]
);

export interface Options {
  region: Region
  username: string
  accessKey: string
  // Providing a User-Agent header is highly recommended.
  headers?: Record<string, string | number | boolean>
}

export interface CreateReportRequest {
  // Name of the job.
  name: string
  // Optional browser name.
  browserName?: string
  // Optional browser version.
  browserVersion?: string
  // OS Name and Version, e.g. 'Windows 11'.
  platformName: string
  // Name of the test framework.
  framework: string
  // Version of the test framework.
  frameworkVersion: string
  // Did all tests pass?
  passed: boolean
  // The job start time in ISO_8601 (YYYY-MM-DDTHH:mm:ss.sssZ)
  startTime: string
  // The job end time in ISO_8601 ('YYYY-MM-DDTHH:mm:ss.sssZ')
  endTime: string
  // Optional association with a build name.
  build?: string
  // Optional tags that may help you filter jobs.
  tags?: string[]
}

interface CreateReportResponse {
  ID: string
}

export interface Asset {
  // The asset will be persisted in Sauce Labs with the given filename.
  filename: string
  // The data backing the file.
  data: stream.Readable
}

export interface UploadAssetResponse {
  // List of filenames that were successfully uploaded.
  uploaded: string[]
  // List of error messages, should any files have failed to upload.
  errors?: string[]
}

export class TestComposer {
  private readonly opts: Options
  private readonly requestConfig: AxiosRequestConfig

  private readonly url: string

  constructor(opts: Options) {
    this.opts = opts;
    this.url = apiURLMap.get(opts.region) || 'us-west-1';
    this.requestConfig = {auth: {username: this.opts.username, password: this.opts.accessKey}, headers: opts.headers};
  }

  /**
   * Create a report in form of a job on Sauce Labs.
   * @param req Job metadata.
   */
  async createReport(req: CreateReportRequest) {
    const resp = await axios.post(this.url + '/reports', req, this.requestConfig);

    const id = (resp.data as CreateReportResponse).ID;
    return {id: id, url: appURLMap.get(this.opts.region) + '/tests/' + id};
  }

  /**
   * Upload assets.
   * @param jobId The job ID the assets should be attached to.
   * @param assets The assets to upload.
   */
  async uploadAssets(jobId: string, assets: Asset[]) {
    const form = new FormData();
    for (const asset of assets) {
      form.append('file', asset.data, {filename: asset.filename});
    }

    const resp = await axios.put(this.url + `/jobs/${jobId}/assets`, form, this.requestConfig);

    return resp.data as UploadAssetResponse;
  }
}
