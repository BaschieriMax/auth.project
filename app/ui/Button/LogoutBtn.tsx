"use client";
import Button from "@/app/components/Button/Button";
import { signOut } from "@/app/logout/action";
import React from "react";
import { CiLogout } from "react-icons/ci";

const LogoutBtn = () => {
  return (
    <Button
      type="logout"
      title="Logout"
      icon={<CiLogout className="text-2xl" />}
      onClick={() => signOut()}
    />
  );
};

export default LogoutBtn;
