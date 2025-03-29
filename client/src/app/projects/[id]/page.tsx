"use client"

import {useState} from "react";
import ProjectHeader from "@/app/projects/[id]/ProjectHeader";


interface ProjectProps {
    params: { id : string}
}

const Project = ({params} :  ProjectProps) => {
    const { id } = params;
    const [activeTab, setActiveTab]= useState("Board");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

    return (<div>

        <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab}/>
        {/*{ activeTab === "Board" && (*/}
        {/*    <Board/>*/}
        {/*)*/}
        {/*}*/}


    </div>)
}

export default Project