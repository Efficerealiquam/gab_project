import Grabaciones from "@models/grabaciones";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { fechIni, fechFin, Advertiser, Orden } = await request.json();
  //console.log("1:" + fechIni, "2:" + fechFin, "3:" + Advertiser, "4:" + Orden);
  console.log(Advertiser, Orden);
  try {
    await connectToDB();

    const query = {
      /*    $and: [
        {
          "Fecha de emisión": {
            $gte: new Date("2023-04-01"),
          },
        },
        {
          "Fecha de emisión": {
            $lte: new Date("2023-04-05"),
          },
        },
      ],
      Advertiser: "UNILEVER ANDINA PERU S.A.",
      Orden: "228239J", */
    };

    if (Advertiser && !Orden) {
      const gra = await Grabaciones.find({ Advertiser: Advertiser }).limit(20);
      return new Response(JSON.stringify(gra), { status: 200 });
    }
    if (Orden && !Advertiser) {
      const gra = await Grabaciones.find({ Orden: Orden }).limit(20);
      return new Response(JSON.stringify(gra), { status: 200 });
    }
    if (Orden && Advertiser) {
      const gra = await Grabaciones.find({
        Advertiser: Advertiser,
        Orden: Orden,
      }).limit(20);
      return new Response(JSON.stringify(gra), { status: 200 });
    }
  } catch (error) {
    return new Response("Failed to fetch all grab", { status: 500 });
  }
};
