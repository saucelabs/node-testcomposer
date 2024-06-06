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
  headers: { 'User-Agent': `your-fancy-reporter/1.2.3` },
});
```

## Create Reports

```javascript
const job = await client.createReport({
  name: 'My Fancy Job!',
  passed: true,
  startTime: new Date().toISOString(),
  endTime: new Date().toISOString(),
  browserName: 'Chrome',
  browserVersion: '105',
  framework: 'playwright',
  frameworkVersion: '1.25.0',
  platformName: 'Windows 11',
});
console.log(job.id); // the job ID
console.log(job.url); // the full URL of the job
```

## Upload Assets

You can upload assets to your job using the `uploadAssets` method. By uploading assets, you can include relevant files or resources that are associated with your job, such as log files, screenshots, or other supporting documentation. These assets will be accessible and viewable in the Sauce Labs web UI.

```javascript
const Readable = require('stream').Readable;

const s = new Readable();
s.push('hello!');
s.push(null);
const uploads = await client.uploadAssets(job.id, [
  { filename: 'console.log', data: s },
]);
```

## Explore More Examples

Refer to the following examples for specific frameworks:

[JavaScript Frameworks](./docs/javascript_frameworks.md): Guide on generating reports for Cypress, Playwright, and TestCafe.

[Selenium](./docs/selenium.md): Guide on generating Selenium reports.

[Espresso](./docs/espresso.md): Guide on generating Espresso reports.

[XCUITest](./docs/xcuitest.md): Guide on generating XCUITest reports.
