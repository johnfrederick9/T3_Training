import StandardPageHeader from "@/components/standard-page-header";
import { Separator } from "@/components/ui/separator";
import type { Metadata } from "next";
import DataTableDemo from "../_components/demo_datable";

export const metadata: Metadata = {
    title : "Demo Data Table",
}
const Page = async () => {
    return (
        <div className="flex flex-col space-y-4 m-10">
            <StandardPageHeader
                title={`Demo Data Table`}
                description= {`Manage different data using the component data table.`}
                />
                <Separator/>
                <DataTableDemo />
        </div>
    );
};

export default Page;