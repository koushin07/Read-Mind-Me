import moment from "moment";
import { useEffect, useState } from "react";

type timeProp = {
    timeStamp : string
}
export const TimeAgo = ({timeStamp}: timeProp) => {
  const [currentTime, setCurrentTime] = useState(Date.now());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 10000); // Update every 10 seconds to keep it more responsive

    return () => clearInterval(interval); // Clean up on unmount
  }, []);
  return <>{moment(timeStamp).fromNow()}</>;
};
