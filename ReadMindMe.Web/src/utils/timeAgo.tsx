/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";
import { useEffect } from "react";

type timeProp = {
    timeStamp : string
}
export const TimeAgo = ({timeStamp}: timeProp) => {
  useEffect(() => {
    const interval = setInterval(() => {
     
    }, 10000); // Update every 10 seconds to keep it more responsive

    return () => clearInterval(interval); // Clean up on unmount
  }, []);
  return <>{moment(timeStamp).fromNow()}</>;
};
