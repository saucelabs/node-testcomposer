# @saucelabs/testcomposer

Sauce Labs SDK for the Test-Composer API.

# Usage

## Initial TestComposer Client
```javascript
const { TestComposer } = require('@saucelabs/testcomposer');

const client = new TestComposer({
  region: 'us-west-1',
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  headers: {'User-Agent': `your-fancy-reporter/1.2.3`}
});
```

## Create Reports for JavaScript Batch Frameworks

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

## Upload log for JavaScript Batch Frameworks

The minimum `sauce-test-report.json` file to fullfill the web UI:

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
    filename: "log.json",
    data: fs.createReadStream("log.json")
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

## Upload Log for Selenium job

The minimum `log.json` file to fullfill the web UI:

```json
[
	{
    "screenshot": null,
    "suggestion_values": [

    ],
    "start_time": 1688673799.516,
    "request": {
      "using": "css selector",
      "value": "[id=\"onetrust-accept-btn-handler\"]"
    },
    "result": {
      "message": "no such element",
      "error": "no such element"
    },
    "duration": 0.01900005340576172,
    "path": "element",
    "HTTPStatus": 404,
    "method": "POST",
    "statusCode": 1
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
