import { Task as TaskType } from "@/state/api";
import { useDrag, useDrop } from "react-dnd";
import { format } from "date-fns";
import Image from "next/image";
import PriorityTag from "@/app/projects/BoardView/PriorityTag";
import {EllipsisVertical, MessageSquareMore} from "lucide-react";

interface TaskProps {
  task: TaskType;
}

const Task = ({ task }: TaskProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor: any) => ({ isDragging: !!monitor.isDragging() }),
  }));

  const taskTagsSplit = task.tags ? task.tags.split(",") : [];

  const formattedStartDate = task.startDate
    ? format(new Date(task.startDate), "P")
    : "";
  const formattedDueDate = task.dueDate
    ? format(new Date(task.dueDate), "P")
    : "";

  const numberOfComments = (task.comments && task.comments.length) || 0;

  return (
    <div
      className={`mb-4 rounded-md bg-white shadow ${isDragging ? "opacity-50" : "opacity-100"}`}
      ref={(instance) => {
        drag(instance);
      }}
    >
      {task.attachments && task.attachments.length > 0 && (
        <Image
          src={`/${task.attachments[0].fileUrl}`}
          alt={task.attachments[0].fileName}
          width={400}
          height={200}
          className="h-auto w-full rounded-t-md"
        />
      )}
      <div className={"p-4 md:p-6"}>
        <div className={"flex items-center justify-between"}>
          <div className={"flex flex-1 flex-wrap items-center gap-2"}>
            {task.priority && <PriorityTag priority={task.priority} />}
            <div className={"flex gap-2"}>
              {taskTagsSplit.map((tag: string) => (
                <div
                  key={tag}
                  className={"rounded-full bg-blue-100 px-2 py-1 text-xs"}
                >
                  {" "}
                  {tag}
                </div>
              ))}
            </div>
          </div>
          <button
            className={"flex h-6 w-4 flex-shrink-0 items-center justify-center"}
          >
            <EllipsisVertical size={26} />
          </button>
          <div className={"my-3 flex justify-between"}>
            <h4 className={"text-md font-bold"}>{task.title}</h4>
            {typeof task.points === "number" && <div>{task.points} pts</div>}
          </div>
          <div className={"test-gray-500 text-xs"}>
            {formattedStartDate && <span>{formattedStartDate} - </span>}{" "}
            {formattedDueDate && <span>{formattedDueDate}</span>}
          </div>
          <p className={"text-sm text-gray-600"}>{task.description}</p>
          <div className={"mt-4 border-t border-gray-200"} />
          <div className={"mt-3 flex items-center justify-between"}>
            <div className={"flex -space-x-[6px] overflow-hidden"}>
              {task.assignee && (
                <Image
                  key={task.assigneeUserId}
                  src={`/${task.assignee.profilePictureUrl}`}
                  alt={task.assignee.username}
                  width={30}
                  height={30}
                  className="h-8 w-8 rounded-full border-2 border-white object-cover"
                />
              )}
              {task.author && (
                  <Image
                      key={task.authorUserId}
                      src={`/${task.author.profilePictureUrl}`}
                      alt={task.author.username}
                      width={30}
                      height={30}
                      className="h-8 w-8 rounded-full border-2 border-white object-cover"
                  />
              )}
            </div>
            <div className={"flex items-center text-gray-500 "}>
              <MessageSquareMore size={20}></MessageSquareMore>
              <span className={"ml-1 text-sm"}>{numberOfComments}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
