import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { db } from "@/server/db";

export interface Demo {
    id: number;
    code: string;
    name: string;
    description?: string;
}

export const demoSchema = z.object({
    id: z.number().int(),
    code: z.string().min(1, "Code is required"),
    name: z.string().min(1, "Name is required"),
    description: z.string().optional()
});

export const createDemoSchema = demoSchema.omit({ id: true });

export const demoRouter = createTRPCRouter({
    // Get all demo items
    getAll: publicProcedure.query(async () => {
        return await db.demo.findMany({
            orderBy: {
                id: 'desc'
            }
        });
    }),

    // Create a new demo item
    create: publicProcedure
        .input(createDemoSchema)
        .mutation(async ({ input }) => {
            return await db.demo.create({
                data: {
                    code: input.code,
                    name: input.name,
                    description: input.description,
                },
            });
        }),
});