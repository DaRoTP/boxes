import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GQLApiCall from "utils/GQLApiCall";
import { debounce } from "throttle-debounce";
import { ActivityType, LocationType } from "types";
import CreateBox from "./CreateBox";

interface ActivityOptionType extends ActivityType {
  label: string;
}

const CreateBoxGQL = () => {
  const [locations, setLocations] = useState([]);
  const [activities, setActivities] = useState<ActivityOptionType[]>([]);

  const navigate = useNavigate();

  const fetchAllActivities = async () => {

    const { data } = await GQLApiCall({
      query: {
        query: `query {
              activities { _id, code, name }
            }`,
      },
    });
    if (data.activities) {
      setActivities(
        data.activities.map(({ _id, code, name }: any) => ({
          _id,
          code,
          name,
          label: `${code} - ${name}`,
        }))
      );
    }
  };

  const searchLocations = debounce(1000, async (e) => {
    if (!e.target.value) {
      return;
    }
    const { data } = await GQLApiCall({
      query: {
        query: `query SEARCH_LOCATION($query: String!){
              locations(query: $query) { identifier }
            }`,
        variables: { page: 0, perPage: 6, query: e.target.value },
      },
    });
    if (data.locations) {
      const locationWithLabel = data.locations.map((it: any) => ({
        identifier: it.identifier,
        label: it.identifier,
      }));
      setLocations(locationWithLabel);
    }
  });

  const submitCreateNewBox = async (val: any) => {
    const { activity, description, origin, destination } = val;
    const { data } = await GQLApiCall({
      query: {
        query: `mutation CREATE_BOX($description: String!, $activityId: ID!, $originId: ID!, $destinationId: ID!){
              createBox(box: {
                description: $description,
                activityId: $activityId,
                originId: $originId,
                destinationId: $destinationId,
              }) {
                _id
              }
            }`,
        variables: {
          activityId: activity,
          description,
          originId: origin,
          destinationId: destination,
        },
      },
    });

    if (data.createBox) {
      navigate("/");
    }
  };

  return (
    <CreateBox
      fetchAllActivities={fetchAllActivities}
      locations={locations}
      activities={activities}
      submitCreateNewBox={submitCreateNewBox}
      searchLocations={searchLocations}
    />
  );
};

export default CreateBoxGQL;
