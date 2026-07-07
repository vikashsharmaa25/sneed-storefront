import { useParams } from 'react-router';
import { OrderDetail } from '~/components/orders/OrderDetail';

export default function OrderDetailRoute() {
  const { id } = useParams<{ id: string }>();

  if (!id) {
    return (
      <div className="py-12 text-center text-gray-500 font-medium">
        Invalid Order ID.
      </div>
    );
  }

  return <OrderDetail orderId={id} />;
}
