import React from "react";

const AddressDisplay = ({ address }) => {
  return (
    <div>
      <div className="font-medium">
        <span>{address?.salutation}</span>&nbsp;
        <span>{address?.firstName}</span>&nbsp;
        <span>{address?.lastName}</span>
      </div>
      <div>
        <p>{address?.mobile}</p>
        <p>{address?.email}</p>
      </div>
      <div className="mt-2">
        <p>{address?.building}</p>
        <p>{address?.streetName}</p>
        <span>{address?.city}</span>
        <span>{address?.postCode}</span>
      </div>
      <div>
        <span>{address?.state},</span>&nbsp;
        <span>{address?.country}</span>
      </div>
    </div>
  );
};

export default AddressDisplay;
