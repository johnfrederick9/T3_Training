"use-client";

import { type ReactElement } from "react";

interface StandardPageHeaderProps {
    title: string;
    description: string;
    actions?: ReactElement;
    leading?: ReactElement;
}

const StandardPageHeader = (props: StandardPageHeaderProps) => {
    const { title, description, actions, leading } = props;

    return (
        <div className="flex flex-row justify-between space-y-0.5">
            <div className="space-y-0.5">
                <h2 className="text-2xl font-bold front-bold tracking-tight">{title}</h2>
                <p className="text-muted-foreground">{description}</p>
            </div> 
            <div className="flex flex-row items-center gap-2 space-y-0.5">
                {actions}
            </div>
        </div>
    );
};

export default StandardPageHeader;