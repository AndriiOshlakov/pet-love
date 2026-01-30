import NotFoundComponent from '@/components/NotFound/NotFound';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '404 - Page Not Found ',
  description: 'Sorry, the page you are looking for does not exist.',
};

export default function NotFound() {
  return <NotFoundComponent />;
}
