import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import GQLApiCall from "service/utils/GQLApiCall";
import { debounce } from "throttle-debounce";
import { ActivityType, BoxHistoryEntryType, BoxType } from "types";
import BoxPage from "./BoxPage";

const BoxGQL = () => {
  const { boxId } = useParams();

  const [boxDetails, setBoxDetails] = useState<
    Partial<Pick<BoxType, "description" | "destination" | "origin" | "activity">>
  >({
    description: "",
    destination: undefined,
    origin: undefined,
  });
  const [locations, setLocations] = useState([]);
  const [boxHistory, setBoxHistory] = useState<BoxHistoryEntryType[]>([]);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const fetchBoxDetailsGraphql = async () => {
    const { data } = await GQLApiCall({
      query: {
        query: `query GET_BOX_DETAILS($boxId: ID!){
          activities { _id, code, name },
          box(id: $boxId) { 
            _id,
            description, 
            activity { _id, code, name }, 
            origin { _id, identifier, country, city, street, number, postcode }, 
            destination { _id, identifier, country, city, street, number, postcode },
            history { timeStamp, currentLocation { identifier }, activity { _id, code, name } }
          }
        }`,
        variables: { boxId },
      },
    });

    if (data) {
      const { box, activities } = data;
      const { history, ...restBoxData } = box;
      setBoxHistory(history);
      setActivities(
        activities.map(({ _id, code, name }: any) => ({
          _id,
          code,
          name,
          label: `${code} - ${name}`,
        }))
      );
      setBoxDetails(restBoxData);
    }
  };

  useEffect(() => {
    fetchBoxDetailsGraphql();
  }, []);

  const submitTransfer = async (values: any) => {
    const { data, errors } = await GQLApiCall({
      query: {
        query: `mutation TRANSFER($id: ID!, $targetLocationId: ID!, $activityId: ID!){
          transferBox(id: $id, targetLocationId: $targetLocationId, activityId: $activityId) { 
            activity { _id, code, name }, 
            history { timeStamp, currentLocation { identifier }, activity { _id, code, name } }
          }
        }`,
        variables: {
          id: boxId!,
          targetLocationId: values.location,
          activityId: values.activity,
        },
      },
    });
    const { transferBox } = data;
    setBoxDetails((boxDetails) => ({ ...boxDetails, activity: transferBox.activity }));
    setBoxHistory(transferBox.history);
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
    if (data) {
      const { locations } = data;
      const locationWithLabel = locations.map((it: any) => ({ ...it, label: it.identifier }));
      setLocations(locationWithLabel);
    }
  });

  return (
    <BoxPage
      boxId={boxId!}
      boxDetails={boxDetails}
      boxHistory={boxHistory}
      activities={activities}
      locations={locations}
      submitTransfer={submitTransfer}
      searchLocations={searchLocations}
    />
  );
};

export default BoxGQL;
