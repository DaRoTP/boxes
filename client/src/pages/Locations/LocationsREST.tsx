import React, { useState } from "react";
import RESTApiCall from "utils/RESTApiCall";

import Locations from "./Locations";

const LocationsGQL = () => {
  const [tableData, setTableData] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  const fetchAllLocations = async (page: number, perPage: number) => {
    const { data } = await RESTApiCall({
      url: "/location",
      method: "GET",
      token: true,
      params: {
        page,
        perPage,
      },
    });
    if (data) {
      const { totalItems, locations } = data;
      setTableData(locations);
      setTotalItemsCount(totalItems);
    }
  };
  return (
    <Locations
      tableData={tableData}
      totalItemsCount={totalItemsCount}
      fetchAllLocations={fetchAllLocations}
    />
  );
};

export default LocationsGQL;
