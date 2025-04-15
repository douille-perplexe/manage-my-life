import React from "react";
import PriorityPage from "@/app/priority/PriorityPage";
import { Priority } from "@/state/api";

const Medium = () => {
    return <PriorityPage priority={Priority.Medium} />;
};

export default Medium;