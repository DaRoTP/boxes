import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { ActivityType, HistoryEntryWithContactInfo, BoxType } from "types";
import BoxPage from "./BoxPage";
import RESTApiCall from "utils/RESTApiCall";

const BoxGQL = () => {
  const { boxId } = useParams();

  const [boxDetails, setBoxDetails] = useState<
    Partial<Pick<BoxType, "description" | "destination" | "origin" | "activity" | "currentLocation" | "size">>
  >({
    description: "",
    destination: undefined,
    origin: undefined,
  });
  const [locations, setLocations] = useState([]);
  const [boxHistory, setBoxHistory] = useState<HistoryEntryWithContactInfo[]>([]);
  const [activities, setActivities] = useState<ActivityType[]>([]);

  const fetchBoxDetails = async () => {
    if (boxId) {
      const { data } = await RESTApiCall({
        url: `/box/${boxId}`,
        method: "GET",
        token: true,
      });
      const { description, destination, origin, activity, currentLocation, size } = data;
      const { data: sizeData } = await RESTApiCall({
        url: `/size/${size}`,
        method: "GET",
        token: true,
      });
      setBoxDetails({ description, destination, origin, activity, currentLocation, size: sizeData });
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
      historyData.forEach(async (entry: HistoryEntryWithContactInfo) => {
        const { data: locationContactInfo } = await RESTApiCall({
          url: `/location/${entry.currentLocation.identifier}/contact`,
          method: "GET",
          token: true,
        });
        entry.contactInfo = locationContactInfo;
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
