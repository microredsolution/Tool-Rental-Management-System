import axios from "axios";
import Router from 'next/router';


export const baseUrl = 'https://aonerentals.in/'; // main server

// export const baseUrl = 'https://godown.aonerentals.in/'; // godown server

// export const baseUrl = 'https://test.aonerentals.in/'; // test server

// export const baseUrl = 'http://localhost/' //development server


const ServiceURL = `${baseUrl}tools/src/API/` //base url 


const requestPost = async (data)=>{

        const config = {
            headers: {
              Authorization: localStorage.getItem("authtoken"),
            },
          };
        const response = await axios.post(ServiceURL,data,config)
        return response.data
}

export default requestPost