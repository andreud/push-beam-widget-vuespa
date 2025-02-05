import type { Context } from "@netlify/functions";

export default (req: Request, ctx: Context) => {

   // const beamsInstanceId = Netlify.env.get("VITE_API_BEAMS_INSTANCE_ID");
   // const beamsSecretKey = Netlify.env.get("VITE_API_BEAMS_SECRET_KEY");

    return new Response('Hello from Beams Auth', { status: 200 });
}