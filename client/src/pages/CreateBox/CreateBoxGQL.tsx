import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import GQLApiCall from "utils/GQLApiCall";
import { debounce } from "throttle-debounce";
import { ActivityType, LocationType, SizeType } from "types";
import CreateBox from "./CreateBox";

interface ActivityOptionType extends ActivityType {
  label: string;
}
interface SizeOptionType extends SizeType {
  label: string;
}

const CreateBoxGQL = () => {
  const [locations, setLocations] = useState([]);
  const [activities, setActivities] = useState<ActivityOptionType[]>([]);
  const [sizes, setSizes] = useState<SizeOptionType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllActivities();
    return () => {};
  }, []);

  const fetchAllActivities = async () => {
    const { data } = await GQLApiCall({
      token: true,
      query: {
        query: `query {
              activities { _id, code, name },
              sizes { _id, name, code }
            }`,
      },
    });
    const { activities, sizes } = data;
    if (activities) {
      setActivities(
        activities.map(({ _id, code, name }: any) => ({
          _id,
          code,
          name,
          label: `${code} - ${name}`,
        }))
      );
    }
    if (sizes) {
      setSizes(
        sizes.map(({ _id, code, name }: any) => ({
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
      token: true,
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
      token: true,
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
      sizes={sizes}
      locations={locations}
      activities={activities}
      submitCreateNewBox={submitCreateNewBox}
      searchLocations={searchLocations}
    />
  );
};

export default CreateBoxGQL;
