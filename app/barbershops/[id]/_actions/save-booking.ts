"user server"

import { db } from "@/app/_lib/prisma";

interface sabeBookingParams{
    barbershopId: string;
    serviceId: string;
    userId: string;
    date: string;
}

export const saveBooking = async (params: SaveBookingParams) => {
    await db.booking.create({
        data:{
          
        }
    })
};

