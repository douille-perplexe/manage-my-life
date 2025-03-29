import { Task as TaskType } from "@/state/api";

interface PriorityTagProps {
  priority: TaskType["priority"];
}

const PriorityTag = (props: PriorityTagProps) => {
  return (
    <div
      className={`rounded-full px-2 py-1 text-xs font-semibold 
      ${props.priority === "Urgent" 
          ? "text-red bg-red-200" 
          : props.priority === "High" 
              ? "bg-yellow-200 text-yellow-700" 
              : props.priority === "Medium" 
                  ? "bg-green-200 text-green-700" 
                  : props.priority == "Low" 
                      ? "bg-blue-200 text-blue-700" 
                      : "bg-gray-200 text-gray-700"
      }`}
    >
        {props.priority}
    </div>
  );
};

export default PriorityTag;