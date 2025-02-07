/**
 * Demo endpoint to generate a Beams token for a user.
 */

import PushNotifications from "@pusher/push-notifications-server";

export default (req: Request) => {

    const userId = new URL(req.url).searchParams.get("user_id");
    const beamsInstanceId = Netlify.env.get("API_BEAMS_INSTANCE_ID");
    //const beamsSecretKey = Netlify.env.get("API_BEAMS_SECRET_KEY");//
    const beamsSecretKey = process.env.API_BEAMS_SECRET_KEY;

    console.log({userId, beamsInstanceId, beamsSecretKey});

    const beamsClient = new PushNotifications({
        instanceId: beamsInstanceId,
        secretKey: beamsSecretKey,
    });

    const beamsToken = beamsClient.generateToken(userId);

    //return new Response('Hello from Beams Auth' + userId, { status: 200 });
    return new Response(JSON.stringify(beamsToken), { status: 200 });
}