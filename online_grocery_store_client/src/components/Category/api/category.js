import axios from "axios";

export const getAllCategory=()=>async dispatch=>
{
    console.log("I am here");
  try {
      const res=await axios.get(`${config.api_url}/category`);
      console.log("Calling Get All Category");
      console.log(res);
      dispatch ({
          type:'GET_Category',
          payload:res.data
      });
  } catch (err) {
      dispatch ({
          type:'Error in  calling API',
          payload:{msg:err.response.statusText,status:err.response.status}
      }); 
  }
}

