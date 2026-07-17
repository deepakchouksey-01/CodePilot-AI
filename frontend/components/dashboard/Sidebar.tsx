"use client";

import Link from "next/link";
import {
  LayoutDashboard,
  GitBranch,
  ShieldCheck,
  History,
  Settings,
} from "lucide-react";

export default function Sidebar() {

  return (
    <aside className="hidden min-h-screen w-64 border-r bg-white p-6 md:block">


      {/* Logo */}

      <div className="mb-10">

        <h1 className="text-2xl font-bold">
          CodePilot AI
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          AI Code Review Platform
        </p>

      </div>



      {/* Navigation */}

      <nav className="space-y-3">


        <Link
          href="/dashboard"
          className="flex items-center gap-3 rounded-lg bg-black px-4 py-3 text-white"
        >

          <LayoutDashboard size={20}/>

          Dashboard

        </Link>



        <Link
          href="/dashboard/repos"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
        >

          <GitBranch size={20}/>

          Repositories

        </Link>



        <Link
          href="/dashboard/security"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
        >

          <ShieldCheck size={20}/>

          Security Scan

        </Link>



        <Link
          href="/dashboard/history"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
        >

          <History size={20}/>

          Review History

        </Link>



        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-lg px-4 py-3 text-gray-700 hover:bg-gray-100"
        >

          <Settings size={20}/>

          Settings

        </Link>


      </nav>



      {/* Bottom */}

      <div className="mt-10 rounded-xl bg-gray-100 p-4">

        <p className="text-sm font-semibold">
          AI Review Credits
        </p>

        <p className="mt-2 text-2xl font-bold">
          100
        </p>

        <p className="text-xs text-gray-500">
          reviews available
        </p>

      </div>


    </aside>
  );
}