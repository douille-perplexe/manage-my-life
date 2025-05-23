"use client";
import { useState } from "react";
import Image from "next/image";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  LucideIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import SidebarLink from "@/app/components/Sidebar/SidebarLink";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed} from "@/state/state";
// import { useGetAuthUserQuery, useGetProjectsQuery } from "@/state/api";
import {useGetProjectsQuery } from "@/state/api";
import { signOut } from "aws-amplify/auth";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const {data : projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
      (state) => state.global.isSidebarCollapsed,
  );

  // const { data: currentUser } = useGetAuthUserQuery({});
  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  // if (!currentUser) return null;
  // const currentUserDetails = currentUser?.userDetails;

  const sidebarClassNames = `fixed flex flex-col h-[100%] justify-between 
  shadow-xl transition-all 
  duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white ${isSidebarCollapsed ? "w-0 hidden" : "w-64"}`;

  return (
      <div className={sidebarClassNames}>
        <div className={"flex h-[100%] w-full flex-col justify-start"}>
          {/* TOP LOGO */}
          <div className="z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
            <div className={"text-xl font-bold text-gray-800 dark:text-white"}>MML</div>
            {!isSidebarCollapsed && (
                <button
                    className={"py-3"}
                    onClick={() => {
                      dispatch(setIsSidebarCollapsed(!isSidebarCollapsed));
                    }}
                >
                  <X className="h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white" />
                </button>
            )}
          </div>
          {/* TEAM */}
          <div
              className={
                "flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700"
              }
          >
            <Image src={"/MML.png"} alt={"Logo"} width={40} height={40} />
            <div>
              <h3 className={"text-md font-bold tracking-widest dark:text-gray-200"}>MML TEAM</h3>
              <div className={"mt-1 flex items-start gap-2"}>
                <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
                <p className="text-xs text-gray-500">Private</p>
              </div>
            </div>
          </div>
          {/* NAVBAR LINKS */}
          <nav className={"z-10 w-full"}>
            <SidebarLink href={"/"} icon={Home} label={"Home"} />
            <SidebarLink href={"/timeline"} icon={Briefcase} label={"Timeline"} />
            <SidebarLink href={"/search"} icon={Search} label={"Search"} />
            <SidebarLink href={"/settings"} icon={Settings} label={"Settings"} />
            <SidebarLink href={"/users"} icon={User} label={"Users"} />
            <SidebarLink href={"/teams"} icon={Users} label={"Teams"} />
          </nav>

          <button
              onClick={() => setShowProjects((prev) => !prev)}
              className={
                "flex w-full items-center justify-between px-8 py-3 text-gray-500"
              }
          >
            <span>Projects</span>
            {showProjects ? (
                <ChevronUp className={"h-5 w-5"} />
            ) : (
                <ChevronDown className={"h-5 w-5"} />
            )}
          </button>

          {showProjects && projects?.map((project) =>(
              <SidebarLink key={project.id} href={`/projects/${project.id}`} icon={Briefcase} label={project.name} />
          ))}

          <button
              onClick={() => setShowPriority((prev) => !prev)}
              className={
                "flex w-full items-center justify-between px-8 py-3 text-gray-500"
              }
          >
            <span>Priority</span>
            {showPriority ? (
                <ChevronUp className={"h-5 w-5"} />
            ) : (
                <ChevronDown className={"h-5 w-5"} />
            )}
          </button>

          {showPriority && (
              <>
                <SidebarLink
                    href={"/priority/urgent"}
                    icon={AlertCircle}
                    label={"Urgent"}
                />
                <SidebarLink
                    href={"/priority/High"}
                    icon={ShieldAlert}
                    label={"High"}
                />
                <SidebarLink
                    href={"/priority/medium"}
                    icon={AlertTriangle}
                    label={"Medium"}
                />
                <SidebarLink
                    href={"/priority/low"}
                    icon={AlertOctagon}
                    label={"Low"}
                />
                <SidebarLink
                    href={"/priority/backlog"}
                    icon={Layers3}
                    label={"Backlog"}
                />
              </>
          )}
        </div>
        <div className="z-10 mt-32 flex w-full flex-col items-center gap-4 bg-white px-8 py-4 dark:bg-black md:hidden">
          <div className="flex w-full items-center">
            <div className="align-center flex h-9 w-9 justify-center">
{/*              {!!currentUserDetails?.profilePictureUrl ? (
                  <Image
                      src={`https://pm-s3-images.s3.us-east-2.amazonaws.com/${currentUserDetails?.profilePictureUrl}`}
                      alt={currentUserDetails?.username || "User Profile Picture"}
                      width={100}
                      height={50}
                      className="h-full rounded-full object-cover"
                  />
              ) : (
                  <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
              )}*/}
              <User className="h-6 w-6 cursor-pointer self-center rounded-full dark:text-white" />
            </div>
            <span className="mx-3 text-gray-800 dark:text-white">
            {/*{currentUserDetails?.username}*/}
          </span>
            <button
                className="self-start rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
                onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
  );
};

export default Sidebar;