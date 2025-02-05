import type { Context } from "@netlify/functions";

import PushNotifications from "@pusher/push-notifications-server";

export default (req: Request, ctx: Context) => {

   const beamsInstanceId = Netlify.env.get("API_BEAMS_INSTANCE_ID");
   const beamsSecretKey = Netlify.env.get("API_BEAMS_SECRET_KEY");

    const beamsClient = new PushNotifications({
        instanceId: beamsInstanceId,
        secretKey: beamsSecretKey,
    });

    const beamsToken = beamsClient.generateToken(11);

    //return new Response('Hello from Beams Auth', { status: 200 });
    return new Response(JSON.stringify(beamsToken), { status: 200 });
}