import { OrderPageClient } from "@/modules/order";
import { Suspense } from "react";

function SearchBarFallback() {
  return <>Loading</>;
}

export default function OrderPage() {
  return <Suspense fallback={<SearchBarFallback />}>
    <OrderPageClient></OrderPageClient>
  </Suspense>;
}
