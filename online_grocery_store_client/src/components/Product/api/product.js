import axios from "axios";

export const getAllProduct=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/product`);
      console.log("Calling Get All Product");
      console.log(res);
      dispatch ({
          type:'GET_Product',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

