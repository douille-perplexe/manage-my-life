import React from "react";
import PriorityPage from "@/app/priority/PriorityPage";
import { Priority } from "@/state/api";

const Backlog = () => {
    return <PriorityPage priority={Priority.Backlog} />;
};

export default Backlog;