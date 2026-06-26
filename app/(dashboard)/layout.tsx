import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard - CineMatch Pro',
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
