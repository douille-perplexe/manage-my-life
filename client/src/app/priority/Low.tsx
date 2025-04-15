import React from "react";
import PriorityPage from "@/app/priority/PriorityPage";
import { Priority } from "@/state/api";

const Low = () => {
    return <PriorityPage priority={Priority.Low} />;
};

export default Low;