import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { debounce } from "throttle-debounce";
import { ActivityType, LocationType } from "types";
import CreateBox from "./CreateBox";
import * as locationService from "service/rest/location.service";
import * as activityService from "service/rest/activity.service";
import * as boxService from "service/rest/box.service";

interface ActivityOptionType extends ActivityType {
  label: string;
}

const CreateBoxGQL = () => {
  const [locations, setLocations] = useState([]);
  const [activities, setActivities] = useState<ActivityOptionType[]>([]);

  const navigate = useNavigate();

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

  const submitCreateNewBox = async (val: any) => {
    const { activity, description, origin, destination } = val;
    const { data } = await boxService.createNewBoxOrder({
      payload: { activityId: activity, description, originId: origin, destinationId: destination },
    });
    if (data) {
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
