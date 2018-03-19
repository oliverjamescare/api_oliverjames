# Push notifications

Short description about push notifications structure.


## Notification payload 

Notification structure:

title - notification title \
body - notification description \
sound - sound enabled / disabled \
target - targets: job_details, new_jobs, home \
job_id - target job id, can be null

```json
{
  "title": "Cancelled job!",
  "body": "A job you accepted has been cancelled",
  "sound": true,
  "target": "job_details",
  "job_id": "87492093dfjdnfs"
}
```
