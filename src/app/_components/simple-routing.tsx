"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const SimpleRouting = () => {
    const Router = useRouter();

    const handleClick = () => {
        Router.push("/demo_datatable");
    }
  return (
    <div className="grid h-screen place-items-center"><Button variant={"default"} onClick={handleClick}>Demo Data Table</Button></div>
  );
};
export default SimpleRouting;