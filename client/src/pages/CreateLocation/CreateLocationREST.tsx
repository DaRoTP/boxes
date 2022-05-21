import React from "react";
import { useNavigate } from "react-router-dom";
import CreateLocation from "./CreateLocation";
import RESTApiCall from "utils/RESTApiCall";

const CreateLocationGQL = () => {
  const navigate = useNavigate();

  const submitNewLocation = async (values: any) => {
    const { data } = await RESTApiCall({
      url: "/location",
      method: "POST",
      token: true,
      payload: values
    });
    if (data) {
      navigate("/location");
    }
  };

  return <CreateLocation submitNewLocation={submitNewLocation} />;
};

export default CreateLocationGQL;
