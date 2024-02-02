import { PrismaClient } from "@prisma/client";


declare global {
    var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {

}