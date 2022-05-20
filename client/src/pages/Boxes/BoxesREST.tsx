import React, { useState } from "react";
import * as boxService from "service/rest/box.service";
import Boxes from "./Boxes";

const BoxesGQL = () => {
  const [tableData, setTableData] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  const fetchBoxes = async (page: number, perPage: number) => {
    const { data } = await boxService.getBoxes({ page, perPage });
    if (data) {
      const { totalItems, boxes } = data;
      setTableData(boxes);
      setTotalItemsCount(totalItems);
    }
  };

  return <Boxes tableData={tableData} totalItemsCount={totalItemsCount} fetchBoxes={fetchBoxes} />;
};

export default BoxesGQL;
