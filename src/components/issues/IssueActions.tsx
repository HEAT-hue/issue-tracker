import { Button } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";

const IssueActions = () => {
  return (
    <Link
      className="w-max flex items-center justify-center"
      href={"/issues/new"}
    >
      <Button className="cursor-pointer"> Create Issue</Button>
    </Link>
  );
};

export default IssueActions;
