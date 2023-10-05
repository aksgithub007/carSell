"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "react-bootstrap";
function ButtonSection({ title }) {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await axios.get("/api/user/logout");
      console.log(response);
      if (response.statusText === "OK") {
        router.push("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Button onClick={handleLogout} type="button">
      {title}
    </Button>
  );
}

export default ButtonSection;
