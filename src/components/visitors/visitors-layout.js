"use client";

import { useState } from "react";
import Button from "../FormControls/button";
import Modal from "../Modal";
import { visiorsFormControls } from "@/utils/config";
import { useRouter } from "next/navigation";

const initialFormData = {
  visitors: 0,
  location: "",
  device: "",
  premiumUserNo: 0,
  month: "",
};

export default function VisitorsLayout({ children }) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const router = useRouter();

  async function handleAddVisitors() {
    const res = await fetch("/api/visitors/add-visitor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    console.log(data);

    if (data && data.success) {
      setFormData(initialFormData);
      setShowModal(false);
      router.refresh();
    } else {
      setFormData(initialFormData);
      setShowModal(false);
    }
  }

  return (
    <div>
      <Button onClick={() => setShowModal(true)} text={"Add Visitors Info"} />
      {children}
      <Modal
        show={showModal}
        setShow={setShowModal}
        formData={formData}
        setFormData={setFormData}
        formControls={visiorsFormControls}
        onAdd={handleAddVisitors}
      />
    </div>
  );
}
