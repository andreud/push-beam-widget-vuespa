# Pusher Beams Vue widget (Demo SPA)

## For specific users

Let users enable personalized notifications  

```
<BeamsAuthUser
    app-user-id="your_app_internal_user_id"
    auth-endpoint="your_app_url_token"
    beams-instance-id="beams_instance_id"
    debug="boolean"
/>
```

## For interests groups

Let users subscribe to public interests for batch notification delivery.

```
<BeamsSubscribeInterest 
	beams-instance-id="beams_instance_id" 
	beams-interest-id="beams_interest_id"
	debug="boolean"
/>
```
