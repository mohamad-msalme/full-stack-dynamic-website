import React from "react";
import { ExitIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import { LogoutMutaion } from "@src/api/services/logout";

export const LogoutBtn: React.FC = () => {
  const navigate = useNavigate();
  const { mutateAsync } = useMutation(LogoutMutaion());

  const logout = async () => {
    try {
      await mutateAsync();
      navigate("/sigin");
    } catch (error) {
      if (isAxiosError(error)) throw error;
    }
  };

  return <ExitIcon onClick={logout} className="w-5 h-5 cursor-pointer" />;
};
