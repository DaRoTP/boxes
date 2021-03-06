import React, { useState } from "react";
import GQLApiCall from "utils/GQLApiCall";
import Boxes from "./Boxes";

const BoxesGQL = () => {
  const [tableData, setTableData] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  const fetchBoxes = async (page: number, perPage: number) => {
    const { data, errors } = await GQLApiCall({
      query: {
        query: `query GET_BOXES($page: Int, $perPage: Int) {
            boxes_totalItems,
            boxes(page: $page, perPage: $perPage) {
              _id,
              activity { code, name },
              origin { identifier, country, city },
              destination { identifier, country, city },
            }
        }`,
        variables: {
          perPage,
          page
        }
      },
    });
    if (data) {
      const { boxes_totalItems, boxes } = data;
      setTableData(boxes);
      setTotalItemsCount(boxes_totalItems);
    }
  };

  return <Boxes tableData={tableData} totalItemsCount={totalItemsCount} fetchBoxes={fetchBoxes} />;
};

export default BoxesGQL;
