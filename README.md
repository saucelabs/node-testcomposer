# @saucelabs/testcomposer

Sauce Labs SDK for the Test-Composer API.

# Usage

## Create Reports

```javascript
const {Region, TestComposer} = require('@saucelabs/testcomposer');

const client = new TestComposer({
  region: Region.USWest1,
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  headers: {'User-Agent': `your-fancy-reporter/1.2.3`}
});

const job = await client.createReport({
  name: "My Fancy Job!",
  passed: true,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  browserName: "Chrome",
  browserVersion: "105",
  framework: "playwright",
  frameworkVersion: "1.25.0",
  platformName: "Windows 11"
});
console.log(job.id); // the job ID
console.log(job.url); // the full URL of the job
```

## Upload Assets

```javascript
const Readable = require('stream').Readable;

const client = new TestComposer({
  region: Region.USWest1,
  username: process.env.SAUCE_USERNAME,
  accessKey: process.env.SAUCE_ACCESS_KEY,
  headers: {'User-Agent': `your-fancy-reporter/1.2.3`}
});

const s = new Readable();
s.push('hello!');
s.push(null);

const uploads = await client.uploadAssets(job.id, [{filename: "console.log", data: s}]);
// Upon success, the array `uploads.uploaded` will equal in length to the number of assets you intended to upload.
// Individual assets that fail to upload will be reported via `uploads.errors`.
```
