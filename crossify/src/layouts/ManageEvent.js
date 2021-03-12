import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components

import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Sidebar from "components/Sidebar/ManageEventSidebar.js";
import HeaderStats from "components/Headers/HeaderStats.js";
import FooterAdmin from "components/Footers/FooterAdmin.js";

// views

import BroadcastSettings from "views/eventMangement/BroadcastSettings";
import Preview from "views/eventMangement/PreviewSettings";
import QnASettings from "views/eventMangement/QnASettings";
import General from "views/eventMangement/GeneralSettings";
import Details from "views/eventMangement/DetailsSettings";
import Attendees from "views/eventMangement/AttendeesSettings";

// import Tables from "views/admin/Tables.js";
// import MemberList from "views/admin/MemberList";

export default function Admin() {
  return (
    <>
      <Sidebar />
      <div className="relative md:ml-64 bg-gray-200">
        <AdminNavbar />
        {/* Header */}
        <HeaderStats />
        <div className="px-4 md:px-10 mx-auto w-full -m-24">
          <Switch>
            <Route
              path="/manage/event/broadcast"
              exact
              component={BroadcastSettings}
            />
            <Route path="/manage/event/preview" exact component={Preview} />
            <Route path="/manage/event/general" exact component={General} />
            <Route path="/manage/event/details" exact component={Details} />
            <Route path="/manage/event/attendees" exact component={Attendees} />
            <Route path="/manage/event/qanda" exact component={QnASettings} />

            <Redirect from="/manage/event" to="/manage/event/general" />
          </Switch>
          <FooterAdmin />
        </div>
      </div>
    </>
  );
}