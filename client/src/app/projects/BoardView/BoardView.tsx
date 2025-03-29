import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "@/app/projects/BoardView/TaskColumn";
import { useEffect } from "react";

interface BoardViewProps {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = (props: BoardViewProps) => {
  const projectId =
    props.id && !isNaN(Number(props.id)) ? Number(props.id) : undefined;

  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery(
    { projectId: Number(props.id) },
    {
      skip: projectId === undefined,
      refetchOnMountOrArgChange: true,
    },
  );

  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  useEffect(() => {
    if (error) {
      console.error("Error fetching tasks:", error);
    }
  }, [error]);

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (!projectId) return <div>Invalid project ID</div>;
  if (isLoading) return <div>Loading tasks...</div>;
  if (error) return <div>Failed to load tasks. Please try again later.</div>;
  if (!tasks || tasks.length === 0)
    return <div>No tasks found for this project.</div>;

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 xl:grid-cols-4">
        {taskStatus.map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks || []}
            moveTask={moveTask}
            setIsModalNewTaskOpen={props.setIsModalNewTaskOpen}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default BoardView;
