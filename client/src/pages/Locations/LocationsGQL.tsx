import React, { useState } from "react";
import Locations from "./Locations";
import * as RESTlocationService from "service/rest/location.service";

const LocationsGQL = () => {
  const [tableData, setTableData] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  const fetchAllLocations = async (page: number, perPage: number) => {

    const { data } = await RESTlocationService.getLocations({ page, perPage });
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
