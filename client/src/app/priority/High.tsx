import React from "react";
import PriorityPage from "@/app/priority/PriorityPage";
import { Priority } from "@/state/api";

const High = () => {
    return <PriorityPage priority={Priority.High} />;
};

export default High;