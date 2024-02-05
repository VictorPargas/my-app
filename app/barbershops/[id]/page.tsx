import { Button } from "@/app/_components/ui/button";
import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import Image from "next/image";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { Key } from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/_lib/auth";

interface BarbershopDetailPageProps {
    params: {
        id?: string;
    }
}

const BarbershopDetailPage = async ({params}: BarbershopDetailPageProps) => {
    const session = await getServerSession(authOptions);
    if(!params.id){
            //TODO: redirecionar para home
        return null;
    }

    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        }
    });

    if (!barbershop) {
        return null;
    }


   return (
    <div>
        <BarbershopInfo barbershop={barbershop} />

        <div className="px-5 flex flex-col gap-3 py-6">
        {barbershop.services.map((service: { id: Key | null | undefined; }) => (
            <ServiceItem key={service.id} barbershop={barbershop} service={service} isAuthenticates={!!session?.user} />
        ))}
        </div>
    </div>
   );
};
 
export default BarbershopDetailPage;