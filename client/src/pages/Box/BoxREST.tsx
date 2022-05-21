import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { ActivityType, BoxHistoryEntryType, BoxType } from "types";
import BoxPage from "./BoxPage";
import RESTApiCall from "utils/RESTApiCall";

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

  const fetchBoxDetails = async () => {
    if (boxId) {
      const { data } = await RESTApiCall({
        url: `/box/${boxId}`,
        method: "GET",
        token: true,
      });
      const { description, destination, origin, activity } = data;
      setBoxDetails({ description, destination, origin, activity });
    }
  };

  const fetchAllActivities = async () => {
    const { data } = await RESTApiCall({
      url: "/activity",
      method: "GET",
      token: true,
    });
    if (data) {
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

  const fetchBoxHistory = async () => {
    if (boxId) {
      const { data: historyData } = await RESTApiCall({
        url: `/box/${boxId}/history`,
        method: "GET",
        token: true,
      });
      setBoxHistory(historyData);
    }
  };

  useEffect(() => {
    fetchBoxDetails();
    fetchBoxHistory();
    fetchAllActivities();
  }, []);

  const submitTransfer = async (values: any) => {
    await await RESTApiCall({
      url: `/box/${boxId}/transfer`,
      method: "PATCH",
      token: true,
      payload: {
        targetLocationId: values.location,
        activityId: values.activity,
      },
    });
    await fetchBoxHistory();
    await fetchBoxDetails();
  };

  const searchLocations = debounce(1000, async (e) => {
    if (!e.target.value) {
      return;
    }
    const { data } = await RESTApiCall({
      url: "/location",
      method: "GET",
      token: true,
      params: {
        query: e.target.value,
        page: 0,
        perPage: 6,
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
