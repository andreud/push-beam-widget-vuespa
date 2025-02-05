import type { Context } from "@netlify/functions";

import PushNotifications from "@pusher/push-notifications-server";

export default (req: Request, ctx: Context) => {

    // get the query param user_id in netlify function
    const userId = req.query.user_id;
    console.log({userId});

   const beamsInstanceId = Netlify.env.get("API_BEAMS_INSTANCE_ID");
   const beamsSecretKey = Netlify.env.get("API_BEAMS_SECRET_KEY");

    const beamsClient = new PushNotifications({
        instanceId: beamsInstanceId,
        secretKey: beamsSecretKey,
    });

    const beamsToken = beamsClient.generateToken("12");

    //return new Response('Hello from Beams Auth', { status: 200 });
    return new Response(JSON.stringify(beamsToken), { status: 200 });
}