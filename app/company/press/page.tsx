import { Metadata } from 'next';
import PressClient from "./press-client";

export const metadata: Metadata = {
  title: 'Prasa i Media - Aktualności CloudFloo | CloudFloo',
  description: 'Komunikaty prasowe CloudFloo, relacje medialne i aktualności firmowe. Pobierz nasze materiały prasowe i zasoby marki 🔧',
};

export default function PressPage() {
  return <PressClient />;
}
