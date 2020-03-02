import React, { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import { Fragment } from "react";

export const ProductTab = () => {
  // eslint-disable-next-line no-unused-vars
  const [dataProduct, setDataProduct] = useState({});

  const renderAll = () => {
    return (
      <Fragment>
        <h5>All product will be shown here</h5>
      </Fragment>
    );
  };

  const renderBed = () => {
    return (
      <Fragment>
        <h5>All product matched with bedroom will be shown here</h5>
      </Fragment>
    );
  };

  const renderLiving = () => {
    return (
      <Fragment>
        <h5>All living room's furniture will be here</h5>
      </Fragment>
    );
  };

  const renderDining = () => {
    return (
      <Fragment>
        <h5>Dining room's furniture would be shown here</h5>
      </Fragment>
    );
  };

  const renderBath = () => {
    return (
      <Fragment>
        <h5>All product matched with bathroom would be shown here</h5>
      </Fragment>
    );
  };

  return (
    <Tabs>
      <TabList>
        <Tab>All</Tab>
        <Tab>Bed Room</Tab>
        <Tab>Living Room</Tab>
        <Tab>Dining Room</Tab>
        <Tab>Bath Room</Tab>
      </TabList>

      <TabPanel>{renderAll()}</TabPanel>
      <TabPanel>{renderBed()}</TabPanel>
      <TabPanel>{renderLiving()}</TabPanel>
      <TabPanel>{renderDining()}</TabPanel>
      <TabPanel>{renderBath()}</TabPanel>
    </Tabs>
  );
};
