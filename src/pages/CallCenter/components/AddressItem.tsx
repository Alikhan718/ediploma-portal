import { ICallCenterLocation } from "@src/store/callcenter/types";
import React from "react";

interface AddressItemProps {
  location: ICallCenterLocation
  onDrop: (e: React.DragEvent<HTMLDivElement>, title: ICallCenterLocation) => void
  onDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

export const AddressItem: React.FC<AddressItemProps> = ({ location, onDrop, onDragOver, onDragLeave }) => {
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    onDrop(e, location);
  };
  return (
    <div
      onDrop={handleDrop}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      style={{
        background: "#FFF", padding: "10px",
        borderRadius: "10px", fontWeight: "400",
        fontSize: "20px",
        lineHeight: "24px",
        marginBottom: "10px"
      }}
    >
      {location.address}
    </div>
  );
};