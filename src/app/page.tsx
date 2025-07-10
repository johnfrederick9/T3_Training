import { HydrateClient } from "@/trpc/server";
import SimpleRouting from "./_components/simple-routing";

export default async function Home() {
  return (
    <HydrateClient>
      <div><SimpleRouting/></div>
    </HydrateClient>
  );
}
