# Create Reports for JavaScript Frameworks

Learn how to generate reports for JavaScript frameworks like Cypress, Playwright, and TestCafe.

## Create Reports

```javascript
const job = await client.createReport({
  name: 'My Fancy Playwright Job!',
  passed: true,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  browserName: 'Chrome',
  browserVersion: '105',
  framework: 'playwright', // alternatives: cypress, playwright, testcafe
  frameworkVersion: '1.25.0',
  platformName: 'Windows 11',
});

console.log(job.id); // the job ID
console.log(job.url); // the full URL of the job
```

## Upload Log

In order to view your test results in the SauceLabs web app, you must upload a test report file along with the report created in the step above. You can use the [sauce-json-reporter](https://github.com/saucelabs/sauce-json-reporter-js) library to generate the test report programmatically or manually create the json file according to the report schema defined [here](https://github.com/saucelabs/sauce-json-reporter-js/blob/main/api/schema.json).

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
const uploads = await client.uploadAssets(job.id, [
  {
    filename: 'sauce-test-report.json',
    data: fs.createReadStream('sauce-test-report.json'),
  },
]);
// Upon success, the array `uploads.uploaded` will equal in length to the number of assets you intended to upload.
// Individual assets that fail to upload will be reported via `uploads.errors`.
```
