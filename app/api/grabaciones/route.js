import Grabaciones from "@models/grabaciones";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
  try {
    await connectToDB();

    const gra = await Grabaciones.find({}).limit(20);
    return new Response(JSON.stringify(gra), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch all grab", { status: 500 });
  }
};
