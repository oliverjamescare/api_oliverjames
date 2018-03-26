# Push notifications

Short description about push notifications structure.


## Notification payload 

Notification structure:

title - notification title \
body - notification description \
sound - sound enabled / disabled \
target - targets: job_details, new_jobs, home \
job_id - target job id, can be null \
type - notification type, available types: NEW_JOBS, JOB_CANCELLED, JOB_MODIFIED, REVIEW_PUBLISHED, PAYMENT_PROCESSED

```json
{
  "title": "Cancelled job!",
  "body": "A job you accepted has been cancelled",
  "sound": true,
  "target": "job_details",
  "job_id": "87492093dfjdnfs",
  "type": "JOB_CANCELLED"
}
```
