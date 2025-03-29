import { Task as TaskType } from "@/state/api";
import { useDrop } from "react-dnd";
import { EllipsisVertical, Plus } from "lucide-react";
import Task from "@/app/projects/BoardView/Task";

interface TaskColumnProps {
  status: string;
  tasks: TaskType[];
  moveTask: (taskId: number, toStatus: string) => void;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const TaskColumn = (props: TaskColumnProps) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: { id: number }) => props.moveTask(item.id, props.status),
    collect: (monitor: any) => ({ isOver: !!monitor.isOver() }),
  }));

  const tasksCount = props.tasks.filter(
    (task: TaskType) => task.status === props.status,
  ).length;
  const statusColor: any = {
    "To Do": "#2563EB",
    "Work In Progress": "#059669",
    "Under Review": "#D97706",
    Completed: "#000000",
  };

  return (
    <div
      ref={(instance) => {
        drop(instance);
      }}
      className={`sl:py-4 rounded-lg py-2 xl:py-2 ${isOver ? "bg-blue-100" : ""}`}
    >
      <div className={"mb-3 flex w-full"}>
        <div
          className={`w-2 !bg-[${statusColor[props.status]}] rounded-s-lg`}
          style={{ backgroundColor: statusColor[props.status] }}
        >
          <div
            className={
              "flex w-full items-center justify-between rounded-e-lg bg-white px-5 py-4"
            }
          >
            <h3 className={"flex items-center text-lg font-semibold"}>
              {props.status}{" "}
              <span
                className={
                  "ml-2 inline-block rounded-full bg-gray-200 p-1 text-center text-sm leading-none"
                }
                style={{ width: "1.5rem", height: "1.5rem" }}
              >
                {tasksCount}
              </span>
            </h3>
            <div className={"flex items-center gap-1"}>
              <button className={"flex h-6 w-5 items-center justify-center"}>
                <EllipsisVertical size={26} />
              </button>
              <button
                className={
                  "flex h-6 w-6 items-center justify-center rounded bg-gray-200"
                }
                onClick={() => {
                  props.setIsModalNewTaskOpen(true);
                }}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
      {props.tasks
        .filter((task: TaskType) => task.status === props.status)
        .map((task: TaskType) => (
          <Task key={task.id} task={task} />
        ))}
    </div>
  );
};

export default TaskColumn;
