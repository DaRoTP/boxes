import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { ActivityType, BoxHistoryEntryType, BoxType } from "types";
import BoxPage from "./BoxPage";
import * as boxService from "service/rest/box.service";
import * as locationService from "service/rest/location.service";
import * as activityService from "service/rest/activity.service";

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
      const { data } = await boxService.getBox({ id: boxId });
      const { description, destination, origin, activity } = data;
      setBoxDetails({ description, destination, origin, activity });
    }
  };

  const fetchAllActivities = async () => {
    const { data } = await activityService.getAllActivities({});
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
      const { data: historyData } = await boxService.getBoxHistory({ id: boxId });
      setBoxHistory(historyData);
    }
  };

  useEffect(() => {
    fetchBoxDetails();
    fetchBoxHistory();
    fetchAllActivities();
  }, []);

  const submitTransfer = async (values: any) => {
    await boxService.transferOrder({
      id: boxId!,
      targetLocationId: values.location,
      activityId: values.activity,
    });
    await fetchBoxHistory();
    await fetchBoxDetails();
  };

  const searchLocations = debounce(1000, async (e) => {
    if (!e.target.value) {
      return;
    }
    const { data } = await locationService.getLocations({
      query: e.target.value,
      page: 0,
      perPage: 6,
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
