import { useGetTasksQuery, useUpdateTaskStatusMutation } from "@/state/api";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TaskColumn from "@/app/projects/BoardView/TaskColumn";

interface BoardViewProps {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const taskStatus = ["To Do", "Work In Progress", "Under Review", "Completed"];

const BoardView = (props: BoardViewProps) => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(props.id) });
  const [updateTaskStatus] = useUpdateTaskStatusMutation();

  const moveTask = (taskId: number, toStatus: string) => {
    updateTaskStatus({ taskId, status: toStatus });
  };

  if (isLoading) return <div>Loading...</div>;

  console.log("tasks:  " , tasks)
  console.log("error :  " , error)
  if (error) return <div>An error occurred while fetching tasks.</div>;

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
