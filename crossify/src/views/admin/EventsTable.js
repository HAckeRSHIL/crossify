import React,{useState,useEffect} from "react";
import CardTable from "components/Tables/EventTable.js";
import Sidebar from "components/Sidebar/ManageClubSidebar.js";
import axios from "axios";
import { useParams } from "react-router";

export default function Tables() {
  var { id } = useParams();
  const [loading, setloading] = useState(false);
  const [eventData, setEventData] = useState([]);
 useEffect(() => {
   async function event_details() {
     const config = {
       method: "POST",
       header: {
         "Content-Type": "application/json",
       },
       validateStatus: () => true,
     };
     var send_data = {
       club_id: id,
     };
     const finaldata = await axios.post(
       "/api/admin/getAllEvents",
       send_data,
       config
     );
     if (finaldata.data.is_error) {
       console.log(finaldata.data.message);
     } else {
       setEventData(finaldata.data.data);
       setTimeout(() => {
         setloading(true);
       }, 1000);
     }
   }
   event_details();
 }, []);
  if (loading) {
    return (
      <>
        <Sidebar />
        <div className="flex flex-wrap">
          <div className="w-full px-4">
            <CardTable club_id={id} data={eventData} />
          </div>
        </div>
      </>
    );
  }
  else {
    return <></>;
  }
}
