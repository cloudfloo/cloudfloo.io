import { Metadata } from 'next';
import PressClient from "./press-client";

export const metadata: Metadata = {
  title: 'Press Kit - CloudFloo.io',
  description: 'Media resources, press releases, and brand assets for CloudFloo.io.',
};

export default function PressPage() {
  return <PressClient />;
}
