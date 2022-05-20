import React from 'react'
import { useNavigate } from 'react-router-dom';
import GQLApiCall from 'service/utils/GQLApiCall';
import CreateLocation from './CreateLocation';

const CreateLOcationGQL = () => {

    const navigate = useNavigate();
  
    const submitNewLocation = async (values: any) => {
        const { data } = await GQLApiCall({
          query: {
            query: `mutation CREATE_LOCATION($identifier: String!, $country: String!, $city: String!, $street: String!, $number: Int!, $postcode: String!){
              createLocation(location: { 
                identifier: $identifier,
                country: $country,
                city: $city,
                street: $street,
                number: $number,
                postcode: $postcode,
              }) { 
                _id
              }
            }`,
            variables: { ...values, number: parseInt(values.number) },
          },
        });
        if(data.createLocation) {
          navigate("/location");
        }
      };

  return (
    <CreateLocation submitNewLocation={submitNewLocation} />
  )
}

export default CreateLOcationGQL