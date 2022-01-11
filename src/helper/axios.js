import axios from "axios";

export const baseAPI = axios.create({
  baseURL: "https://cutt-events.herokuapp.com",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MTdkMjgxMTY5NTA2ZjhkOTkzNDg0YzMiLCJpYXQiOjE2Mzc2NTU1MTIsImV4cCI6MTYzNzc0MTkxMn0.XwcnyoeHwrtiZxmy1I1xlqRA3wOn-NJsN4ag13qAGLM",
  },
});

export const baseURL = "https://cutt-events.herokuapp.com";
