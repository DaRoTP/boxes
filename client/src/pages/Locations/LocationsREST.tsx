import React, { useState } from "react";
import * as GQLlocationService from "service/graphql/location.service";
import Locations from "./Locations";

const LocationsGQL = () => {
  const [tableData, setTableData] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);

  const fetchAllLocations = async (page: number, perPage: number) => {
    const { data } = await GQLlocationService.getLocations({ page, perPage });

    // const { data } = await RESTlocationService.getLocations({ page, perPage });
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
