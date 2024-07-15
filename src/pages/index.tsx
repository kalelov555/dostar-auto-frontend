import DefaultLayout from "@/layouts/DefaultLayout";
import { Inter } from "next/font/google";
import { Button } from "primereact/button";

export default function Home() {
  return (
    <DefaultLayout>
      <Button label="Hello World" severity="secondary" />
    </DefaultLayout>
  );
}
