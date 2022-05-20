import React from "react";
import { useNavigate } from "react-router-dom";
import CreateLocation from "./CreateLocation";
import * as locationService from "service/rest/location.service";

const CreateLOcationGQL = () => {
  const navigate = useNavigate();

  const submitNewLocation = async (values: any) => {
    const { data } = await locationService.createLocation({ payload: values });
    if (data) {
      navigate("/location");
    }
  };

  return <CreateLocation submitNewLocation={submitNewLocation} />;
};

export default CreateLOcationGQL;
