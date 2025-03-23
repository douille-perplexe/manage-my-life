import { LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

const SidebarLink = ({ href, icon: Icon, label }: SidebarLinkProps) => {
  const pathName = usePathname();
  const isActive =
    pathName === href || (pathName === "/" && href === "/dashboard");

  return (
    <Link href={href} className={"w-full"}>
      <div
        className={`relative flex cursor-pointer items-center gap-3 transition-colors hover:bg-gray-100 ${isActive ? "bg-gray-100 text-white" : ""} justify-start px-8 py-3`}
      >
        {isActive && (
          <div
            className={"absolute top-0 left-0 h-[100%] w-[5px] bg-blue-200"}
          />
        )}
        <Icon className="h-6 w-6 text-gray-800" />
        <span className={`font-medium text-gray-800`}>{label}</span>
      </div>
    </Link>
  );
};

export default SidebarLink;
