import axios from "axios";

export const getAllOrder=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/order`);
      console.log("Calling Get All Order");
      console.log(res);
      dispatch ({
          type:'GET_Order',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

