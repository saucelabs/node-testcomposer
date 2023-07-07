# @saucelabs/testcomposer

Sauce Labs SDK for the Test-Composer API.

# Usage

## Initialize TestComposer Client
```javascript
const { TestComposer } = require('@saucelabs/testcomposer');

const client = new TestComposer({
  region: 'us-west-1',
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  headers: {'User-Agent': `your-fancy-reporter/1.2.3`}
});
```

## Create Reports for JavaScript Frameworks

```javascript

const job = await client.createReport({
  name: "My Fancy Job!",
  passed: true,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  browserName: "Chrome",
  browserVersion: "105",
  framework: "playwright", // alternatives: cypress, playwright, testcafe
  frameworkVersion: "1.25.0",
  platformName: "Windows 11"
});
console.log(job.id); // the job ID
console.log(job.url); // the full URL of the job
```

### Upload Log

In order to view your test results in the SauceLabs web app, you must upload a test report file along with the report created in the step above. You can use the [sauce-json-reporter](https://github.com/saucelabs/sauce-json-reporter-js) library to generate the test report programatically or manually create the json file according to the report schema defined [here](https://github.com/saucelabs/sauce-json-reporter-js/blob/main/api/schema.json).

```json
{
  "status": "passed",
  "attachments": [],
  "suites": [
    {
      "name": "somegroup",
      "status": "passed",
      "metadata": {},
      "suites": [
        {
          "name": "somefile.test.js",
          "status": "passed",
          "metadata": {},
          "suites": [],
          "attachments": [],
          "tests": [
            {
              "name": "yay",
              "status": "passed",
              "duration": 123,
              "startTime": "2023-07-06T22:03:19.591Z",
              "attachments": [],
              "metadata": {}
            }
          ]
        }
      ],
      "attachments": [],
      "tests": []
    }
  ],
  "metadata": {}
}
```
To upload `sauce-test-report.json`:

```javascript
const uploads = await client.uploadAssets(
  job.id,
  [{
    filename: "sauce-test-report.json",
    data: fs.createReadStream("sauce-test-report.json")
  }]
);
// Upon success, the array `uploads.uploaded` will equal in length to the number of assets you intended to upload.
// Individual assets that fail to upload will be reported via `uploads.errors`.
```

## Create Reports for Selenium

```javascript
const job = await client.createReport({
  name: "My Fancy Job!",
  passed: true,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  browserName: "Chrome",
  browserVersion: "105",
  framework: "webdriver",
  platformName: "Windows 11"
});
console.log(job.id); // the job ID
console.log(job.url); // the full URL of the job
```

### Upload Log

The minimum `log.json` file to populate the command list on Sauce Labs web UI:

```json
[
  {
    "screenshot": null,
    "suggestion_values": [
 
    ],
    "request": {

    },
    "result": {

    },
    "path": "element",
    "HTTPStatus": 200,
    "method": "POST",
    "statusCode": 0 // 0 for passed status, non-zero for failed
  }
]
```

```javascript
const uploads = await client.uploadAssets(
  job.id,
  [{
    filename: "log.json",
    data: fs.createReadStream("log.json")
  }]
);
// Upon success, the array `uploads.uploaded` will equal in length to the number of assets you intended to upload.
// Individual assets that fail to upload will be reported via `uploads.errors`.
```

## Upload Assets

You can upload additional assets to your job using the `uploadAssets` method. By uploading additional assets, you can include relevant files or resources that are associated with your job, such as log files, screenshots, or other supporting documentation. These assets will be accessible and viewable in the Sauce Labs web UI.

```javascript
const Readable = require('stream').Readable;

const s = new Readable();
s.push('hello!');
s.push(null);
const uploads = await client.uploadAssets(job.id, [{filename: "console.log", data: s}]);
```
