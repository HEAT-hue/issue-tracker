import { Button, Flex } from "@radix-ui/themes";
import Link from "next/link";
import React from "react";
import IssueStatusFilter from "./IssueStatusFilter";

const IssueActions = () => {

  return (
    <Flex justify={'between'}>
      <IssueStatusFilter />

      <Link
        className="w-max flex items-center justify-center"
        href={"/dashboard/issues/new"}
      >
        <Button className="cursor-pointer"> Create Issue</Button>
      </Link>
    </Flex>
  );
};

export default IssueActions;
