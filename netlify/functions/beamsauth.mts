import type { Context } from "@netlify/functions";
import PushNotifications from "@pusher/push-notifications-server";

export default (req: Request, ctx: Context) => {

    // get the query param "?user_id=x" in netlify function
    const url = new URL(req.url);
    const userId = url.searchParams.get("user_id");
    const beamsInstanceId = Netlify.env.get("API_BEAMS_INSTANCE_ID");
    const beamsSecretKey = Netlify.env.get("API_BEAMS_SECRET_KEY");
    
    console.log({userId, beamsInstanceId, beamsSecretKey});

    /*const beamsClient = new PushNotifications({
        instanceId: beamsInstanceId,
        secretKey: beamsSecretKey,
    });*/

    //const beamsToken = beamsClient.generateToken(userId);

    return new Response('Hello from Beams Auth' + userId, { status: 200 });
    //return new Response(JSON.stringify(beamsToken), { status: 200 });
}