import React, { useState } from "react";
import RESTApiCall from "utils/RESTApiCall";
import Boxes from "./Boxes";

const BoxesGQL = () => {
  const [tableData, setTableData] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  const fetchBoxes = async (page: number, perPage: number) => {
    const { data } = await RESTApiCall({
      url: "/box",
      method: "GET",
      token: true,
      params: {
        page,
        perPage,
      },
    });
    if (data) {
      const { totalItems, boxes } = data;
      setTableData(boxes);
      setTotalItemsCount(totalItems);
    }
  };

  return <Boxes tableData={tableData} totalItemsCount={totalItemsCount} fetchBoxes={fetchBoxes} />;
};

export default BoxesGQL;
