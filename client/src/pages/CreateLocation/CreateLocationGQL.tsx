import React from "react";
import { useNavigate } from "react-router-dom";
import GQLApiCall from "utils/GQLApiCall";
import CreateLocation from "./CreateLocation";

const CreateLOcationGQL = () => {
  const navigate = useNavigate();

  const submitNewLocation = async (values: any) => {
    const { data } = await GQLApiCall({
      query: {
        query: `mutation CREATE_LOCATION(
                $identifier: String!,
                $country: String!,
                $city: String!,
                $street: String!,
                $number: Int!,
                $postcode: String!
                $email: String!
                $phone1: String!
                $phone2: String!
              ){
              createLocation(location: { 
                identifier: $identifier,
                country: $country,
                city: $city,
                street: $street,
                number: $number,
                postcode: $postcode,
                email: $email,
                phone1: $phone1,
                phone2: $phone2,
              }) { 
                _id
              }
            }`,
        variables: { ...values, number: parseInt(values.number) },
      },
    });
    if (data.createLocation) {
      navigate("/location");
    }
  };

  return <CreateLocation submitNewLocation={submitNewLocation} />;
};

export default CreateLOcationGQL;
