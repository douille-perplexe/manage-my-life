import { useState } from "react";
import TabButton from "@/app/projects/[id]/TabButton";
import { Clock, Grid3X3, List, Share2, Table } from "lucide-react";
import Header from "@/app/components/Header";


interface ProjectHeaderProps {
  activeTab: string;
  setActiveTab: (activeTab: string) => void;
}

const ProjectHeader = (props: ProjectHeaderProps) => {
  const baba = props.activeTab;
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  return (
    <div className={"px-4 xl:px-6"}>
      <div className={"pt-6 pb-6 lg:pt-8 lg:pb-4"}>
        <Header name={"Product Design Development"} />
      </div>

      <div
        className={
          "flex flex-wrap-reverse gap-2 border-y border-gray-200 pt-2 pb-[8px]"
        }
      >
        <div className={"flex flex-1 items-center gap-2 md:gap-4"}>
          <TabButton
            name={"Board"}
            icon={<Grid3X3 className={"h-5 w-5"} />}
            setActiveTab={props.setActiveTab}
            activeTab={props.activeTab}
          />
          <TabButton
            name={"List"}
            icon={<List className={"h-5 w-5"} />}
            setActiveTab={props.setActiveTab}
            activeTab={props.activeTab}
          />
          <TabButton
            name={"Timeline"}
            icon={<Clock className={"h-5 w-5"} />}
            setActiveTab={props.setActiveTab}
            activeTab={props.activeTab}
          />
          <TabButton
            name={"Table"}
            icon={<Table className={"h-5 w-5"} />}
            setActiveTab={props.setActiveTab}
            activeTab={props.activeTab}
          />
        </div>
        <div className={"flex items-center gap-2"}>
          <button className={"text-gray-500 hover:text-gray-600"}>
            <Share2 className={"h-5 w-5"} />
          </button>
          <div className={"relative"}>
            <input
              type={"text"}
              placeholder={"Search Task"}
              className={"rounded-md border py-1 pr-4 pl-10 focus:outline-none"}
            />
            <Grid3X3
              className={"absolute top-2 left-3 h-4 w-4 text-gray-400"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
