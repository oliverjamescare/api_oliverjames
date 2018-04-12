define({
  "name": "Oliver James API Documentation",
  "version": "0.0.1",
  "description": "",
  "title": "Oliver James API Documentation",
  "url": "http://api.oliver-james.ready4s.it/api",
  "sampleUrl": "http://api.oliver-james.ready4s.it/api",
  "footer": {
    "title": "Push Notifications",
    "content": "<h1>Push notifications</h1>\n<p>Short description about push notifications structure.</p>\n<h2>Notification payload</h2>\n<p>Notification structure:</p>\n<p>title - notification title <br>\nbody - notification description <br>\nsound - sound enabled / disabled <br>\ntarget - targets: job_details, new_jobs, home <br>\njob_id - target job id, can be null <br>\ntype - notification type, available types: NEW_JOBS, JOB_CANCELLED, JOB_MODIFIED, REVIEW_PUBLISHED, PAYMENT_PROCESSED</p>\n<pre><code class=\"language-json\">{\n  &quot;title&quot;: &quot;Cancelled job!&quot;,\n  &quot;body&quot;: &quot;A job you accepted has been cancelled&quot;,\n  &quot;sound&quot;: true,\n  &quot;target&quot;: &quot;job_details&quot;,\n  &quot;job_id&quot;: &quot;87492093dfjdnfs&quot;,\n  &quot;type&quot;: &quot;JOB_CANCELLED&quot;\n}\n</code></pre>\n"
  },
  "defaultVersion": "0.0.0",
  "apidoc": "0.3.0",
  "generator": {
    "name": "apidoc",
    "time": "2018-04-12T16:04:41.020Z",
    "url": "http://apidocjs.com",
    "version": "0.17.6"
  }
});
