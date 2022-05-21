import React, { useState } from "react";
import Locations from "./Locations";
import GQLApiCall from "utils/GQLApiCall";

const LocationsGQL = () => {
  const [tableData, setTableData] = useState([]);
  const [totalItemsCount, setTotalItemsCount] = useState<number>(0);
  const fetchAllLocations = async (page: number, perPage: number) => {
    const { data } = await GQLApiCall({
      token: true,
      query: {
        "query": `query GET_FULL_LOCATIONS($page : Int, $perPage: Int, $query: String){
          totalItems,
          locations(page: $page, perPage: $perPage, query: $query) { 
            _id, identifier, country, city, street, number, postcode,
          }
        }`,
        variables: {
          page,
          perPage,
        }
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
